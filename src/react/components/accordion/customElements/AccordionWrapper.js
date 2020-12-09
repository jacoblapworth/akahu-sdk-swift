import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { shouldAccordionPop } from '../private/helpers';
import { ns } from '../../helpers/xuiClassNamespace';

const AccordionWrapper = ({ _wrapperId, children, isOpen, qaHook, trigger }) => {
  const [shouldPop, setShouldPop] = useState(false);
  const accordionItem = useRef();

  useEffect(() => {
    setShouldPop(shouldAccordionPop(accordionItem.current));
  }, [accordionItem]);

  const contentClassName = `${ns}-accordionwrapper--content`;

  return (
    <div
      className={cn(`${ns}-accordionwrapper`, {
        [`${ns}-accordionwrapper-is-open`]: isOpen,
        [`${ns}-accordionwrapper-pop`]: isOpen && shouldPop,
        [`${ns}-accordionwrapper-no-pop`]: isOpen && !shouldPop,
      })}
      data-automationid={qaHook && `${qaHook}--wrapper`}
      ref={accordionItem}
    >
      {trigger}
      <div
        className={cn(contentClassName, {
          [`${contentClassName}-is-open`]: isOpen,
        })}
        data-automationid={qaHook && `${qaHook}--content`}
        id={`${contentClassName}-${_wrapperId}`}
      >
        {children}
      </div>
    </div>
  );
};

AccordionWrapper.propTypes = {
  _wrapperId: PropTypes.string.isRequired,
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  qaHook: PropTypes.string,
  trigger: PropTypes.node.isRequired,
};

export default React.memo(AccordionWrapper);
