import * as PropTypes from 'prop-types';
import * as React from 'react';

import { logWarning } from '../helpers/developmentConsole';
import doAsync from '../helpers/doAsync';
import sortRefsByDOMOrder from '../helpers/sortRefsByDOMOrder';
import CheckboxRangeSelectorContext from './contexts/CheckboxRangeSelectorContext';

interface Props {
  children?:
    | React.ReactNode
    | ((
        onChange: React.FormEventHandler<HTMLDivElement>,
        wrapperRef: React.RefObject<HTMLDivElement>,
      ) => React.ReactNode);
  useCustomWrapper?: boolean;
}

const XUICheckboxRangeSelector: React.FunctionComponent<Props> = ({
  children,
  useCustomWrapper,
}) => {
  type LastCheckedCheckbox = { index: number; rangeSelectionGroup?: string };
  type CheckboxGroups = { [rangeSelectionGroup: string]: Array<React.RefObject<HTMLInputElement>> };

  const initialLastCheckedCheckbox: LastCheckedCheckbox = { index: -1 };
  const initialCheckboxGroups: CheckboxGroups = { default: [] };

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const lastCheckedCheckboxRef = React.useRef<LastCheckedCheckbox>(initialLastCheckedCheckbox);
  const checkboxGroupsRef = React.useRef<CheckboxGroups>(initialCheckboxGroups);
  const shiftKeyRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    // Capture settings have been added in as from React 17, React no longer attaches event handlers at the document level
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.addEventListener('xui-checkbox-onChange', onChange, { capture: true });
    document.addEventListener('click', handleClickOutside, { capture: true });
    document.addEventListener('focus', handleFocusOutside, { capture: true });
    document.addEventListener('keydown', handleShiftKey, { capture: true });
    document.addEventListener('keyup', handleShiftKey, { capture: true });

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.removeEventListener('xui-checkbox-onChange', onChange, { capture: true });
      document.removeEventListener('click', handleClickOutside, { capture: true });
      document.removeEventListener('focus', handleFocusOutside, { capture: true });
      document.removeEventListener('keydown', handleShiftKey, { capture: true });
      document.removeEventListener('keyup', handleShiftKey, { capture: true });
      checkboxGroupsRef.current = initialCheckboxGroups;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getrangeSelectionGroup = (element: HTMLElement) => {
    const [rangeSelectionGroup] =
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(checkboxGroupsRef.current).find(([_, checkboxRefs2]) =>
        checkboxRefs2.find(checkboxRef => checkboxRef.current?.parentElement?.contains(element)),
      ) || [];

    return rangeSelectionGroup;
  };

  const handleShiftKey = (event: KeyboardEvent) => {
    shiftKeyRef.current = event.shiftKey;
  };

  const handleClickOutside = (event: FocusEvent) => {
    if (!event.target) {
      return;
    }

    const rangeSelectionGroup = getrangeSelectionGroup(event.target as HTMLElement);

    if (!rangeSelectionGroup) {
      lastCheckedCheckboxRef.current = initialLastCheckedCheckbox;
    }
  };

  const handleFocusOutside = (event: FocusEvent) => {
    if (
      event.target &&
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as HTMLElement)
    ) {
      lastCheckedCheckboxRef.current = initialLastCheckedCheckbox;
    }
  };

  const onChange = async (event: React.FormEvent<HTMLDivElement> | CustomEvent) => {
    const isTrustedEvent = 'detail' in event ? event.detail.isTrusted : event.isTrusted;

    const rangeSelectionGroup = getrangeSelectionGroup(event.target as HTMLElement);

    if (!rangeSelectionGroup) {
      return;
    }

    const sortedCheckboxRefs = sortRefsByDOMOrder(checkboxGroupsRef.current[rangeSelectionGroup]);

    const checkboxIndex = sortedCheckboxRefs.findIndex(
      checkboxRef => checkboxRef.current === event.target,
    );

    if (checkboxIndex === -1) {
      lastCheckedCheckboxRef.current = initialLastCheckedCheckbox;
      return;
    }

    /**
     * `event.isTrusted` is used to determine wether this onChange event is being triggered by the
     * user or this component.
     *
     * `isTrusted` is false in Jest even when it should be true so we skip this check when running
     * in Jest.
     */
    if (!isTrustedEvent && process.env.JEST_WORKER_ID === undefined) {
      return;
    }

    if (
      lastCheckedCheckboxRef.current.index >= 0 &&
      lastCheckedCheckboxRef.current.rangeSelectionGroup === rangeSelectionGroup &&
      shiftKeyRef.current
    ) {
      const desiredCheckedState = (event.target as HTMLInputElement)?.checked;

      const firstCheckboxIndex = Math.min(checkboxIndex, lastCheckedCheckboxRef.current.index);
      const lastCheckboxIndex = Math.max(checkboxIndex, lastCheckedCheckboxRef.current.index);

      const promises = [];

      for (let i = firstCheckboxIndex; i <= lastCheckboxIndex; i += 1) {
        sortedCheckboxRefs[i].current?.checked !== desiredCheckedState &&
          sortedCheckboxRefs[i].current?.click();

        /**
         * If the following are true checkboxes must be toggled one at a time:
         * - The checkboxes is a [controlled checkbox](https://reactjs.org/docs/forms.html#controlled-components)
         * - The checkbox is controlled by state that controls multiple checkboxes
         * - The state that controls the checkboxes does not account for batched state updates
         *
         * By calling each virtual click asynchronously we give React time to update state and
         * re-render between virtual clicks. This is the same as clicking each checkbox one at a
         * time rather than all of them at once.
         *
         * Checking checkboxes one at a time has a significant performance impact. To resolve this
         * implementers should [update their state management to account for batched state
         * updates](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous)
         * as recommended by React.
         */
        const promise = doAsync(() => {
          if (sortedCheckboxRefs[i].current?.checked !== desiredCheckedState) {
            sortedCheckboxRefs[i].current?.click();

            logWarning({
              componentName: 'XUICheckboxRangeSelector',
              message: [
                `XUICheckbox failed to update during a range selection (shift+click) operation.\n`,
                `This warning usually occurs because the state managing XUICheckbox does not account for batched state updates as recommended by React.`,
                `We'll do our best to ${
                  desiredCheckedState ? 'check' : 'uncheck'
                } the checkbox anyway, but for the best performance we recommend updating your state management.\n`,
                `https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous`,
              ].join('\n'),
            });
          }
        }, false);
        promises.push(promise);
      }
      await Promise.all(promises);
    }

    lastCheckedCheckboxRef.current = { index: checkboxIndex, rangeSelectionGroup };
  };

  const addCheckboxToRange = (
    checkboxRef: React.RefObject<HTMLInputElement>,
    rangeSelectionGroup = 'default',
  ) => {
    checkboxGroupsRef.current[rangeSelectionGroup] ||= [];
    checkboxGroupsRef.current[rangeSelectionGroup].push(checkboxRef);
  };

  const removeCheckboxFromRange = (
    checkboxRef: React.RefObject<HTMLInputElement>,
    rangeSelectionGroup = 'default',
  ) => {
    checkboxGroupsRef.current[rangeSelectionGroup] = checkboxGroupsRef.current[
      rangeSelectionGroup
    ].filter(previousCheckboxRef => previousCheckboxRef !== checkboxRef);
  };

  return (
    <CheckboxRangeSelectorContext.Provider value={{ addCheckboxToRange, removeCheckboxFromRange }}>
      {useCustomWrapper && typeof children === 'function' ? (
        children(onChange, wrapperRef)
      ) : (
        <div onChange={onChange} ref={wrapperRef}>
          {children}
        </div>
      )}
    </CheckboxRangeSelectorContext.Provider>
  );
};

XUICheckboxRangeSelector.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  useCustomWrapper: PropTypes.bool,
};

export default XUICheckboxRangeSelector;
