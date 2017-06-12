import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SelectBox from '../SelectBox';
import SelectBoxOption from '../SelectBoxOption';
import SelectBoxOptionGroup from '../SelectBoxOptionGroup';
import TextHelpers from '../TextHelpers';

import '../scss/_select-box.scss';

const CustomDoggy =(
	<div style={{height: '200px', backgroundColor: '#ADFF2F', padding: '15px'}}>
		<span>This is a custom doggie with a really long name, which is almost as long as its hair. I want a dog named Shadow.</span>
	</div>
);

const bikes = ['Santa Cruz', 'Transition', 'Lapierre', 'Surly', 'Kona', 'i love mtb so much i want to scream from the mountain tops before crushing tight berms on my way to delivered salvation'];
const boats = ['Waka', 'Pontoon', 'Sailboat', 'Schooner', 'Dingy'];
const dogs = ['Beagle', 'Retriever', 'Boxer', 'Husky', 'Collie', CustomDoggy];

class MiniApp extends Component {
	constructor (props, context) {
		super(props, context);

		this.state = {
			selectedBike: bikes[2],
			selectedBoat: [boats[1], boats[3]],
			selectedDog: null
		};
		[
			this.onBikeSelect,
			this.onBoatSelect,
			this.onDogSelect,
		].forEach(fn => {
			this[fn.name] = fn.bind(this);
		});
	}

	onBikeSelect(value) {
		this.setState({
			selectedBike: value
		});
	}

	onBoatSelect(value) {
		if (this.state.selectedBoat.indexOf(value) > -1) {
			this.setState({
				selectedBoat: this.state.selectedBoat.filter(boat => boat !== value)
			});
		} else {
			this.setState({
				selectedBoat: [...this.state.selectedBoat, value]
			});
		}
	}

	onDogSelect(value) {
		this.setState({
			selectedDog: value
		});
	}

	render () {
		const MiniApp = this;

		return (
			<form className="xui-form-layout">

				<SelectBox
					containerClasses="xui-fieldlabel-layout"
					ref={c => this.selectOne = c}
					name="selectOne"
					label="Select a Bike"
					buttonContent={TextHelpers.getText(MiniApp.state.selectedBike, 'Choose a Bike')}
					isTextTruncated={false}
				>
					{bikes.map((opt, idx) => {
						return (
							<SelectBoxOption
								id={opt}
								key={idx + opt + 'userDefined Key'}
								isSelected={opt === MiniApp.state.selectedBike}
								value={opt}
								onSelect={MiniApp.onBikeSelect}
							>
								{opt}
							</SelectBoxOption>
						);
					})}
				</SelectBox>

				<SelectBox
					containerClasses="xui-fieldlabel-layout"
					ref={c => this.multiSelect = c}
					name="multiSelect"
					buttonContent={TextHelpers.getText(MiniApp.state.selectedBoat, 'Choose a few boats')}
					label="Select Several Boats"
					closeAfterSelection={false}
					onSelect={MiniApp.onBoatSelect}
				>
					{boats.map((opt, idx) => {
						return (
							<SelectBoxOption
								id={opt}
								key={idx + opt + 'userDefined Key'}
								showCheckboxes={true}
								isSelected={MiniApp.state.selectedBoat.indexOf(opt) >= 0}
								value={opt}
							>
								{opt}
							</SelectBoxOption>
						);
					})}
				</SelectBox>

				<h3>Default Layout: false</h3>
				<SelectBox
					ref={c => this.selectOne = c}
					label="Field Label"
					defaultLayout={false}
					buttonContent={TextHelpers.getText(MiniApp.state.selectedDog, 'Choose a Dog')}
					onSelect={MiniApp.onDogSelect}
				>
					<SelectBoxOption
						id="thing"
						isSelected={MiniApp.state.selectedDog === 'thing'}
						value="thing"
						defaultLayout={false}
						truncatedText
					>
						The thing
					</SelectBoxOption>
					<SelectBoxOptionGroup
						defaultLayout={false}
						label={'Group Label'}
					>
						{dogs.map((opt, idx) => {
							const value = typeof opt === 'string' ? opt : 'custom';
							return (
								<SelectBoxOption
									id={value}
									key={idx + opt + 'userDefined Key'}
									isSelected={opt === MiniApp.state.selectedDog || (!(typeof opt === 'string') && MiniApp.state.selectedDog === 'custom')}
									value={value}
									defaultLayout={false}
									truncatedText={true}
								>
									{opt}
								</SelectBoxOption>
							);
						})}
					</SelectBoxOptionGroup>
				</SelectBox>
			</form>
		);
	}
}

ReactDOM.render(
	<MiniApp />, document.getElementById('app')
);
