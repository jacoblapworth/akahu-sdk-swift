<div class="xui-margin-vertical">
	<a href="../section-components-controls-radio.html" isDocLink>Radio in the XUI Documentation</a>
</div>

Enhanced version of the native radio element. Use in place of `<input type="radio" />`.

The `XUIRadio` supports properties for use with forms like the HTML radio input, including `isRequired`, `name`, and `value`.

Avoid partially disabled groups in which one of the disabled options is pre-selected. This combination has been known to cause unexpected results for keyboard navigation.

## Examples

### Uncontrolled

You can use as an uncontrolled component by not setting `isChecked` on any of the radio buttons, and optionally providing an `isDefaultChecked` property on one.

```jsx harmony
import XUIRadio from '@xero/xui/react/radio';

<div role="radiogroup" aria-label="test group">
  <XUIRadio name="test" isDefaultChecked hintMessage="Hint message">
    Option 1
  </XUIRadio>
  <XUIRadio name="test">Option 2</XUIRadio>
  <XUIRadio name="test">Option 3</XUIRadio>
  <XUIRadio name="test" isDisabled>
    Option 4
  </XUIRadio>
</div>;
```

### Controlled

You can create controlled inputs by setting `isChecked` on radio items and using `onChange` to update the selected item.

```jsx harmony
import XUIRadio from '@xero/xui/react/radio';
import { PureComponent } from 'react';

const options = ['Cats', 'Dogs', 'Birds', 'Fish'];

class Example extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedItem: null
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      selectedItem: e.target.value
    });
  }

  render() {
    const { selectedItem } = this.state;
    return (
      <div role="radiogroup" aria-label="pets group">
        {selectedItem == null ? "What're your favourite pets?" : `Your favourite: ${selectedItem}`}
        <div>
          {options.map(option => (
            <XUIRadio
              key={option}
              value={option}
              isChecked={selectedItem === option}
              onChange={this.onChange}
            >
              {option}
            </XUIRadio>
          ))}
        </div>
      </div>
    );
  }
}

<Example />;
```

### Reversed labels

Use the `isReversed` prop to have the label appear to the left of the checkbox element.

```jsx harmony
import XUIRadio from '@xero/xui/react/radio';

<div role="radiogroup" aria-label="reversed group">
  <XUIRadio isReversed name="reversedRadios">
    Option 1
  </XUIRadio>
  <XUIRadio isReversed name="reversedRadios">
    Option 2
  </XUIRadio>
  <XUIRadio isReversed name="reversedRadios" isDisabled>
    Option 3
  </XUIRadio>
  <XUIRadio isReversed name="reversedRadios" isDisabled isDefaultChecked>
    Option 4
  </XUIRadio>
</div>;
```

It is also possible to use the `isLabelHidden` prop to visually hide the label, but we strongly recommend providing a label for accessibility purposes, even if it will be hidden.

### Custom Icons

`XUIRadio` supports the use of a custom [`XUIIcon`](#icon) to style the presentation of the element.

`iconMain` is the icon object from `@xero/xui-icon` to render in place of the standard radio control.

```jsx harmony
import XUIRadio from '@xero/xui/react/radio';
import star from '@xero/xui-icon/icons/star';

<div>
  <XUIRadio name="customRadio" iconMain={star}>
    Option 1
  </XUIRadio>
  <XUIRadio name="customRadio" iconMain={star}>
    Option 2
  </XUIRadio>
  <XUIRadio name="customRadio" iconMain={star}>
    Option 3
  </XUIRadio>
</div>;
```
