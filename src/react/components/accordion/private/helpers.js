import verge from 'verge';

const calcSpaceRight = rect => Math.max(verge.viewportW() - rect.right, 0);
const calcSpaceLeft = rect => Math.max(rect.left, 0);

const getSpacesHorizontal = rect => ({
	spaceLeft: calcSpaceLeft(rect),
	spaceRight: calcSpaceRight(rect),
});

const hasEnoughSpaceHorizontal = ({ spaceLeft, spaceRight }) => {
	const MARGIN_POP = 8;
	const TOLERANCE = 1;
	const WIN_SCROLL_BAR = 17;

	return (
		spaceLeft > MARGIN_POP + TOLERANCE && spaceRight > MARGIN_POP + TOLERANCE + WIN_SCROLL_BAR
	);
};

export const shouldAccordionPop = rect => hasEnoughSpaceHorizontal(getSpacesHorizontal(rect));
export const getRectangle = rect => verge.rectangle(rect);
