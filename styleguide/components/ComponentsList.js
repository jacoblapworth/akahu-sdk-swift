/* eslint quote-props: ["error", "as-needed"] */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'rsg-components/Link'; // eslint-disable-line import/no-unresolved
import Styled from 'rsg-components/Styled'; // eslint-disable-line import/no-unresolved

const styles = ({ color, fontFamily, fontSize, space }) => ({
	list: {
		margin: 0,
		'& :last-child': {
			borderBottom: 'none'
		}
	},
	item: {
		color: color.base,
		display: 'block',
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		listStyle: 'none',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		borderBottom: '1px solid #d6dade',
	},
	heading: {
		color: color.base,
		marginTop: space[1],
		'&:last-child': {
			isolate: false,
			borderBottom: 'none'
		}
	},
});

export function ComponentsListRenderer({ classes, items }) {
	items = items.filter(item => item.name);

	if (!items.length) {
		return null;
	}

	return (
		<ul className={classes.list}>
			{items.map(({ heading, name, slug, content }) => heading ?
				<li
					className={cx(classes.item)}
					key={name}
				>
					<Link className={cx(heading && classes.heading)} href={`#${slug}`}>
						{name}
					</Link>
					{content}
				</li>
				: null
			)}
		</ul>
	);
}

ComponentsListRenderer.propTypes = {
	items: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(ComponentsListRenderer);
