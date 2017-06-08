import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Positioning from '../Positioning';

import './test.scss';

//Using forceUpdate to pass the parent DOM after it's rendered.
class Wrapper extends Component {
	componentDidMount() {
		this.forceUpdate();
	}

	render() {
		return (
			<div id='dropdown-wrapper' className='fake-positioning' ref={wrapper => this.wrapper = wrapper}>
				<button className="xui-button xui-button-standard" onClick={()=>{}}>DropDown</button>
				<Positioning className="container-1" parentRef={this.wrapper}>
					<div className="fake-positioned-element">
						<p>Empty Section That Can be Positioning </p>
					</div>
				</Positioning>
			</div>
		);
	}
}

ReactDOM.render(
	<div>
		<div className="xui-panel xui-padding">
			<div className="xui-heading xui-margin-bottom">Positioning Components Relative to a Trigger</div>
			<p>For demo purposes, these components have been randomly placed on the document body using CSS specific to this test page.</p>
		</div>
		<Wrapper />
	</div>
	, document.getElementById('app')
);
