// Libs
import React from 'react';

// Components we need to test with
import XUIRow from '../XUIRow';
import XUIColumn from '../XUIColumn';
import XUIPageheader from '../XUIPageheader';
import XUIBreadcrumb from '../XUIBreadcrumb';
import XUIPicklist from '../../picklist/Picklist';
import XUIPickitem from '../../picklist/Pickitem';
import XUIButton from '../../button/XUIButton';
import XUIIcon from '../../icon/XUIIcon';
import overflow from '@xero/xui-icon/icons/overflow';
import XUIActions from '../XUIActions';
import XUIOverviewBlock from '../XUIOverviewBlock';
import XUIOverviewSection from '../XUIOverviewSection';
import XUIPanel from '../XUIPanel';
import XUIPanelSection from '../XUIPanelSection';
import XUIPanelHeading from '../XUIPanelHeading';
import XUIPanelFooter from '../XUIPanelFooter';
import { rowVariants } from '../private/constants';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';

const buildColumns = (widths) => {
	return widths.map((width, index) => {
		return (
			<XUIColumn
				key={index}
				gridColumns={width}
				className="xui-padding-small"
				style={{backgroundColor: "RGBA(255,255,255,0.5)"}}
			>
				Content of a column with width {width}, here.
			</XUIColumn>
		);
	});
};

const exampleTabs = (
	<XUIPicklist>
		<XUIPickitem id="1">Tab 1</XUIPickitem>
		<XUIPickitem id="2" isSelected={true}>Tab 2</XUIPickitem>
		<XUIPickitem id="3">This is tab 3</XUIPickitem>
	</XUIPicklist>
);
const buildActions = (props) => {
	return (
		<XUIActions
			primaryAction={<XUIButton variant="primary" size="small">One</XUIButton>}
			secondaryAction={<XUIButton size="small">Two</XUIButton>}
			{...props}
		/>
);
};
const sampleBreadcrumb = [
	{label: "hello", href: "#1"},
	{label: "hiya", href: "#2"},
	{label: "yo"}];
const exampleBreadcrumb = (
	<XUIBreadcrumb breadcrumbs={sampleBreadcrumb}></XUIBreadcrumb>
);
const buildExampleSections = (children) => {
	return children.map((child, index) => {
		return <XUIOverviewSection key={index} {...child} />
	});
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
	const columnCount = number('number of columns', 3);
	const columnWidths = text('list of column widths', '2 8 2');
	function buildColumnsArray() {
		let widthsArr = columnWidths.split(/[,\s]+/);
		if (!widthsArr || !widthsArr.length || widthsArr[0] === "") {
			widthsArr = [];
		}
		if (widthsArr.length == columnCount) {
			return widthsArr;
		} else if (widthsArr.length > columnCount) {
			return widthsArr.slice(0, columnCount);
		} else {
			while (widthsArr.length < columnCount) {
				widthsArr.push("1");
			}
			return widthsArr;
		}
	}
	return (
		<XUIRow variant={select('variant', Object.keys(rowVariants), 'standard')} className="xui-padding-small" style={{backgroundColor: "#028DDE"}}>
			{buildColumns(buildColumnsArray())}
		</XUIRow>
	);
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	const { storyTitle, columnWidths, type, ...variationMinusStoryDetails } = variation;
	delete variationMinusStoryDetails.storyKind;
	storiesWithVariations.add(storyTitle, () => {
		if (type === "row") {
			return (
				<XUIRow {...variationMinusStoryDetails} style={{backgroundColor: "#028DDE"}} className="xui-padding-small">
					{buildColumns(columnWidths)}
				</XUIRow>
			);
		} else if (type === "pageheader") {
			if (variationMinusStoryDetails.tabs) {
				variationMinusStoryDetails.tabs = exampleTabs;
			}
			if (variationMinusStoryDetails.actions) {
				variationMinusStoryDetails.actions = buildActions();
			}
			if (variationMinusStoryDetails.breadcrumb) {
				variationMinusStoryDetails.breadcrumb = exampleBreadcrumb;
			}
			return (
				<div style={{minWidth: '700px'}}>
					<XUIPageheader {...variationMinusStoryDetails}></XUIPageheader>
				</div>
			);
		} else if (type === "overview") {
			const { sections } = variationMinusStoryDetails;
			return (
				<div style={{minWidth: "500px"}}>
					<XUIOverviewBlock {...variationMinusStoryDetails}>
						{buildExampleSections(sections)}
					</XUIOverviewBlock>
				</div>
			)
		} else if (type === "panel") {
			const header = <XUIPanelHeading>Hello there <XUIIcon isInline={true} path={overflow} /></XUIPanelHeading>;
			return (
				<XUIPanel
				header={header}
				>
						<XUIPanelSection
							headerText="I'm a section header"
							className="xui-padding-large"
						>
							<p>Some important text might go here.</p>
						</XUIPanelSection>
				</XUIPanel>
			)
		} else if (type === "panel-sidebar") {
			const header = <XUIPanelHeading>Hello there</XUIPanelHeading>;
			const footer = <XUIPanelFooter className="xui-padding-small">{buildActions()}</XUIPanelFooter>;
			return (
				<div style={{minWidth: '700px'}}>
					<XUIPanel
						header={header}
						footer={footer}
						sidebar={exampleTabs}
					>
							<XUIPanelSection
								headerText="I'm a section header"
								className="xui-padding-large"
							>
								<p>Some important text might go here.</p>
							</XUIPanelSection>
							<XUIPanelSection className="xui-padding-large">
								<p>Other critical info would go here.</p>
							</XUIPanelSection>
					</XUIPanel>
				</div>
			)
		}
	});
});
