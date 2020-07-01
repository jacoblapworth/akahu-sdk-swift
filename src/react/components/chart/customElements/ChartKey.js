import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import infoPathData from '@xero/xui-icon/icons/info';
import XUIIconButton from '../../button/XUIIconButton';
import XUIDropDown from '../../dropdown/XUIDropDown';
import XUIDropDownToggled from '../../dropdown/XUIDropDownToggled';
import { NAME_SPACE } from '../helpers/constants';

class ChartKey extends PureComponent {
  createLabel = (label, index) => (
    <li className={`${NAME_SPACE}-chart--key-item`} key={label}>
      <div
        className={`${NAME_SPACE}-chart--key-icon`}
        style={{ background: this.props.colors[index] }}
      />
      {label}
    </li>
  );

  render = () => {
    const { qaHook, title, labels } = this.props;

    const trigger = <XUIIconButton ariaLabel={title} icon={infoPathData} title={title} />;

    const dropdown = (
      <XUIDropDown fixedWidth hasKeyboardEvents={false} restrictFocus={false} size="small">
        <div className={`${NAME_SPACE}-chart--key`}>
          <div className={`${NAME_SPACE}-chart--key-title`}>{title}</div>
          <ul className={`${NAME_SPACE}-chart--key-list`}>{labels.map(this.createLabel)}</ul>
        </div>
      </XUIDropDown>
    );

    return (
      <XUIDropDownToggled
        dropdown={dropdown}
        qaHook={qaHook && `${qaHook}--key`}
        trigger={trigger}
      />
    );
  };
}

export default ChartKey;

ChartKey.propTypes = {
  qaHook: PropTypes.string,
  title: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.string),
};
