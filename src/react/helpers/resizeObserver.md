**Note:** If you want to implement resize observers with width breakpoints, check out the [container queries](#container-queries) section.

XUI provides resize observers for monitoring and taking action depending on the size of individual elements. Rather than using CSS media queries to detect the size of the whole viewport, resize observers are attached to a DOM node. To do this, we use the Resize Observer web API and polyfills for browsers that don't yet support it.

If you are using Compositions, the grid areas already have resize observers that attach predefined width classes at XUI-standard breakpoints. It's likely you can build styles that leverage these existing observers. However, you may also wish to add your own; use these sparingly, to avoid negatively impacting browser performance.

XUI offers two versions of a resize observer: one built for function components (using React Hooks), and one built for class components. Steps to implement each are detailed below.

### Function components (React Hooks)

1. Import `useResizeObserver` from `useResizeObserver.ts` in XUI.
2. Inside the component, destructure `observedElementRef` and `contentRect` from `useResizeObserver()`.
3. Attach the `observedElementRef` to the `HTMLElement` you wish to observe.
4. To re-render a component on resize, you can use the properties of the provided `contentRect` as the dependencies of React's `useLayoutEffect` hook within your component.

#### Component swapping on resize

```jsx harmony
import { useLayoutEffect, useState } from 'react';
import overflow from '@xero/xui-icon/icons/overflow';
import XUIButton, {
  XUIButtonGroup,
  XUIIconButton,
  XUISecondaryButton,
  XUISplitButtonGroup
} from '@xero/xui/react/button';
import XUIIcon from '@xero/xui/react/icon';
import useResizeObserver from '@xero/xui/react/helpers/useResizeObserver';

const buttonGroup = (
  <XUIButtonGroup>
    <XUIButton>Delete</XUIButton>
    <XUIButton>Copy</XUIButton>
    <XUIButton>Edit</XUIButton>
  </XUIButtonGroup>
);

const splitButton = (
  <XUISplitButtonGroup>
    <XUIButton>Delete</XUIButton>
    <XUISecondaryButton aria-label="Other actions" />
  </XUISplitButtonGroup>
);

const overflowButton = (
  <XUIIconButton ariaLabel="More options" icon={overflow} title="More options" />
);

const wrapperStyles = {
  overflow: 'hidden',
  resize: 'horizontal',
  maxWidth: '100%'
};

const ResizeObserverExample = () => {
  const {
    contentRect: { width },
    observedElementRef
  } = useResizeObserver();

  const [content, setContent] = useState(overflowButton);

  useLayoutEffect(() => {
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
    <div className="xui-panel xui-padding-xsmall" ref={observedElementRef} style={wrapperStyles}>
      {content}
    </div>
  );
};
<ResizeObserverExample />;
```

### Class components

1. Import or require `observe` and `unobserve` from `resizeObserver.ts` in XUI.
2. Create a `ref` to the DOM node you wish to track, using React's `createRef` method. This should be stored in a component-level property named `_area`.
3. In `componentDidMount`, `observe` the component, after ensuring the node ref is present. Likewise, in `componentWillUnmount`, `unobserve` it.
4. Provide an `_onResize` method to your component, which upon resize will receive the `contentRect` of the element. We highly recommend debouncing or throttling this function.

#### Component swapping on resize

```jsx harmony
import { Component } from 'react';
import overflow from '@xero/xui-icon/icons/overflow';
import XUIButton, {
  XUIButtonGroup,
  XUISecondaryButton,
  XUISplitButtonGroup,
  XUIIconButton
} from '@xero/xui/react/button';
import XUIIcon from '@xero/xui/react/icon';
import { observe, unobserve } from '@xero/xui/react/helpers/resizeObserver';

const buttonGroup = (
  <XUIButtonGroup>
    <XUIButton>Delete</XUIButton>
    <XUIButton>Copy</XUIButton>
    <XUIButton>Edit</XUIButton>
  </XUIButtonGroup>
);

const splitButton = (
  <XUISplitButtonGroup>
    <XUIButton>Delete</XUIButton>
    <XUISecondaryButton aria-label="Other actions" />
  </XUISplitButtonGroup>
);

const overflowButton = (
  <XUIIconButton ariaLabel="More options" icon={overflow} title="More options" />
);

const wrapperStyles = {
  overflow: 'hidden',
  resize: 'horizontal',
  maxWidth: '100%'
};

class ResizeObserverExample extends Component {
  constructor(props) {
    super(props);
    this._area = React.createRef();
    this.state = { content: overflowButton };
  }

  componentDidMount() {
    this._area.current && observe(this);
  }

  componentWillUnmount() {
    this._area.current && unobserve(this);
  }

  _onResize(contentRect) {
    let content;
    if (contentRect.width < 600) {
      content = overflowButton;
    } else if (contentRect.width < 800) {
      content = splitButton;
    } else {
      content = buttonGroup;
    }
    this.setState({ content });
  }

  render() {
    return (
      <div className="xui-panel xui-padding-xsmall" ref={this._area} style={wrapperStyles}>
        {this.state.content}
      </div>
    );
  }
}
<ResizeObserverExample />;
```
