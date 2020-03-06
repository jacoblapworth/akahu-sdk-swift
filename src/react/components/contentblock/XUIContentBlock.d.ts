import React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
  qaHook?: string;
}

export default class XUIContentBlock extends React.PureComponent<Props> {}
