import * as React from 'react';

interface Props {
  className?: string;
  /**
   * The banner message details to be displayed as a list.
   */
  messageDetails: React.ReactText[];
  qaHook?: string;
}

declare const XUIBannerMessageDetail: React.FunctionComponent<Props>;
export default XUIBannerMessageDetail;
