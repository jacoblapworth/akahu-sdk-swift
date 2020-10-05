import React from 'react';

export default function (storyFn) {
  return (
    <div className="xui-custom-decorator-outer">
      <div className="xui-custom-decorator-inner">{storyFn()}</div>
    </div>
  );
}
