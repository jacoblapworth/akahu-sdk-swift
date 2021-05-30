import React, { useRef, useEffect } from 'react';

const FullPageStoryWrapper = ({ children }) => {
  const node = useRef();

  useEffect(() => {
    // Add classes to simulate SPA boilerplate.
    document.body.classList.add('xui-body', 'xs-body');
    document.getElementById('root').classList.add('xs-app-root');

    // Clear default decorator and default storybook styles
    document.body.style = {};
    const outerWrapper = node?.current?.parentElement?.parentElement;
    outerWrapper.style = {};
    const wrapper = node?.current?.parentElement;
    wrapper.style = {};
  });

  return <div ref={node}>{children}</div>;
};

export default FullPageStoryWrapper;
