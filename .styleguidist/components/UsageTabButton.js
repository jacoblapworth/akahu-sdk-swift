import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import TabButton from 'rsg-components/TabButton';
import isEmpty from 'lodash/isEmpty';

export const styles = ({
  borderRadius,
  buttonPadding,
  buttonFocusDropShadow,
  buttonTextTransform,
  color,
  fontFamily,
  fontSize,
  space,
}) => ({
  button: {
    backgroundColor: color.button,
    border: 'none',
    borderRadius,
    color: color.baseBackground,
    cursor: 'pointer',
    fontFamily: fontFamily.base,
    fontSize: fontSize.small,
    fontWeight: 'bold',
    lineHeight: '20px',
    marginBottom: space[1],
    padding: buttonPadding,
    textTransform: buttonTextTransform,
    '&:hover, &:focus': {
      isolate: false,
      outline: 0,
    },
    '&:hover': {
      backgroundColor: color.buttonHover,
      isolate: false,
    },
    '&:focus': {
      boxShadow: buttonFocusDropShadow,
      isolate: false,
    },
    '&:focus:not($isActive)': {
      isolate: false,
    },
    '& + &': {
      isolate: false,
      marginLeft: space[1],
    },
  },
  isActive: {
    backgroundColor: color.buttonActive,
  },
});

const UsageTabButton = props => {
  const component = props.props;
  const showButton = !isEmpty(component.props) || !isEmpty(component.methods);
  return showButton ? <TabButton {...props}>View props and methods</TabButton> : null;
};

UsageTabButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  props: PropTypes.shape({
    props: PropTypes.array,
    methods: PropTypes.array,
  }).isRequired,
  active: PropTypes.bool,
};

export default Styled(styles)(UsageTabButton);
