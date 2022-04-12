<div class="xui-margin-vertical">
	<a href="../section-components-displayingdata-filepreview.html" isDocLink>File Preview in the XUI documentation</a>
</div>

XUIFilePreview will fill its wrapping container with a header, footer, and body area to display a file preview. XUIFilePreviewHeader has an API very similar to XUIIsolationHeader, and XUIFilePreviewFooter can be populated with the recommended preview controls. We've shown a responsive toolbar that stows some preview control buttons (aligned to the left) behind an overflow menu at narrow widths, alongside a pagination component (aligned to the right).

Pagination contols should be provided through the `pagination` prop. This enables pagination components to always be aligned to the right, which enables consistency while navigating between different file types (which may have different controls).

## Examples

```jsx harmony
import { useState } from 'react';
import XUIButton, { XUIIconButton } from '@xero/xui/react/button';
import { XUIDropdown, XUIDropdownToggled } from '@xero/xui/react/dropdown';
import {
  XUIFilePreview,
  XUIFilePreviewHeader,
  XUIFilePreviewFooter
} from '@xero/xui/react/filepreview';
import XUIIcon from '@xero/xui/react/icon';
import XUIPagination from '@xero/xui/react/pagination';
import { XUIPicklist, XUIPickitem } from '@xero/xui/react/picklist';
import useContainerQuery from '@xero/xui/react/helpers/useContainerQuery';

import addition from '@xero/xui-icon/icons/addition';
import cross from '@xero/xui-icon/icons/cross';
import expand from '@xero/xui-icon/icons/expand';
import importIcon from '@xero/xui-icon/icons/import';
import overflow from '@xero/xui-icon/icons/overflow';
import rotateAnticlockwise from '@xero/xui-icon/icons/rotate-anticlockwise';
import rotateClockwise from '@xero/xui-icon/icons/rotate-clockwise';
import subtraction from '@xero/xui-icon/icons/subtraction';

const FilePreviewFooter = () => {
  const { isWidthAboveBreakpoint, observedElementRef } = useContainerQuery({
    fitsEntireControlBar: 450
  });

  const pagination = (
    <XUIPagination
      ariaLabel="File navigation"
      count={3}
      createPagingContent={(page, pageCount) => ({
        enhanced: `File ${page} of ${pageCount}`,
        simple: `${page} of ${pageCount}`
      })}
      nextPageLabel="Next file"
      pageSelectLabel="Select a file"
      perPageCount={1}
      previousPageLabel="Previous file"
      showCount={false}
      showPerPageCountSelect={false}
    />
  );

  return (
    <XUIFilePreviewFooter pagination={pagination} ref={observedElementRef}>
      {isWidthAboveBreakpoint('fitsEntireControlBar') && (
        <XUIIconButton
          ariaLabel="Expand"
          icon={expand}
          onClick={() => console.log('onClick - expand')}
        />
      )}
      <XUIIconButton
        ariaLabel="Zoom out"
        icon={subtraction}
        onClick={() => console.log('onClick - zoom out')}
      />
      <XUIIconButton
        ariaLabel="Zoom in"
        icon={addition}
        onClick={() => console.log('onClick - zoom in')}
      />
      {isWidthAboveBreakpoint('fitsEntireControlBar') && (
        <>
          <XUIIconButton
            ariaLabel="Rotate anti-clockwise"
            icon={rotateAnticlockwise}
            onClick={() => console.log('onClick - rotate anti-clockwise')}
          />
          <XUIIconButton
            ariaLabel="Rotate clockwise"
            icon={rotateClockwise}
            onClick={() => console.log('onClick - rotate clockwise')}
          />
        </>
      )}
      {!isWidthAboveBreakpoint('fitsEntireControlBar') && (
        <XUIDropdownToggled
          dropdown={
            <XUIDropdown>
              <XUIPicklist>
                <XUIPickitem id="window">
                  <XUIIcon icon={expand} isBoxed /> Fit to window
                </XUIPickitem>
                <XUIPickitem id="anti-clockwise">
                  <XUIIcon icon={rotateAnticlockwise} isBoxed /> Rotate anti-clockwise
                </XUIPickitem>
                <XUIPickitem id="clockwise">
                  <XUIIcon icon={rotateClockwise} isBoxed /> Rotate clockwise
                </XUIPickitem>
              </XUIPicklist>
            </XUIDropdown>
          }
          trigger={<XUIIconButton ariaLabel="More options" icon={overflow} />}
        />
      )}
    </XUIFilePreviewFooter>
  );
};

const downloadAction = (
  <XUIButton className="xui-text-truncated" size="small" variant="borderless-main">
    <XUIIcon className="xui-margin-right-xsmall" icon={importIcon} />
    Download
  </XUIButton>
);

const header = (
  <XUIFilePreviewHeader
    actions={downloadAction}
    navigationButton={
      <XUIIconButton
        ariaLabel="close"
        icon={cross}
        onClick={() => console.log('onClick - close')}
      />
    }
    title="illustration_casual-meeting-01_casual-meeting-01.svg"
  />
);

const wrapperStyles = {
  height: '525px',
  maxWidth: '100%',
  overflow: 'hidden',
  resize: 'horizontal'
};
const imageStyles = {
  maxHeight: '100%',
  maxWidth: '100%'
};

<div style={wrapperStyles}>
  <XUIFilePreview footer={<FilePreviewFooter />} header={header}>
    <img
      alt="A casual meeting across a conference table"
      src="https://edge.xero.com/illustration/casual-meeting-01/casual-meeting-01.svg"
      style={imageStyles}
    />
  </XUIFilePreview>
</div>;
```
