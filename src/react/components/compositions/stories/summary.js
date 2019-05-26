import React, { PureComponent } from 'react';
import {
	XUIOverviewBlock,
	XUIOverviewSection,
} from '../../../structural';


export default class Summary extends PureComponent {
	render() {
		const {
			...other
		} = this.props;

		return (
			<XUIOverviewBlock
				hasBackground={false}
				className='xui-panel'
				{...other}
			>
				{['One', 'Two', 'Three'].map(item => (
					<XUIOverviewSection
						label={`Summary ${item.toLowerCase()}`}
						value={item}
						key={item}
					/>
				))}
			</XUIOverviewBlock>
		);
	}
}
