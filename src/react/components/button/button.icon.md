For buttons that only contain an icon, use `<XUIIconButton />`.

The `icon` and `ariaLabel` props are required when using this component.

Inverted style will be applied when `isInverted` prop is passed.

The `size` prop is used for the size classes of the iconButton, and the `iconSize` prop is used for the size classes of the icon.

```jsx harmony
import { XUIIconButton } from '../../button';
import ExampleContainer from '../../docs/ExampleContainer';
import overflowIcon from '@xero/xui-icon/icons/overflow';

const requiredProps = {
  icon: overflowIcon,
  ariaLabel: 'Dots menu'
};

<div>
  <XUIIconButton {...requiredProps} />
  <XUIIconButton {...requiredProps} size="small" />
  <XUIIconButton {...requiredProps} size="xsmall" />
  <ExampleContainer className="xui-padding-xsmall" isInverted>
    <XUIIconButton {...requiredProps} isInverted />
    <XUIIconButton {...requiredProps} size="small" isInverted />
    <XUIIconButton {...requiredProps} size="xsmall" isInverted />
  </ExampleContainer>
</div>;
```
