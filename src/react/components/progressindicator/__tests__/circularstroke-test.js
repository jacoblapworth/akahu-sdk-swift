import { createDynamicThickness } from '../customElements/WithCircularGrowth';

describe('<XUIProgressIndicator /> | circular stroke width', () => {
  it('should increase stroke width as element width inceases', () => {
    const smallElementStroke = createDynamicThickness(20);
    const mediumElementStroke = createDynamicThickness(40);
    const largeElementStroke = createDynamicThickness(60);
    const isDecreasing =
      smallElementStroke < mediumElementStroke && mediumElementStroke < largeElementStroke;

    expect(isDecreasing).toBeTruthy();
  });

  it('should increase exponentially', () => {
    const smallElementStroke = createDynamicThickness(20);
    const mediumElementStroke = createDynamicThickness(40);
    const largeElementStroke = createDynamicThickness(60);
    const isExponential =
      largeElementStroke - mediumElementStroke > mediumElementStroke - smallElementStroke;

    expect(isExponential).toBeTruthy();
  });

  it('should default to a maximum stroke width of 30 when scaling reaches its threshold', () => {
    const extraLargeElementStroke = Math.round(createDynamicThickness(9999));

    expect(extraLargeElementStroke).toBe(30);
  });
});
