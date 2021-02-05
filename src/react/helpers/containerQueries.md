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

#### Apply predefined classes at standard sizes

```jsx harmony
import React from 'react';
import cn from 'classnames';
import useContainerQuery from '@xero/xui/react/helpers/useContainerQuery';

const wrapperStyles = {
  resize: 'horizontal',
  overflow: 'hidden',
  maxWidth: '100%'
};

const SizeClassTest = () => {
  const { getWidthClasses, observedElementRef } = useContainerQuery();

  const classNames = cn(...getWidthClasses());

  return (
    <div
      /* On a separate element so width-classes are easier to read */
      className="xui-panel xui-padding-xsmall"
      style={wrapperStyles}
    >
      <div ref={observedElementRef} className={classNames}>
        This panel is resizeable in some browsers. Try it (or resize your window), and check out the
        classes on the inner element.
      </div>
    </div>
  );
};
<SizeClassTest />;
```

#### Apply custom breakpoints

```jsx harmony
import React from 'react';
import { XUIIconButton } from '@xero/xui/react/button';
import info from '@xero/xui-icon/icons/info';
import cross from '@xero/xui-icon/icons/cross';
import search from '@xero/xui-icon/icons/search';
import accessibility from '@xero/xui-icon/icons/accessibility';
import useContainerQuery from '@xero/xui/react/helpers/useContainerQuery';

const wrapperStyles = {
  resize: 'horizontal',
  overflow: 'hidden'
};
const BreakpointsTest = () => {
  const breakpoints = {
    info: 950,
    cross: 750,
    search: 550,
    accessibility: 350
  };

  const { isWidthAboveBreakpoint, observedElementRef } = useContainerQuery(breakpoints);

  return (
    <div ref={observedElementRef} className="xui-panel xui-padding-xsmall" style={wrapperStyles}>
      {isWidthAboveBreakpoint('accessibility') && (
        <XUIIconButton icon={accessibility} ariaLabel="Hello" title="Hello" />
      )}
      {isWidthAboveBreakpoint('search') && (
        <XUIIconButton icon={search} ariaLabel="Find one" title="Find one" />
      )}
      {isWidthAboveBreakpoint('cross') && (
        <XUIIconButton icon={cross} ariaLabel="Add another" title="Add another" />
      )}
      {isWidthAboveBreakpoint('info') && (
        <XUIIconButton icon={info} ariaLabel="More info" title="More info" />
      )}
    </div>
  );
};
<BreakpointsTest />;
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
import { Component } from 'react';
import cn from 'classnames';
import { observe, unobserve, getWidthClasses } from '@xero/xui/react/helpers/containerQuery';

const wrapperStyles = {
  resize: 'horizontal',
  overflow: 'hidden'
};

class SizeClassTest extends Component {
  constructor(...args) {
    super(...args);
    this._area = React.createRef();
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
      <div
        /* On a separate element so width-classes are easier to read */
        className="xui-panel xui-padding-xsmall"
        style={wrapperStyles}
      >
        <div ref={this._area} className={classNames}>
          This panel is resizeable in some browsers. Try it (or resize your window), and check out
          the classes on the inner element.
        </div>
      </div>
    );
  }
}
<SizeClassTest />;
```

#### Apply custom breakpoints

```jsx harmony
import { Component } from 'react';
import { XUIIconButton } from '@xero/xui/react/button';
import { observe, unobserve } from '@xero/xui/react/helpers/containerQuery';
import info from '@xero/xui-icon/icons/info';
import cross from '@xero/xui-icon/icons/cross';
import search from '@xero/xui-icon/icons/search';
import accessibility from '@xero/xui-icon/icons/accessibility';

const wrapperStyles = {
  resize: 'horizontal',
  overflow: 'hidden'
};

class BreakpointsTest extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
    this._area = React.createRef();
    this._breakpoints = {
      info: 950,
      cross: 750,
      search: 550,
      accessibility: 350
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
      <div ref={this._area} className="xui-panel xui-padding-xsmall" style={wrapperStyles}>
        {this.state.accessibility && (
          <XUIIconButton icon={accessibility} ariaLabel="Hello" title="Hello" />
        )}
        {this.state.search && <XUIIconButton icon={search} ariaLabel="Find one" title="Find one" />}
        {this.state.cross && (
          <XUIIconButton icon={cross} ariaLabel="Add another" title="Add another" />
        )}
        {this.state.info && <XUIIconButton icon={info} ariaLabel="More info" title="More info" />}
      </div>
    );
  }
}
<BreakpointsTest />;
```
