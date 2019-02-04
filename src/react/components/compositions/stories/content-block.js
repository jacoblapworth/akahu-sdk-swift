import React, { PureComponent, Fragment } from 'react';
import { XUIContentBlock, XUIContentBlockItem } from '../../../structural';
import XUIButton from '../../../button';
import XUIIcon from '../../../icon';
import overflow from '@xero/xui-icon/icons/overflow';

export default class ContentBlock extends PureComponent {
	render() {
		return (

				<XUIContentBlock className="xui-panel">
					<XUIContentBlockItem
						primaryHeading='Heading'
						/>
					{[1,2,3].map(item => (
						<XUIContentBlockItem
							key={item}
							primaryHeading='Title'
							secondaryHeading='Subtitle'
							overflow={
								<XUIButton
									variant="icon"
									aria-label="Overflow menu"
								>
									<XUIIcon
										icon={overflow}
										isBoxed
										/>
								</XUIButton>
							}
							/>
					))}
					<XUIContentBlockItem
						primaryHeading='Title'
						secondaryHeading='Subtitle'
						description='Description &middot; Description &middot; Description'
						overflow={
							<XUIButton
								variant="icon"
								aria-label="Overflow menu"
							>
								<XUIIcon
									icon={overflow}
									isBoxed
									/>
							</XUIButton>
						}
					/>
				</XUIContentBlock>
		)
	}
}
