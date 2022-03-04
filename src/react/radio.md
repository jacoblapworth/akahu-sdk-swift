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

<div>
  <span className="xui-text-label xui-fieldlabel-layout" id="uncontrolledRadios">
    Period
  </span>
  <div aria-labelledby="uncontrolledRadios" role="radiogroup">
    <XUIRadio isDefaultChecked name="period-uncontrolled">
      Day
    </XUIRadio>
    <XUIRadio name="period-uncontrolled">Month</XUIRadio>
    <XUIRadio name="period-uncontrolled">Quarter</XUIRadio>
    <XUIRadio isDisabled name="period-uncontrolled">
      Year
    </XUIRadio>
  </div>
</div>;
```

### Controlled

You can create controlled inputs by setting `isChecked` on radio items and using `onChange` to update the selected item.

```jsx harmony
import { useState } from 'react';
import XUIRadio from '@xero/xui/react/radio';

const options = ['Day', 'Month', 'Quarter', 'Year'];

const RadioExample = () => {
  const [selectedItem, setSelectedItem] = useState('Day');

  const onChange = event => {
    setSelectedItem(event.target.value);
  };

  return (
    <div>
      <span className="xui-text-label xui-fieldlabel-layout" id="controlledRadios">
        {selectedItem == null ? 'Period' : `Selected period: ${selectedItem}`}
      </span>
      <div aria-labelledby="controlledRadios" role="radiogroup">
        <div>
          {options.map(option => (
            <XUIRadio
              isChecked={selectedItem === option}
              key={option}
              onChange={onChange}
              value={option}
            >
              {option}
            </XUIRadio>
          ))}
        </div>
      </div>
    </div>
  );
};

<RadioExample />;
```

### Reversed labels

Use the `isReversed` prop to have the label appear to the left of the checkbox element.

```jsx harmony
import XUIRadio from '@xero/xui/react/radio';

<div>
  <span className="xui-text-label xui-fieldlabel-layout" id="reversedRadios">
    Period
  </span>
  <div aria-labelledby="reversedRadios" role="radiogroup">
    <XUIRadio isDefaultChecked isReversed name="period-reversed">
      Day
    </XUIRadio>
    <XUIRadio isReversed name="period-reversed">
      Month
    </XUIRadio>
    <XUIRadio isDisabled isReversed name="period-reversed">
      Quarter
    </XUIRadio>
    <XUIRadio isDisabled isReversed name="period-reversed">
      Year
    </XUIRadio>
  </div>
</div>;
```

It is also possible to use the `isLabelHidden` prop to visually hide the label, but we strongly recommend providing a label for accessibility purposes, even if it will be hidden.

### Custom Icons

`XUIRadio` supports the use of a custom [`XUIIcon`](#icon) to style the presentation of the element.

`iconMain` is the icon object from `@xero/xui-icon` to render in place of the standard radio control.

```jsx harmony
import star from '@xero/xui-icon/icons/star';
import XUIRadio from '@xero/xui/react/radio';

<div>
  <span className="xui-text-label xui-fieldlabel-layout" id="starredRadios">
    Reports
  </span>
  <div aria-labelledby="starredRadios" role="radiogroup">
    <XUIRadio name="starredReport" iconMain={star} isDefaultChecked>
      Balance Sheet
    </XUIRadio>
    <XUIRadio name="starredReport" iconMain={star}>
      Profit and loss
    </XUIRadio>
    <XUIRadio name="starredReport" iconMain={star}>
      Account transactions
    </XUIRadio>
  </div>
</div>;
```
