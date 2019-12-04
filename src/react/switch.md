<div class="xui-margin-vertical">
	<a href="../section-components-controls-switch.html" isDocLink>Switch in the XUI Documentation</a>
</div>

`XUISwitch` uses an HTML checkbox under the hood and can be styled just as other control components.

## Example

```jsx harmony
import { PureComponent } from 'react';
import XUISwitch from './switch';

class Example extends PureComponent {
  constructor(...args) {
    super(...args);

    this.onChange = this.onChange.bind(this);
    this.state = {
      isSecondSwitchChecked: true
    };
  }

  onChange() {
    this.setState(prevState => ({ isSecondSwitchChecked: !prevState.isSecondSwitchChecked }));
  }

  render() {
    return (
      <div>
        <h3>Click the switch</h3>
        <div className="xui-margin-bottom">
          <XUISwitch isDefaultChecked onChange={this.onChange}>
            Enabled switch
          </XUISwitch>
        </div>
        <div>
          <XUISwitch
            isDisabled
            isChecked={this.state.isSecondSwitchChecked}
            hintMessage="Can't touch this"
          >
            Disabled switch
          </XUISwitch>
        </div>
      </div>
    );
  }
}

<Example />;
```
