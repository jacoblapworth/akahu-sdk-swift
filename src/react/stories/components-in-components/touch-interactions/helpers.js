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
    <XUISwitch onChange={NOOP} isDefaultChecked>
      One option you might try
    </XUISwitch>
    <XUISwitch onChange={NOOP} isDisabled>
      Another that is not an option
    </XUISwitch>
    <XUISwitch onChange={NOOP}>Third option</XUISwitch>
    <XUISwitch onChange={NOOP} isDefaultChecked>
      Yet another switch option
    </XUISwitch>
  </Fragment>
);
const createCheckboxes = size => (
  <Fragment>
    <XUICheckbox size={size} id="bird-tui" key="tui" value="tui" name="">
      Tūī
    </XUICheckbox>
    <XUICheckbox size={size} id="bird-piwakawaka" key="piwakawaka" value="" name="piwakawaka">
      Pīwakawaka
    </XUICheckbox>
    <XUICheckbox size={size} id="bird-ruru" key="ruru" value="ruru" name="ruru">
      Ruru
    </XUICheckbox>
    <XUICheckbox size={size} id="bird-moa" key="moa" value="moa" name="moa" isDisabled>
      Moa
    </XUICheckbox>
  </Fragment>
);
const createRadios = size => (
  <Fragment>
    <XUIRadio size={size} id="city-wellington" key="wellington" value="wellington" name="city">
      Wellington
    </XUIRadio>
    <XUIRadio size={size} id="city-canberra" key="canberra" value="canberra" name="city">
      Canberra
    </XUIRadio>
    <XUIRadio size={size} id="city-dc" key="dc" value="dc" name="city">
      Washington D.C.
    </XUIRadio>
    <XUIRadio size={size} id="city-carthage" key="carthage" value="carthage" name="city" isDisabled>
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
          onInput={this.updateRangeValue}
          max={100}
          min={0}
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
        trigger={
          <XUIButton
            size={size}
            className={`xui-margin-right${sizeSuffix} xui-margin-bottom${sizeSuffix}`}
          >
            {buttonContent}
          </XUIButton>
        }
        triggerOnClick={triggers.indexOf('click') > -1}
        triggerOnFocus={triggers.indexOf('focus') > -1}
        triggerOnHover={triggers.indexOf('hover') > -1}
      >
        {tipContent}
      </XUITooltip>
    );
  }
}

module.exports = {
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
