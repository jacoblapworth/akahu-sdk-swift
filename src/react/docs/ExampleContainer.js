import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types'

import '../../../.kss/scss/example.scss';

export default function ExampleContainer(props) {
    const classnames = cn({
        'ds-example-dark': props.isInverted,
        },
        props.className
    );
    return (
        <div className={classnames} style={props.style}>
			{props.children}
        </div>
    );
}

ExampleContainer.propTypes = {
    children: PropTypes.node,
    isInverted: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
};

ExampleContainer.defaultProps = {

};

