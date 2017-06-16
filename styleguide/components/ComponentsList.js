import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'rsg-components/Link';
import Styled from 'rsg-components/Styled';

const styles = ({ color, fontFamily, fontSize, space, mq }) => ({
	list: {
		margin: 0
	},
	item: {
		color: color.base,
		display: 'block',
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		listStyle: 'none',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		borderBottom: '1px solid #d6dade'
	},
	isChild: {
		fontSize: fontSize.small,
		borderBottom: 'none',
		[mq.small]: {
			display: 'inline-block',
			margin: [[0, space[1], 0, 0]]
		},
	},
	heading: {
		color: color.base,
		marginTop: space[1],
		fontFamily: fontFamily.base,
		fontWeight: 'bold',
	},
});

export function ComponentsListRenderer({ classes, items }) {
	items = items.filter(item => item.name);

	if (!items.length) {
		return null;
	}

	return (
		<ul className={classes.list}>
			{items.map(({ heading, name, slug, content }) =>
				<li
					className={cx(classes.item, (!content || !content.props.items.length) && classes.isChild)}
					key={name}
				>
					<Link className={cx(heading && classes.heading)} href={`#${slug}`}>{name}</Link>
					{content}
				</li>
			)}
		</ul>
	);
}

ComponentsListRenderer.propTypes = {
	items: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(ComponentsListRenderer);
