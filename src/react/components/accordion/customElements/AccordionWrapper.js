import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { shouldAccordionPop } from '../private/helpers';
import { ns } from '../../helpers/xuiClassNamespace';

export default class AccordionWrapper extends PureComponent {
  state = {
    shouldPop: false,
  };

  setRef = ref => {
    this.accordionItem = ref;
  };

  componentDidMount() {
    this.setState({
      shouldPop: shouldAccordionPop(this.accordionItem),
    });
  }

  componentDidUpdate() {
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      shouldPop: shouldAccordionPop(this.accordionItem),
    });
  }

  render() {
    const { children, isOpen, qaHook, trigger } = this.props;
    const { shouldPop } = this.state;

    return (
      <div
        className={cn(`${ns}-accordionwrapper`, {
          [`${ns}-accordionwrapper-is-open`]: isOpen,
          [`${ns}-accordionwrapper-pop`]: isOpen && shouldPop,
          [`${ns}-accordionwrapper-no-pop`]: isOpen && !shouldPop,
        })}
        data-automationid={qaHook}
        ref={this.setRef}
      >
        {trigger}
        <div
          className={cn(`${ns}-accordionwrapper--content`, {
            [`${ns}-accordionwrapper--content-is-open`]: isOpen,
          })}
        >
          {children}
        </div>
      </div>
    );
  }
}

AccordionWrapper.propTypes = {
  qaHook: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  trigger: PropTypes.node.isRequired,
};
