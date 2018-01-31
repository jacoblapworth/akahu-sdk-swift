import {createStrokeWidth} from '../customElements/WithCircularStroke';

describe('<XUIProgressIndicator /> | circular stroke width', () => {

	it('should decrease stroke width as element width inceases', () => {

		const smallElementStroke = createStrokeWidth(20);
		const mediumElementStroke = createStrokeWidth(40);
		const largeElementStroke = createStrokeWidth(60);
		const isDecreasing = (
			smallElementStroke > mediumElementStroke
			&& mediumElementStroke > largeElementStroke
		);

		expect(isDecreasing).toBeTruthy();

	});

	it('should decrease exponentially', () => {

		const smallElementStroke = createStrokeWidth(20);
		const mediumElementStroke = createStrokeWidth(40);
		const largeElementStroke = createStrokeWidth(60);
		const isExponential = (
			(mediumElementStroke - largeElementStroke)
			> (smallElementStroke - mediumElementStroke)
		);

		expect(isExponential).toBeTruthy();

	});

	it('should default to a minimum stroke width of 2 when scaling reaches its threshold', () => {

		const extraLargeElementStroke = createStrokeWidth(9999);

		expect(extraLargeElementStroke).toBe(2);

	});

});
