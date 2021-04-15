import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class Form extends React.PureComponent {
  _form = React.createRef();

  componentDidMount() {
    this._regularInputs = this._form.current?.querySelectorAll(
      'input:not([type="radio"]):not([type="checkbox"]):not(.xui-autocompleter--input)',
    );
    this._textareas = this._form.current?.querySelectorAll('textarea');
    this._radioGroups = this._form.current?.querySelectorAll('input[type=radio]');
    this._checkBoxes = this._form.current?.querySelectorAll('input[type="checkbox"]');
  }

  captureInputData = () => {
    const radioGroups = [...this._radioGroups].reduce((acc, cv) => {
      if (acc[cv.name] == null) {
        acc[cv.name] = '';
      }
      cv.checked ? (acc[cv.name] = cv.value) : '';
      return acc;
    }, {});
    const radiosForReportingBack = [];
    Object.keys(radioGroups).forEach(group => {
      radiosForReportingBack.push({ name: group, value: radioGroups[group] });
    });

    const checkBoxes = [...this._checkBoxes].reduce((acc, cv) => {
      acc.push({ name: cv.name, value: cv.checked });
      return acc;
    }, []);

    this._inputs = [
      ...this._regularInputs,
      ...this._textareas,
      ...radiosForReportingBack,
      ...checkBoxes,
    ].reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
  };

  onAllEvents = () => {
    setTimeout(() => this.captureInputData(), 50);
  };

  getInputs = () => this._inputs;

  render() {
    const { children, className, inline, stacked, noLayout, ...other } = this.props;

    return (
      <form
        role="presentation"
        {...other}
        className={cn(
          {
            'xui-form-inline': inline && !stacked && !noLayout,
            'xui-form-layout': stacked && !inline && !noLayout,
          },
          className,
        )}
        onChange={this.onAllEvents}
        onClick={this.onAllEvents}
        onKeyUp={this.onAllEvents}
        ref={this._form}
      >
        {children}
      </form>
    );
  }
}
Form.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  inline: PropTypes.bool,
  noLayout: PropTypes.bool,
  stacked: PropTypes.bool,
};