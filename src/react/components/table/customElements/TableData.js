/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { NAME_SPACE, NBSP } from '../helpers/constants';

class HeadData extends PureComponent {
  render = () => {
    const { children, ...props } = this.props;

    return <th {...props}>{children || NBSP}</th>;
  };
}

HeadData.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  // Interaction.
  role: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

class BodyData extends PureComponent {
  // Determines if the cell has "precedence" in that it is the primary attention
  // of the user and not a nested button or link. This way a nested button can
  // stop the event from propagating up to the parent cell and invoking the
  // interaction effects like `:hover`.
  state = { hasPrecedence: false };

  removePrecedence = () => this.setPrecedence(false);
  addPrecedence = () => this.setPrecedence(true);
  setPrecedence = hasPrecedence => this.setState(() => ({ hasPrecedence }));

  render = () => {
    const { children, onClick, className: suppliedClasses, ...props } = this.props;
    const className = cn(suppliedClasses, {
      [`${NAME_SPACE}--cell-hasprecedence`]: this.state.hasPrecedence,
    });
    // TODO: Ascertain best course of action from an accessibility perspective
    // allowing nested cell interactions (`<a />`  and `<button />`) along with
    // the "best practice" requirements around tabbing (all cells -vs- interaction
    // cells only).
    //
    // eslint-disable jsx-a11y/no-noninteractive-element-interactions
    return (
      <td
        {...{
          ...props,
          ...(onClick && {
            onClick,
            onKeyDown: onClick,
            onPointerOver: onClick && this.addPrecedence,
            onPointerOut: onClick && this.removePrecedence,
            role: 'button',
          }),
        }}
        className={className}
      >
        {children || NBSP}
      </td>
    );
    // eslint-enable jsx-a11y/no-noninteractive-element-interactions
  };
}

BodyData.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  // Interaction.
  role: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const TableData = ({ isHead, ...props }) =>
  isHead ? <HeadData {...props} /> : <BodyData {...props} />;

TableData.propTypes = {
  isHead: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // Ignore remaining props - we address them in <HeadData /> and <BodyData />.
};

TableData.defaultProps = {
  tabIndex: 0,
};

export default TableData;
