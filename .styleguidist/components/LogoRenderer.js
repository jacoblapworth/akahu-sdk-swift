import React from 'react';
import Styled from 'rsg-components/Styled';

const styles = () => ({
  logo: {
    display: 'inline-block',
  },
});

export const LogoRenderer = ({ classes, children }) => {
  return <h1 className={classes.logo}>{children}</h1>;
};

export default Styled(styles)(LogoRenderer);
