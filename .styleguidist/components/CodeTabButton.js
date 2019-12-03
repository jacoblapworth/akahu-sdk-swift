import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import TabButton from 'rsg-components/TabButton';

export const styles = ({ space, color, fontFamily, fontSize, buttonTextTransform }) => ({
  button: {
    background: 'transparent',
    border: 'none',
    color: color.link,
    cursor: 'pointer',
    fontFamily: fontFamily.base,
    fontSize: fontSize.base,
    padding: [[space[1], 0]],
    textDecoration: 'underline',
    textTransform: buttonTextTransform,
    '&:hover, &:focus': {
      color: color.linkHover,
      isolate: false,
      outline: 0,
    },
    '&:focus:not($isActive)': {
      isolate: false,
      outline: [[1, 'dotted', color.lightest]],
    },
    '& + &': {
      isolate: false,
      marginLeft: space[1],
    },
  },
  isActive: {
    borderBottom: [[2, color.linkActive, 'solid']],
  },
});

const CodeTabButton = props => <TabButton {...props}>View code</TabButton>;

CodeTabButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default Styled(styles)(CodeTabButton);
