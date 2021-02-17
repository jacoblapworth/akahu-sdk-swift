import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { axe, toHaveNoViolations } from 'jest-axe';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import noop from '../../helpers/noop';
import XUIBarChart from '../XUIBarChart';
import StackedBar from '../customElements/StackedBar';
import ContentPagination from '../customElements/ContentPagination';
import { X_AXIS_HEIGHT, Y_AXIS_WIDTH } from '../helpers/constants';
import { createChartPadding } from '../helpers/utilities';
import { enrichParams } from '../helpers/bars';
import { barChartTheme } from '../helpers/theme';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

const getFirstCallsParams = handlers => handlers.mock.calls[0];

const standardBarsProps = {
  barsData: [
    { id: '123', x: 'Apple', y: 1 },
    { id: '456', x: 'Potato', y: 2 },
    { id: '789', x: 'Carrot', y: 3 },
  ],
};

const standardColorProps = {
  barColor: 'blue',
  barColorActive: 'green',
};

const standardKeyProps = {
  keyTitle: 'Healthy Food',
  keyLabel: 'Fruit',
};

const stackedBarsProps = {
  isBarStacked: true,
  barsData: [
    { id: '123', x: 'Apple', y: [1] },
    { id: '456', x: 'Potato', y: [1, 2] },
    { id: '789', x: 'Carrot', y: [1, 2, 3] },
  ],
};

const defaultChartProps = {
  qaHook: 'myChart',
  chartId: '123',
  chartTitle: 'Chart Test',
  chartDescription: 'Chart Jest test',
  keyTitle: 'Graph key',
  emptyMessage: 'There is no data to display',
  paginationNextTitle: 'Next page',
  paginationPreviousTitle: 'Previous page',
  loadingAriaLabel: 'Loading',
};

const defaultChartPadding = createChartPadding({
  xAxisHeight: X_AXIS_HEIGHT,
  yAxisWidth: Y_AXIS_WIDTH,
});

const defaultBarProps = {
  // XUI...
  chartId: '123',
  yAxisTickValues: [0, 1, 2, 3],
  yAxisHeight: 300,
  colorStacks: ['black'],
  colorActive: 'green',
  activeBars: {},
  barWidth: 100,
  isToolTipHidden: false,
  updateToolTip: noop,
  padding: defaultChartPadding,

  // Victory...
  datum: stackedBarsProps.barsData[0],
  index: 2,
};

const defaultPaginationProps = {
  qaHook: 'myChart',
  current: 2,
  total: 5,
  createMessage: noop,
  updatePanel: noop,
  paginationLabel: 'Pagination',
  paginationNextTitle: 'Next',
  paginationPreviousTitle: 'Previous',
};

const createEnrichedParams = propsRaw => {
  const component = shallow(<XUIBarChart {...propsRaw} />);
  const state = component.dive().state();
  const props = component.props();

  return enrichParams(state, props, barChartTheme);
};

describe('<XUIBarChart />', () => {
  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIBarChart
        chartId="chartPlainBar"
        chartTitle="Plain Bar Implementation"
        emptyMessage="There is no data to display"
        keyTitle="Graph key"
      />,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe('"Standard" to "Stacked" bar enrichment', () => {
    const propsRaw = {
      ...defaultChartProps,
      ...standardBarsProps,
      ...standardColorProps,
      ...standardKeyProps,
    };
    const { barsData: barsDataRaw, keyLabel: keyLabelRaw, barColor: barColorRaw } = propsRaw;
    const { barsData, keyLabel, barColorStacks } = createEnrichedParams(propsRaw);

    it('Should convert standard bars into stacked variants', () => {
      barsData.forEach(({ y }, index) =>
        expect(y).toEqual(expect.arrayContaining([barsDataRaw[index].y])),
      );
    });

    it('Should convert standard keys into stacked variants', () => {
      expect(keyLabel).toEqual(expect.arrayContaining([keyLabelRaw]));
    });

    it('Should convert standard colors into stacked variants', () => {
      expect(barColorStacks).toEqual(expect.arrayContaining([barColorRaw]));
    });
  });

  describe('Key render conditions', () => {
    const getHasKey = keyLabel =>
      createEnrichedParams({
        ...defaultChartProps,
        ...stackedBarsProps,
        keyLabel,
      }).hasKey;

    it('Should not render a key with empty data', () => {
      const hasKey = getHasKey();

      expect(hasKey).toBeFalsy();
    });

    it('Should not render stacked keys with incomplete data', () => {
      const hasKey = getHasKey(['Fruit']);

      expect(hasKey).toBeFalsy();
    });
  });

  describe('"Standard" bar interaction', () => {
    const handleClick = jest.fn();
    const createMessage = jest.fn();
    const component = mount(
      <svg>
        <StackedBar
          {...defaultBarProps}
          onBarClick={handleClick}
          createToolTipMessage={createMessage}
        />
      </svg>,
    );
    const rect = component.find('g > rect').at(0);
    const barObject = {
      id: '123',
      x: 'Apple',
      y: 1,
      barIndex: 2,
    };

    it('Should return the current "Standard" bar data set on click', () => {
      rect.simulate('click');
      const [, params] = getFirstCallsParams(handleClick);

      expect(params).toMatchObject(barObject);
    });

    it('Should return the current "Standard" bar data set on mouse enter', () => {
      rect.simulate('mouseEnter');
      const [params] = getFirstCallsParams(createMessage);

      expect(params).toMatchObject(barObject);
    });
  });

  describe('"Stacked" bar interaction', () => {
    const handleClick = jest.fn();
    const createMessage = jest.fn();
    const component = mount(
      <svg>
        <StackedBar
          {...defaultBarProps}
          isBarStacked
          onBarClick={handleClick}
          createToolTipMessage={createMessage}
        />
      </svg>,
    );
    const rect = component.find('g > rect').at(0);
    const barObject = {
      id: '123',
      x: 'Apple',
      y: [1],
      barIndex: 2,
      stackIndex: 0,
    };

    it('Should pass on the current "Stacked" bar data set on click', () => {
      rect.simulate('click');
      const [, params] = getFirstCallsParams(handleClick);

      expect(params).toMatchObject(barObject);
    });

    it('Should pass on the current "Stacked" bar data set on mouse enter', () => {
      rect.simulate('mouseEnter');
      const [params] = getFirstCallsParams(createMessage);

      expect(params).toMatchObject(barObject);
    });
  });

  describe('Pagination interaction', () => {
    it('Should pass on the current panel relationship when targeting the "previous" panel', () => {
      const createMessage = jest.fn();
      mount(<ContentPagination {...defaultPaginationProps} createMessage={createMessage} />);
      const params = getFirstCallsParams(createMessage);

      expect(params).toEqual(expect.arrayContaining([2, 5]));
    });

    it('Should disable the "previous" button when the current panel is at its "minimum" value', () => {
      const component = renderer.create(
        <ContentPagination {...defaultPaginationProps} current={1} />,
      );
      expect(component).toMatchSnapshot();
    });

    it('Should disable the "next" button when the current panel is at its "maximum" value', () => {
      const component = renderer.create(
        <ContentPagination {...defaultPaginationProps} current={defaultPaginationProps.total} />,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
