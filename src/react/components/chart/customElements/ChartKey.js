import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import infoPathData from '@xero/xui-icon/icons/info';
import XUIIconButton from '../../button/XUIIconButton';
import DropDownToggled from '../../dropdown/DropDownToggled';
import DropDown from '../../dropdown/DropDown';
import { NAME_SPACE } from '../helpers/constants';

class ChartKey extends PureComponent {
  createLabel = (label, index) => {
    const { colors } = this.props;
    return (
      <li className={`${NAME_SPACE}-chart--key-item`} key={label}>
        <div className={`${NAME_SPACE}-chart--key-icon`} style={{ background: colors[index] }} />
        {label}
      </li>
    );
  };

  render = () => {
    const { qaHook, title, labels, icon = infoPathData } = this.props;

    const trigger = <XUIIconButton ariaLabel={title} icon={icon} title={title} />;

    const dropdown = (
      <DropDown fixedWidth hasKeyboardEvents={false} restrictFocus={false} size="small">
        <div className={`${NAME_SPACE}-chart--key`}>
          <div className={`${NAME_SPACE}-chart--key-title`}>{title}</div>
          <ul className={`${NAME_SPACE}-chart--key-list`}>{labels.map(this.createLabel)}</ul>
        </div>
      </DropDown>
    );

    return (
      <DropDownToggled dropdown={dropdown} qaHook={qaHook && `${qaHook}--key`} trigger={trigger} />
    );
  };
}

export default ChartKey;

ChartKey.propTypes = {
  qaHook: PropTypes.string,
  title: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.string),
  /**
   * Optional prop for users to modify the info key button icon, if required for localisation.
   * Defaults to the info icon, if no value is provided.
   */
  icon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),
};
