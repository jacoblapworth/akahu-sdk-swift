import React, { PureComponent } from 'react';
import {
	XUIOverviewBlock,
	XUIOverviewSection
} from '../../../structural';


export default class Summary extends PureComponent {
	render() {
		return (
			<XUIOverviewBlock
				hasBackground={false}
				className='xui-panel'
			>
				{['One', 'Two', 'Three'].map((item) => (
					<XUIOverviewSection
						label={`Summary ${item.toLowerCase()}`}
						value={item}
						key={item}/>
				))}
			</XUIOverviewBlock>
		)
	}
}
