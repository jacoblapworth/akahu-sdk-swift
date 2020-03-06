import React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * Id for the modal header. Used for automatically providing a label to the modal.
   */
  id?: string;
  qaHook?: string;
}

declare const XUIModalHeader: React.FunctionComponent<Props>;
export default XUIModalHeader;
