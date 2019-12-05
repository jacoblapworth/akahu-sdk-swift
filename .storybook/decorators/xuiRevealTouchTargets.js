import React from 'react';

export default function(storyFn) {
  return <div className="xui-decorator-revealTouchTargets">{storyFn()}</div>;
}
