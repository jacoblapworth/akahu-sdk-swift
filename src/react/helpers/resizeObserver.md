**Note:** If you want to implement resize observers with width breakpoints, check out the [container queries](#container-queries) section.

XUI provides resize observers for monitoring and taking action depending on the size of individual elements. Rather than using CSS media queries to detect the size of the whole viewport, resize observers are attached to a DOM node. To do this, we use the Resize Observer web API and polyfills for browsers that don't yet support it.

If you are using Compositions, the grid areas already have resize observers that attach predefined width classes at XUI-standard breakpoints. It's likely you can build styles that leverage these existing observers. However, you may also wish to add your own; use these sparingly, to avoid negatively impacting browser performance.

XUI offers two versions of a resize observer: one built for function components (using React Hooks), and one built for class components. Steps to implement each are detailed below.

### Function components (React Hooks)

1. Import `useResizeObserver` from `useResizeObserver.ts` in XUI.
2. Inside the component, destructure `observedElementRef` and `contentRect` from `useResizeObserver()`.
3. Attach the `observedElementRef` to the `HTMLElement` you wish to observe.
4. To re-render a component on resize, you can use the properties of the provided `contentRect` as the dependencies of a `React.useLayoutEffect` within your component.

#### Component swapping on resize

```jsx harmony
import React from 'react';
import overflow from '@xero/xui-icon/icons/overflow';
import XUIIcon from '@xero/xui/react/icon';
import XUIButton, {
  XUIButtonGroup,
  XUISecondaryButton,
  XUISplitButtonGroup,
  XUIIconButton
} from '@xero/xui/react/button';
import useResizeObserver from '@xero/xui/react/helpers/useResizeObserver';

const buttonGroup = (
  <XUIButtonGroup>
    <XUIButton key="one">One</XUIButton>
    <XUIButton key="two">Two</XUIButton>
  </XUIButtonGroup>
);

const splitButton = (
  <XUISplitButtonGroup>
    <XUIButton key="main">Main</XUIButton>
    <XUISecondaryButton key="split" aria-label="Other actions" />
  </XUISplitButtonGroup>
);

const overflowButton = (
  <XUIIconButton icon={overflow} ariaLabel="More options" title="More options" />
);

const wrapperStyles = {
  resize: 'horizontal',
  overflow: 'hidden',
  maxWidth: '100%'
};

const ComponentSwapper = () => {
  const {
    contentRect: { width },
    observedElementRef
  } = useResizeObserver();

  const [contentToDisplay, setContent] = React.useState(overflowButton);

  React.useLayoutEffect(() => {
    let content;
    if (width < 600) {
      content = overflowButton;
    } else if (width < 800) {
      content = splitButton;
    } else {
      content = buttonGroup;
    }
    setContent(content);
  }, [width]);

  return (
    <div ref={observedElementRef} style={wrapperStyles} className="xui-panel xui-padding-xsmall">
      {contentToDisplay}
    </div>
  );
};
<ComponentSwapper />;
```

### Class components

1. Import or require `observe` and `unobserve` from `resizeObserver.ts` in XUI.
2. Create a `ref` to the DOM node you wish to track, using React's `createRef` method. This should be stored in a component-level property named `_area`.
3. In `componentDidMount`, `observe` the component, after ensuring the node ref is present. Likewise, in `componentWillUnmount`, `unobserve` it.
4. Provide an `_onResize` method to your component, which upon resize will receive the `width` of the element, in pixels. We highly recommend debouncing or throttling this function.

#### Component swapping on resize

```jsx harmony
import { Component } from 'react';
import overflow from '@xero/xui-icon/icons/overflow';
import XUIIcon from '@xero/xui/react/icon';
import XUIButton, {
  XUIButtonGroup,
  XUISecondaryButton,
  XUISplitButtonGroup,
  XUIIconButton
} from '@xero/xui/react/button';
import { observe, unobserve } from '@xero/xui/react/helpers/resizeObserver';

const buttonGroup = (
  <XUIButtonGroup>
    <XUIButton key="one">One</XUIButton>
    <XUIButton key="two">Two</XUIButton>
  </XUIButtonGroup>
);

const splitButton = (
  <XUISplitButtonGroup>
    <XUIButton key="main">Main</XUIButton>
    <XUISecondaryButton key="split" aria-label="Other actions" />
  </XUISplitButtonGroup>
);

const overflowButton = (
  <XUIIconButton icon={overflow} ariaLabel="More options" title="More options" />
);

const wrapperStyles = {
  resize: 'horizontal',
  overflow: 'hidden',
  maxWidth: '100%'
};

class ComponentSwapper extends Component {
  constructor(...args) {
    super(...args);
    this.state = { content: overflowButton };
    this._area = React.createRef();
  }

  componentDidMount() {
    this._area.current && observe(this);
  }

  componentWillUnmount() {
    this._area.current && unobserve(this);
  }

  _onResize(width) {
    let content;
    if (width < 600) {
      content = overflowButton;
    } else if (width < 800) {
      content = splitButton;
    } else {
      content = buttonGroup;
    }
    this.setState({ content });
  }

  render() {
    return (
      <div ref={this._area} style={wrapperStyles} className="xui-panel xui-padding-xsmall">
        {this.state.content}
      </div>
    );
  }
}
<ComponentSwapper />;
```
