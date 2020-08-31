import React, { Fragment } from 'react';
import view from '@xero/xui-icon/icons/view';
import numberList from '@xero/xui-icon/icons/number-list';
import dateRange from '@xero/xui-icon/icons/date-range';
import comment from '@xero/xui-icon/icons/comment';
import highlight from '@xero/xui-icon/icons/highlight';
import card from '@xero/xui-icon/icons/card';

import XUIButton from '../../../button';
import XUIRadio from '../../../radio';
import XUICheckbox from '../../../checkbox';
import XUISwitch from '../../../switch';
import XUIRange from '../../../range';
import Picklist, { Pickitem, PicklistHeader } from '../../../picklist';
import XUIIcon from '../../../icon';
import XUITooltip from '../../../tooltip';

import NOOP from '../../../components/helpers/noop';

const multiSelectItems = ['Banking', 'Reporting', 'Payroll'];
const icons = { view, numberList, dateRange, comment, highlight, card };

const createPicklist = ({ prefix, customProps, size }) => (
  <Picklist size={size} {...customProps}>
    {customProps.sizeHeader ? <PicklistHeader>{size}</PicklistHeader> : undefined}
    {multiSelectItems.map(id => (
      <Pickitem
        id={`${prefix}_${id}`}
        key={`${prefix}_${id}`}
        onClick={() => {
          console.log(`${prefix}_${id}`);
        }}
      >
        {id}
      </Pickitem>
    ))}
  </Picklist>
);

const createSizedLoggingButtons = ({ stringArray, customProps, size }) => {
  const childSet = stringArray.map(content => ({
    content,
    label: content,
  }));
  const props = { size, ...customProps };
  return createButtonSixpack({ childSet, props });
};

const createSizedIconButtons = size => {
  const childSet = Object.entries(icons).map(icon => ({
    content: <XUIIcon icon={icon[1]} title={icon[0]} />,
    label: icon[0],
  }));
  const props = {
    variant: 'icon',
    size,
  };
  return createButtonSixpack({ childSet, props });
};

const switches = (
  <Fragment>
    <XUISwitch isDefaultChecked onChange={NOOP}>
      One option you might try
    </XUISwitch>
    <XUISwitch isDisabled onChange={NOOP}>
      Another that is not an option
    </XUISwitch>
    <XUISwitch onChange={NOOP}>Third option</XUISwitch>
    <XUISwitch isDefaultChecked onChange={NOOP}>
      Yet another switch option
    </XUISwitch>
  </Fragment>
);
const createCheckboxes = size => (
  <Fragment>
    <XUICheckbox id="bird-tui" key="tui" name="" size={size} value="tui">
      Tūī
    </XUICheckbox>
    <XUICheckbox id="bird-piwakawaka" key="piwakawaka" name="piwakawaka" size={size} value="">
      Pīwakawaka
    </XUICheckbox>
    <XUICheckbox id="bird-ruru" key="ruru" name="ruru" size={size} value="ruru">
      Ruru
    </XUICheckbox>
    <XUICheckbox id="bird-moa" isDisabled key="moa" name="moa" size={size} value="moa">
      Moa
    </XUICheckbox>
  </Fragment>
);
const createRadios = size => (
  <Fragment>
    <XUIRadio id="city-wellington" key="wellington" name="city" size={size} value="wellington">
      Wellington
    </XUIRadio>
    <XUIRadio id="city-canberra" key="canberra" name="city" size={size} value="canberra">
      Canberra
    </XUIRadio>
    <XUIRadio id="city-dc" key="dc" name="city" size={size} value="dc">
      Washington D.C.
    </XUIRadio>
    <XUIRadio id="city-carthage" isDisabled key="carthage" name="city" size={size} value="carthage">
      Carthage
    </XUIRadio>
  </Fragment>
);
const createButtonSixpack = ({ childSet, props }) =>
  childSet.map((child, index) => (
    <Fragment key={index}>
      <XUIButton onClick={() => console.log(child.label)} {...props}>
        {child.content}
      </XUIButton>
      {index === 2 ? <br /> : undefined}
    </Fragment>
  ));

class RangeWrapper extends React.Component {
  state = { rangeValue: '50' };

  updateRangeValue = event => {
    this.setState({ rangeValue: event.target.value });
  };

  render() {
    return (
      <Fragment>
        <XUIRange
          max={100}
          min={0}
          onInput={this.updateRangeValue}
          {...this.props}
          label={`${this.props.label} ${this.state.rangeValue}`}
        />
      </Fragment>
    );
  }
}

class TooltipWrapper extends React.Component {
  render() {
    const { buttonContent, tipContent, triggers, size } = this.props;
    const sizeSuffix = size === 'medium' ? '' : `-${size}`;
    return (
      <XUITooltip
        trigger={<XUIButton size={size}>{buttonContent}</XUIButton>}
        triggerOnClick={triggers.indexOf('click') > -1}
        triggerOnFocus={triggers.indexOf('focus') > -1}
        triggerOnHover={triggers.indexOf('hover') > -1}
        wrapperClassName={`xui-margin-right${sizeSuffix} xui-margin-bottom${sizeSuffix}`}
      >
        {tipContent}
      </XUITooltip>
    );
  }
}

export {
  TooltipWrapper,
  RangeWrapper,
  createRadios,
  createCheckboxes,
  switches,
  createSizedIconButtons,
  createSizedLoggingButtons,
  createPicklist,
  multiSelectItems,
};
