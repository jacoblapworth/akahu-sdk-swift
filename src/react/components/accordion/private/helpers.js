import verge from 'verge';
import { calcSpaceRight, calcSpaceLeft } from '../../positioning/private/dom-helpers';

const getSpacesHorizontal = rect => ({
  spaceLeft: calcSpaceLeft(rect),
  spaceRight: calcSpaceRight(rect),
});

export const getRectangle = rect => verge.rectangle(rect);

const hasEnoughSpaceHorizontal = ({ spaceLeft, spaceRight }) => {
  const MARGIN_POP = 8;
  const TOLERANCE = 1;
  const WIN_SCROLL_BAR = 17;

  return spaceLeft > MARGIN_POP + TOLERANCE && spaceRight > MARGIN_POP + TOLERANCE + WIN_SCROLL_BAR;
};

export const shouldAccordionPop = element => {
  const rect = getRectangle(element);
  const spaceAround = getSpacesHorizontal(rect);
  return hasEnoughSpaceHorizontal(spaceAround);
};
