import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import infoPathData from '@xero/xui-icon/icons/info';
import XUIIconButton from '../../button/XUIIconButton';
import DropDownToggled from '../../dropdown/DropDownToggled';
import DropDown from '../../dropdown/DropDown';
import { NAME_SPACE } from '../helpers/constants';

class ChartKey extends PureComponent {
  createLabel = (label, index) => (
    <li key={label} className={`${NAME_SPACE}-chart--key-item`}>
      <div
        className={`${NAME_SPACE}-chart--key-icon`}
        style={{ background: this.props.colors[index] }}
      />
      {label}
    </li>
  );

  render = () => {
    const { qaHook, title, labels } = this.props;

    const trigger = <XUIIconButton icon={infoPathData} ariaLabel={title} title={title} />;

    const dropdown = (
      <DropDown fixedWidth size="small" hasKeyboardEvents={false} restrictFocus={false}>
        <div className={`${NAME_SPACE}-chart--key`}>
          <div className={`${NAME_SPACE}-chart--key-title`}>{title}</div>
          <ul className={`${NAME_SPACE}-chart--key-list`}>{labels.map(this.createLabel)}</ul>
        </div>
      </DropDown>
    );

    return (
      <DropDownToggled qaHook={qaHook && `${qaHook}--key`} trigger={trigger} dropdown={dropdown} />
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
