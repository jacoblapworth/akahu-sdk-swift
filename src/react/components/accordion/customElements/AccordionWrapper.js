import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { shouldAccordionPop } from '../private/helpers';
import { ns } from '../../helpers/xuiClassNamespace';

const AccordionWrapper = ({ children, isOpen, qaHook, trigger, _wrapperId }) => {
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
      data-automationid={qaHook}
      ref={accordionItem}
    >
      {trigger}
      <div
        className={cn(contentClassName, {
          [`${contentClassName}-is-open`]: isOpen,
        })}
        id={`${contentClassName}-${_wrapperId}`}
      >
        {children}
      </div>
    </div>
  );
};

AccordionWrapper.propTypes = {
  qaHook: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  trigger: PropTypes.node.isRequired,
  _wrapperId: PropTypes.string.isRequired,
};

export default React.memo(AccordionWrapper);
