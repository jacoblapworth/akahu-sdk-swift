import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIAutocompleterEmptyState from '../XUIAutocompleterEmptyState';
import filter from '@xero/xui-icon/icons/filter';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIAutocompleterEmptyState />', () => {
    it('should render an automation id when passed in the qaHook prop', () => {
        const automationid = renderer.create(<XUIAutocompleterEmptyState qaHook={'test-qahook'} />);

        expect(automationid).toMatchSnapshot();
    });

    it('should render an id when passed in the id prop', () => {
        const idComp = renderer.create(<XUIAutocompleterEmptyState id={'test-id'} />);

        expect(idComp).toMatchSnapshot();
    });

    it('should render extra classes on the root node when passed in the classname prop', () => {
        const classComp = renderer.create(<XUIAutocompleterEmptyState className={'test-class'} />);

        expect(classComp).toMatchSnapshot();
    });

    it('should include an icon that defaults to search', () => {
        const iconComp = renderer.create(<XUIAutocompleterEmptyState />);

        expect(iconComp).toMatchSnapshot();
    });

    it('should change the icon when the name is passed to iconPath', () => {
        const iconComp = renderer.create(<XUIAutocompleterEmptyState iconPath={filter}/>);

        expect(iconComp).toMatchSnapshot();
    });

    it('should render any children after the icon', () => {
        const childComp = renderer.create(<XUIAutocompleterEmptyState>Example Child Text</XUIAutocompleterEmptyState>);

        expect(childComp).toMatchSnapshot();
    });
});