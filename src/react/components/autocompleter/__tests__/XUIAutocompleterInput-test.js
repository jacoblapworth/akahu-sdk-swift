import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import XUIAutocompleterInput from '../XUIAutocompleterInput';
import search from '@xero/xui-icon/icons/search';

Enzyme.configure({ adapter: new Adapter() });
jest.useFakeTimers();

describe('<XUIAutocompleterInput />', () => {
    it('should render an automationid when passed a qaHook', () => {
        const automationid = renderer.create(<XUIAutocompleterInput qaHook='test-qaHook' />);

        expect(automationid).toMatchSnapshot();
    });

    it('should render extra classes when passed a value in className', () => {
        const classComp = renderer.create(<XUIAutocompleterInput className='test-class' />);

        expect(classComp).toMatchSnapshot();
    });
    
    it('should render extra classes on the container when passed a value in containerClassNames', () => {
        const classComp = renderer.create(<XUIAutocompleterInput containerClassNames='test-containerClass' />);

        expect(classComp).toMatchSnapshot();
    });

    it('should render an id on the root node when passed a value in id', () => {
        const classComp = renderer.create(<XUIAutocompleterInput id='test-id' />);

        expect(classComp).toMatchSnapshot();
    });

    it('should render the placeholder inside a custom span', () => {
        const placeholderComp = renderer.create(<XUIAutocompleterInput placeholder='test-placeholder' />);

        expect(placeholderComp).toMatchSnapshot();
    });

    it('should hide the placeholder when a value is passed', () => {
        const placeholderComp = renderer.create(<XUIAutocompleterInput placeholder='test-placeholder' value='hello' />);

        expect(placeholderComp).toMatchSnapshot();
    });

    it('should call the callback onSearch when the search value changes', () => {
        const onSearch = jest.fn();
        const onSearchComp = mount(<XUIAutocompleterInput onSearch={onSearch} value='old value'/>);

        onSearchComp.find('input').simulate('change', {
            target: {
                value: 'new value'
            }
        });

        expect(onSearch.mock.calls.length).toEqual(1)
    });

    it('should call the change the value of the input when the search value changes', () => {
        const onSearchComp = mount(<XUIAutocompleterInput value='old value'/>);

        onSearchComp.find('input').simulate('change', {
            target: {
                value: 'new value'
            }
        });

        expect(onSearchComp.state().value).toEqual('new value');
        expect(onSearchComp.find('input').props().value).toEqual('new value');
    });

    it('should update the state and value of the input when the value prop changes', () => {
        const valueComp = mount(<XUIAutocompleterInput value='old value'/>);

        valueComp.setProps({ value: 'new value'});

        expect(valueComp.state().value).toEqual('new value');
        expect(valueComp.find('input').props().value).toEqual('new value');
    });

    it('should call onKeyDown when a search is made', () => {
        const onKeyDown = jest.fn();
        const onKeyDownComp = mount(<XUIAutocompleterInput onKeyDown={onKeyDown} value='old value'/>);

        onKeyDownComp.find('input').simulate('keyDown', {
            which: 65,
            keyCode: 65
        });

        expect(onKeyDown.mock.calls.length).toEqual(1)
    });

    it('should call onKeyPress when a search is made', () => {
        const onKeyPress = jest.fn();
        const onKeyPressComp = mount(<XUIAutocompleterInput onKeyPress={onKeyPress} value='old value'/>);

        onKeyPressComp.find('input').simulate('keyPress', {
            which: 65,
            keyCode: 65
        });

        expect(onKeyPress.mock.calls.length).toEqual(1)
    });

    it('should call onFocus when the input is in focus', () => {
        const onFocus = jest.fn();
        const onFocusComp = mount(<XUIAutocompleterInput onFocus={onFocus} value='old value'/>);

        onFocusComp.find('input').simulate('focus');

        expect(onFocus.mock.calls.length).toEqual(1)
    });

    it('should spread ariaAttributes on the input element', () => {
        const ariaComp = renderer.create(<XUIAutocompleterInput ariaAttributes={{ role: 'searchbox' }} />);

        expect(ariaComp).toMatchSnapshot();
    });

    it('should spread iconAttributes on the icon element', () => {
        const iconComp = renderer.create(<XUIAutocompleterInput iconAttributes={{ path: search, position: 'left' }}/>);

        expect(iconComp).toMatchSnapshot();
    });

    it('should include the default layout classes when defaultStyling is true', () => {
        const styleComp = renderer.create(<XUIAutocompleterInput defaultStyling/>);

        expect(styleComp).toMatchSnapshot();
    });

    it('shouldn\'t include the default layout classes when defaultStyling is false', () => {
        const styleComp = renderer.create(<XUIAutocompleterInput defaultStyling={false}/>);

        expect(styleComp).toMatchSnapshot();
    });

    it('should include the default layout classes by default', () => {
        const styleComp = renderer.create(<XUIAutocompleterInput />);

        expect(styleComp).toMatchSnapshot();
    });

    it('shoudl add a reference to the XUIInput when passed a refFn prop', () => {
        let ref = null;
        const refFn = c => ref = c;
        
        mount(<XUIAutocompleterInput refFn={refFn} />);

        expect(ref).not.toBeNull();
    });

    it('should bind the throttle to the component when a throttleInterval is updated', () => {
        const onSearch = jest.fn();
        const boundComp = mount(<XUIAutocompleterInput throttleInterval={100} onSearch={onSearch} value='old value'/>);

        boundComp.find('input').simulate('change', {
            target: {
                value: 'new value'
            }
        });
        jest.runTimersToTime(60);
        expect(onSearch.mock.calls.length).toEqual(1);
        jest.clearAllTimers();

        boundComp.setProps({throttleInterval: 50});
        boundComp.find('input').simulate('change', {
            target: {
                value: 'new value'
            }
        });
        
        jest.runTimersToTime(60);
        expect(onSearch.mock.calls.length).toEqual(2);
        
        expect(boundComp.props().throttleInterval).toEqual(50);

    });
});