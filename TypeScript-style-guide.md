# TypeScript style guide

## Interfaces and types

Should not be prefixed with `I` or `T`. This isn't C#, converting an exported interface to a type would require a rename, and the TS compiler won't let you use an interface or type as a value anyway.

## Props

### Naming convention

Props local to a component should not include the component name when they are in the same scope (file) as the component.

```tsx
interface Props {}

export default class XUIComponent extends React.Component<Props> {}
```

If a `type` a type is required to fully describe `Props`, create an interface called `BaseProps`.

When creating union types it can be useful to separate each type to provide more helpful error messages.

```tsx
interface BaseProps {
  exampleProp?: string;
}
interface EmptyStateComponentProps {
  emptyStateComponent: React.ReactNode;
}
interface EmptyStateMessageProps {
  emptyStateMessage: string;
}

type EmptyStateProps = EmptyStateComponentProps | EmptyStateMessageProps;
type Props = BaseProps & EmptyStateProps;

export default class XUIComponent extends React.Component<Props> {}
```

### Exporting type definitions for props

To access the props of a XUI component, use React's `React.ComponentProps<typeof XUIComponent>` type.

```tsx
import XUIComponent from '@xero/xui/react/component';

interface MyComponentProps {
  xuiComponentProps: React.ComponentProps<typeof XUIComponent>;
}

class MyComponent extends React.Component<MyComponentProps> {}
```

### Prop documentation

- Props should have documentation in the form of comments to match our current PropTypes.
- Documentation should be formatted with a multiline comment, with the first and last lines empty.
- Sentences should end with a full stop.
  - Excludes situations where the full stop could be confusing.
    e.g. "Recommended English value: _Example_"

```tsx
interface Props {
  /**
   * Example documentation.
   */
  exampleProp?: string;
}

export default class XUIComponent extends React.Component<Props> {}

XUIComponent.propTypes = {
  /** Example documentation */
  exampleProp: PropTypes.string
};
```

Multiline comments should be wrapped at 100 characters.

```tsx
// ============================== This line is 100 characters wide =================================
interface Props {
  /**
   * Example documentation that contains a lot of information. In this example, the information
   * exceeds the 100 character width limit.
   */
  exampleProp?: string;
}
```

There should not be blank lines between the props in an interface or type.

```tsx
interface Props {
  /**
   * Example documentation.
   */
  exampleProp?: string;
  /**
   * More example documentation.
   */
  exampleProp2?: string;
}
```

Optional props with default values should specify what the default is on a new line.

```tsx
interface Props {
  /**
   * Example documentation.
   *
   * Defaults to `example`.
   */
  exampleProp?: string;
}
```

References to components, props, and values should be escaped with backticks.

```tsx
interface Props {
  /**
   * Example documentation for `XUIComponent`'s `exampleProp`. Try setting it to `true` or `false`.
   */
  exampleProp?: boolean;
}
```

TypeScript prop documentation should not include markup because IDE's do not support it.

```tsx
interface Props {
  /**
   * Example documentation.
   *
   * It covers 2 lines.
   */
  exampleProp?: string;
}

export default class XUIComponent extends React.Component<Props> {}

XUIComponent.propTypes = {
  /**
   * Example documentation.<br />
   * It covers 2 lines.
   */
  exampleProp: PropTypes.string
};
```

TypeScript prop documentation should not include examples of acceptable values because TypeScript already provides that information.

```tsx
interface Props {
  /**
   * Example documentation.
   */
  exampleProp?: 'small' | 'medium' | 'large';
}

export default class XUIComponent extends React.Component<Props> {}

XUIComponent.propTypes = {
  /**
   * Example documentation.
   *
   * e.g. `small`, `medium`, `large`
   */
  exampleProp: PropTypes.string
};
```
