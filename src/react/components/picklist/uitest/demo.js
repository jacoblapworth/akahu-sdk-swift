import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Picklist from '../Picklist';
import Pickitem from '../Pickitem';
import StatefulPicklist from '../StatefulPicklist';
import NestedPicklistContainer from '../NestedPicklistContainer';
import NestedPicklist from '../NestedPicklist';
import NestedPicklistTrigger from '../NestedPicklistTrigger';

/**
 * This is a very basic implementation of a Multiselect picklist with state to control the selected state of your
 * Pickitem's, this is just an example to demonstrate where this logic may site in the component hierarchy.
 */
class StatefulMultiselectPicklist extends Component {
	constructor(){
		super();

		this.state = {
			selectedItems: {
				2: true
			}
		};

		this.onOptionSelect = this.onOptionSelect.bind(this);
	}

	onOptionSelect(value, item){
		const smp = this;

		smp.setState(prevState => {
			return {
				selectedItems: {
					...prevState.selectedItems,
					[item.props.id] : !prevState.selectedItems[item.props.id]
				}
			}
		});
	}

	render(){
		const smp = this;
		const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

		return (
			<StatefulPicklist onSelect={this.onOptionSelect} canFocus={true}>
				<Picklist>
					<NestedPicklistContainer id="nested">
						<NestedPicklistTrigger id="nestedTrigger" ref={c => smp.trigger = c}>Nested List</NestedPicklistTrigger>
						<NestedPicklist>
							<Pickitem id="a" isSelected={smp.state.selectedItems.a}>A</Pickitem>
							<Pickitem id="b" isSelected={smp.state.selectedItems.b}>B</Pickitem>
							<Pickitem id="c" isSelected={smp.state.selectedItems.c}>C</Pickitem>
							<Pickitem id="d" isSelected={smp.state.selectedItems.d}>D</Pickitem>
						</NestedPicklist>
					</NestedPicklistContainer>
					<NestedPicklistContainer id="split">
						<Pickitem id="splitTrigger" isSplit={true} isSelected={smp.state.selectedItems.splitTrigger}>
							Split Trigger Item
						</Pickitem>
						<NestedPicklistTrigger id="nestedSplit" />
						<NestedPicklist>
							<Pickitem id="aa" isSelected={smp.state.selectedItems.aa}>aa</Pickitem>
							<Pickitem id="bb" isSelected={smp.state.selectedItems.bb}>bb</Pickitem>
							<Pickitem id="cc" isSelected={smp.state.selectedItems.cc}>cc</Pickitem>
							<Pickitem id="dd" isSelected={smp.state.selectedItems.dd}>dd</Pickitem>
						</NestedPicklist>
					</NestedPicklistContainer>
					{items.map(item => {
						return (
							<Pickitem
								id={item} /* ids must uniquely identify a certain item.  value works for us here */
								key={item} /* key uniquely identifies this Pickitem for React in this particular array of components */
								value={item} /* value passed to the onSelect callback */
								disableSelectedStyles={true} /* don't use the standard selected styles since that will be handled by the checkbox */
								multiselect={true} /* show a checkbox to tell this user whether or not the item is selected */
								isSelected={smp.state.selectedItems[item]}
								isDisabled={item === 12 || item === 4} /* disable items 12 & 4 */
							>
								{`Selectable Item ${item}`}
							</Pickitem>
						)
					})}
				</Picklist>
			</StatefulPicklist>
		);
	}
}

(function() {
	ReactDOM.render(
		<div className="xui-page-width-standard">
			<section className="xui-panel xui-margin-top xui-padding">
				<div className="xui-heading-panel xui-margin-bottom">Standard Picklist</div>
				<div>
					<StatefulPicklist onSelect={() => {}}>
						<Picklist>
							<Pickitem id='1' className="item">
								Item 1
							</Pickitem>
							<Pickitem isSelected={true} id='2'>
								Item 2
							</Pickitem>
							<Pickitem isHovered={true} id='3' href='http://xero.com' isDisabled={true}>
								Item 3
							</Pickitem>
							<Pickitem id='4' qaHook="someId">
								Item 4
							</Pickitem>
						</Picklist>
					</StatefulPicklist>
				</div>
			</section>
			<section className="xui-panel xui-margin-top xui-padding">
				<div className="xui-heading-panel xui-margin-bottom">Multiselect Stateful Picklist</div>
				<div>
					<StatefulMultiselectPicklist />
				</div>
			</section>
		</div>, document.getElementById('app')
	);
})();
