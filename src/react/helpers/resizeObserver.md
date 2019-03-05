XUI provides container queries for monitoring and taking action depending on the size of individual elements. Rather than using CSS media queries to detect the size of the whole viewport, container queries are attached to a DOM node. To do this, we use the Resize Observer web API and polyfills for browsers that don't yet support it.

If you are using Compositions, the grid areas already have resize observers that attach predefined width classes at XUI-standard breakpoints. It's likely you can build styles that leverage these existing observers. However, you may also wish to add your own; use these sparingly, to avoid negatively impacting browser performance.

There are few steps to set up additional observers.

1. Import or require `observe`, `unobserve` and optionally, `getWidthClasses` from `resizeObserver.js` in XUI
2. Create a `ref` to the DOM node you wish to track, using React's `createRef` method. This should be stored in a component-level property named `_area`
3. In `componentDidMount`, `observe` the component, after ensuring the node ref is present. Likewise, in `componentWillUnmount`, `unobserve` it

Once set up, there are a few ways to use the observers.

1. Set the predefined width classes on the observed element, using `getWidthClasses`
2. Provide a custom set of breakpoints as an object on the `_breakpoints` property of the component. `_breakpoints` should have string property names and numeric values. On resize, the properties of this object will be mapped to the component's state with a value of `true` if the element is greater than or equal to the specified pixel width, or `false` if not. See the first sample, below, for how this works with the predefined breakpoints.
3. Provide an `_onResize` method of your component, which upon resize will be receive the `width` of the element, in pixels. We highly recommend debouncing or throttling this function

## Examples

### Applies predefined classes at standard sizes
```jsx
const { Component } = require('react');
const cn = require('classnames').default;
const { observe, unobserve, getWidthClasses } = require('../helpers/resizeObserver');

const wrapperStyles = {
	resize: 'horizontal',
	overflow: 'hidden',
};

class SizeClassTest extends Component {
	constructor() {
		super();
		this._area = React.createRef();
	}

	componentDidMount() {
		this._area.current && observe(this);
	}

	componentWillUnmount() {
		this._area.current && unobserve(this);
	}

	render() {
		const classNames = cn(
			...getWidthClasses(this.state),
		);

		return (
			<div
				/* On a separate element so width-classes are easier to read */
				className="xui-panel xui-padding-xsmall"
				style={wrapperStyles}
			>
				<div
					ref={this._area}
					className={classNames}
				>
					This panel is resizeable in some browsers. Try it (or resize your window), and check out the classes on the inner element.
				</div>
			</div>
		);
	}
}
<SizeClassTest />
```

### Applies custom breakpoints
```jsx
const { Component } = require('react');
const cn = require('classnames').default;
const XUIIcon = require('../components/icon/XUIIcon').default;
const XUIButton = require('../components/button/XUIButton').default;
const { observe, unobserve } = require('../helpers/resizeObserver');
const info = require('@xero/xui-icon/icons/info').default;
const cross = require('@xero/xui-icon/icons/cross').default;
const search = require('@xero/xui-icon/icons/search').default;
const accessibility = require('@xero/xui-icon/icons/accessibility').default;

const wrapperStyles = {
	resize: 'horizontal',
	overflow: 'hidden',
};

class BreakpointsTest extends Component {
	constructor() {
		super();
		this.state = {};
		this._area = React.createRef();
		this._breakpoints = {
			'info': 950,
			'cross': 750,
			'search': 550,
			'accessibility': 350,
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
			<div
				ref={this._area}
				className="xui-panel xui-padding-xsmall"
				style={wrapperStyles}
			>
				{this.state.accessibility && (
					<XUIButton variant="icon">
						<XUIIcon icon={accessibility} title="Hello" />
					</XUIButton>
				)}
				{this.state.search && (
					<XUIButton variant="icon">
						<XUIIcon icon={search} title="Find one" />
					</XUIButton>
				)}
				{this.state.cross && (
					<XUIButton variant="icon">
						<XUIIcon icon={cross} title="Add another" />
					</XUIButton>
				)}
				{this.state.info && (
					<XUIButton variant="icon">
						<XUIIcon icon={info} title="More info" />
					</XUIButton>
				)}
			</div>
		);
	}
}
<BreakpointsTest />
```

### Component swapping on resize
```jsx
const { Component } = require('react');
const overflow = require('@xero/xui-icon/icons/overflow').default;
const XUIIcon = require('../components/icon/XUIIcon').default;
const XUIButton = require('../components/button/XUIButton').default;
const XUIButtonGroup = require('../components/button/XUIButtonGroup').default;
const XUISecondaryButton = require('../components/button/XUISecondaryButton').default;
const XUISplitButtonGroup = require('../components/button/XUISplitButtonGroup').default;
const { observe, unobserve } = require('../helpers/resizeObserver');

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
	<XUIButton variant="icon">
		<XUIIcon icon={overflow} title="More options" />
	</XUIButton>
);

const wrapperStyles = {
	resize: 'horizontal',
	overflow: 'hidden',
	maxWidth: '100%',
};

class ComponentSwapper extends Component {
	constructor() {
		super();
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
	};

	render() {
		return (
			<div
				ref={this._area}
				style={wrapperStyles}
				className="xui-panel xui-padding-xsmall"
			>
				{this.state.content}
			</div>
		);
	}
}
<ComponentSwapper />
```
