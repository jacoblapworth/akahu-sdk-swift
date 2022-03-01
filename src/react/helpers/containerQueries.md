**Note:** If you want to implement resize observers without width breakpoints, check out the [resize observers](#resize-observers) section.

XUI provides container queries as a convenience feature, related to resize observers, but which apply breakpoint logic based on the width of the observed element. They essentially provide additional breakpoint logic on top of the XUI resize observer logic.

XUI offers two versions of a container query: one built for function components (using React Hooks), and one built for class components. Steps to implement each are detailed below.

### Function components (React Hooks)

1. Import `useContainerQuery` from `useContainerQuery.ts` in XUI.
2. Inside the component, destructure `observedElementRef` and optionally, `getWidthClasses` and/or `isWidthAboveBreakpoint` from `useContainerQuery()`.
3. Attach the `observedElementRef` to the `HTMLElement` you wish to observe.

Once set up, there are two ways to use the container query.

1. Set the calculated width classes on the observed element using `getWidthClasses`. These classes do not have any styles associated with them, allowing you to set custom styles for each class.
2. To determine whether the element width is greater than or equal to a specified breakpoint, you can use the `isWidthAboveBreakpoint` function, which will return a boolean value. You can either provide a custom set of breakpoints (provided as a parameter to the `useContainerQuery` function), otherwise this will use the XUI defaults. Custom breakpoints should have string property names and numeric values, and be provided as an object of type `{ [key: string]: number }`. See the second example below for how this works in more detail.

By default, the observed element's width is calculated based on the content box, which excludes padding and borders. If you'd like to use the border box (which includes padding and borders) for width calculations, set `useBorderBox` to `true`. See the [MDN documentation on box sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) for more details.

#### Apply predefined classes at standard sizes

```jsx harmony
import cn from 'classnames';
import useContainerQuery from '@xero/xui/react/helpers/useContainerQuery';

const wrapperStyles = {
  overflow: 'hidden',
  resize: 'horizontal',
  maxWidth: '100%'
};

const ContainerQueryClassExample = () => {
  const { getWidthClasses, observedElementRef } = useContainerQuery();

  const classNames = cn(...getWidthClasses());

  return (
    <div className="xui-panel xui-padding-xsmall" style={wrapperStyles}>
      <div className={classNames} ref={observedElementRef}>
        This panel is resizable in some browsers. Try resizing the panel (or resize your window),
        and check out the classes on the inner element.
      </div>
    </div>
  );
};
<ContainerQueryClassExample />;
```

#### Apply custom breakpoints

```jsx harmony
import cross from '@xero/xui-icon/icons/cross';
import info from '@xero/xui-icon/icons/info';
import search from '@xero/xui-icon/icons/search';
import star from '@xero/xui-icon/icons/star';
import { XUIIconButton } from '@xero/xui/react/button';
import useContainerQuery from '@xero/xui/react/helpers/useContainerQuery';

const wrapperStyles = {
  overflow: 'hidden',
  resize: 'horizontal'
};

const ContainerQueryBreakpointsExample = () => {
  const breakpoints = {
    cross: 950,
    info: 750,
    search: 550,
    star: 350
  };

  const { isWidthAboveBreakpoint, observedElementRef } = useContainerQuery(breakpoints);

  return (
    <div className="xui-panel xui-padding-xsmall" ref={observedElementRef} style={wrapperStyles}>
      {isWidthAboveBreakpoint('star') && (
        <XUIIconButton ariaLabel="Favourite" icon={star} title="Favourite" />
      )}
      {isWidthAboveBreakpoint('search') && (
        <XUIIconButton ariaLabel="Search" icon={search} title="Search" />
      )}
      {isWidthAboveBreakpoint('info') && (
        <XUIIconButton ariaLabel="Information" icon={info} title="Information" />
      )}
      {isWidthAboveBreakpoint('cross') && (
        <XUIIconButton ariaLabel="Close" icon={cross} title="Close" />
      )}
    </div>
  );
};
<ContainerQueryBreakpointsExample />;
```

### Class components

1. Import or require `observe`, `unobserve` and optionally, `getWidthClasses` from `containerQuery.ts` in XUI.
2. Create a `ref` to the DOM node you wish to track using React's `createRef` method. This should be stored in a component-level property named `_area`.
3. In `componentDidMount`, `observe` the component after ensuring the node ref is present. Likewise, in `componentWillUnmount`, `unobserve` it.

Once set up, there are two ways to use the container query.

1. Set the calculated width classes on the observed element using `getWidthClasses`. These classes do not have any styles associated with them, allowing you to set custom styles for each class.
2. Provide a custom set of breakpoints as an object on the `_breakpoints` property of the component. `_breakpoints` should have string property names and numeric values, and be provided as an object of type `{ [key: string]: number }`. On resize, the properties of this object will be mapped to the component's state with a value of `true` if the element is greater than or equal to the specified pixel width, or `false` if not. See the second example below for how this works in more detail.

#### Apply predefined classes at standard sizes

```jsx harmony
import { Component, createRef } from 'react';
import cn from 'classnames';
import { observe, getWidthClasses, unobserve } from '@xero/xui/react/helpers/containerQuery';

const wrapperStyles = {
  overflow: 'hidden',
  resize: 'horizontal'
};

class ContainerQueryClassExample extends Component {
  constructor(props) {
    super(props);
    this._area = createRef();
  }

  componentDidMount() {
    this._area.current && observe(this);
  }

  componentWillUnmount() {
    this._area.current && unobserve(this);
  }

  render() {
    const classNames = cn(...getWidthClasses(this.state));

    return (
      <div className="xui-panel xui-padding-xsmall" style={wrapperStyles}>
        <div className={classNames} ref={this._area}>
          This panel is resizable in some browsers. Try resizing the panel (or resize your window),
          and check out the classes on the inner element.
        </div>
      </div>
    );
  }
}
<ContainerQueryClassExample />;
```

#### Apply custom breakpoints

```jsx harmony
import { Component, createRef } from 'react';
import star from '@xero/xui-icon/icons/star';
import cross from '@xero/xui-icon/icons/cross';
import info from '@xero/xui-icon/icons/info';
import search from '@xero/xui-icon/icons/search';
import { XUIIconButton } from '@xero/xui/react/button';
import { observe, unobserve } from '@xero/xui/react/helpers/containerQuery';

const wrapperStyles = {
  overflow: 'hidden',
  resize: 'horizontal'
};

class ContainerQueryBreakpointsExample extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._area = createRef();
    this._breakpoints = {
      cross: 950,
      info: 750,
      search: 550,
      star: 350
    };
  }

  componentDidMount() {
    this._area.current && observe(this);
  }

  componentWillUnmount() {
    this._area.current && unobserve(this);
  }

  render() {
    return (
      <div className="xui-panel xui-padding-xsmall" ref={this._area} style={wrapperStyles}>
        {this.state.star && <XUIIconButton ariaLabel="Favourite" icon={star} title="Favourite" />}
        {this.state.search && <XUIIconButton ariaLabel="Search" icon={search} title="Search" />}
        {this.state.info && (
          <XUIIconButton ariaLabel="Information" icon={info} title="Information" />
        )}
        {this.state.cross && <XUIIconButton ariaLabel="Close" icon={cross} title="Close" />}
      </div>
    );
  }
}
<ContainerQueryBreakpointsExample />;
```
