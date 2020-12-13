import React from 'react';

const outerStyle = {
  alignItems: 'center',
  bottom: 0,
  display: 'flex',
  left: 0,
  overflow: 'auto',
  position: 'fixed',
  right: 0,
  top: 0,
};
const innerStyle = {
  margin: 'auto',
  padding: 5, // To match existing reference images
};

export default function (Story) {
  return (
    <div style={outerStyle}>
      <div className="xui-default-decorator" style={innerStyle}>
        <Story />
      </div>
    </div>
  );
}
