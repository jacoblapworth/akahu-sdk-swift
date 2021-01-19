import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import infoPathData from '@xero/xui-icon/icons/info';
import XUIIconButton from '../../button/XUIIconButton';
import XUIDropdown from '../../dropdown/XUIDropdown';
import XUIDropdownToggled from '../../dropdown/XUIDropdownToggled';
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
      <XUIDropdown fixedWidth hasKeyboardEvents={false} restrictFocus={false} size="small">
        <div className={`${NAME_SPACE}-chart--key`}>
          <div className={`${NAME_SPACE}-chart--key-title`}>{title}</div>
          <ul className={`${NAME_SPACE}-chart--key-list`}>{labels.map(this.createLabel)}</ul>
        </div>
      </XUIDropdown>
    );

    return (
      <XUIDropdownToggled
        dropdown={dropdown}
        qaHook={qaHook && `${qaHook}--key`}
        trigger={trigger}
      />
    );
  };
}

export default ChartKey;

ChartKey.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  labels: PropTypes.arrayOf(PropTypes.string),
  qaHook: PropTypes.string,
  title: PropTypes.string,
};
