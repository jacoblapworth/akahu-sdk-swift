import React, { useRef, useEffect } from 'react';
import ExampleNav from './ExampleNav';

const FullPageStoryWrapper = ({ children, hasNav, navProps }) => {
  const node = useRef();

  useEffect(() => {
    // Add classes to simulate SPA boilerplate.
    document.body.classList.add('xui-body', 'xs-body');
    document.body.parentElement.classList.add('xui-html');

    // Clear default decorator and default storybook styles
    document.body.parentElement.style = {};
    document.body.style = {};
    const outerWrapper = node?.current?.parentElement?.parentElement;
    outerWrapper.style = {};
    const wrapper = node?.current?.parentElement;
    wrapper.style = {};
  });

  return (
    <>
      {hasNav && <ExampleNav {...navProps} />}
      <div className="xs-app-root" ref={node}>
        {children}
      </div>
    </>
  );
};

export default FullPageStoryWrapper;
