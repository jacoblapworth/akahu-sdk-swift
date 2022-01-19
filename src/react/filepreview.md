<div class="xui-margin-vertical">
	<a href="../section-components-displayingdata-filepreview.html" isDocLink>File Preview in the XUI documentation</a>
</div>

XUIFilePreview will fill its wrapping container with a header, footer, and body area to display a file preview. XUIFilePreviewHeader has an API very similar to XUIIsolationHeader, and XUIFilePreviewFooter can be populated with the recommended preview controls. We've shown a responsive toolbar that stows some preview control buttons (aligned to the left) behind an overflow menu at narrow widths, alongside a pagination component (aligned to the right).

Pagination contols should be provided through the `pagination` prop. This enables pagination components to always be aligned to the right, which enables consistency while navigating between different file types (which may have different controls).

## Examples

```jsx harmony
import { Fragment, useState } from 'react';
import {
  XUIFilePreview,
  XUIFilePreviewHeader,
  XUIFilePreviewFooter
} from '@xero/xui/react/filepreview';
import XUIButton, { XUIIconButton } from '@xero/xui/react/button';
import XUIIcon from '@xero/xui/react/icon';
import useContainerQuery from '@xero/xui/react/helpers/useContainerQuery';
import XUIPagination from '@xero/xui/react/pagination';
import { XUIDropdown, XUIDropdownToggled } from '@xero/xui/react/dropdown';
import { XUIPicklist, XUIPickitem } from '@xero/xui/react/picklist';

import addition from '@xero/xui-icon/icons/addition';
import subtraction from '@xero/xui-icon/icons/subtraction';
import expand from '@xero/xui-icon/icons/expand';
import rotateClockwise from '@xero/xui-icon/icons/rotate-clockwise';
import rotateAnticlockwise from '@xero/xui-icon/icons/rotate-anticlockwise';
import overflow from '@xero/xui-icon/icons/overflow';
import cross from '@xero/xui-icon/icons/cross';
import importIcon from '@xero/xui-icon/icons/import';

import { defaultCreatePagingContent } from './components/pagination/private/helpers';

const ExampleFooter = () => {
  const { isWidthAboveBreakpoint, observedElementRef } = useContainerQuery({
    fitsEntireControlBar: 450
  });

  const pagination = (
    <XUIPagination
      count={3}
      perPageCount={1}
      perPageCountOptions={[1]}
      showCount={false}
      showPerPageCountSelect={false}
      ariaLabel="Pagination"
      createPagingContent={(page, pageCount) => ({
        enhanced: `Page ${page} of ${pageCount}`,
        simple: `${page} of ${pageCount}`
      })}
      nextPageLabel="Next Page"
      pageSelectLabel="Select a page"
      perPageCountSelectLabel="Select a per page count"
      previousPageLabel="Previous Page"
    />
  );

  return (
    <XUIFilePreviewFooter pagination={pagination} ref={observedElementRef}>
      {isWidthAboveBreakpoint('fitsEntireControlBar') && (
        <XUIIconButton ariaLabel="Expand" icon={expand} onClick={() => {}} />
      )}
      <XUIIconButton ariaLabel="Zoom out" icon={subtraction} onClick={() => {}} />
      <XUIIconButton ariaLabel="Zoom in" icon={addition} onClick={() => {}} />
      {isWidthAboveBreakpoint('fitsEntireControlBar') && (
        <>
          <XUIIconButton
            ariaLabel="Rotate clockwise"
            icon={rotateAnticlockwise}
            onClick={() => {}}
          />
          <XUIIconButton
            ariaLabel="Rotate anti-clockwise"
            icon={rotateClockwise}
            onClick={() => {}}
          />
        </>
      )}
      {!isWidthAboveBreakpoint('fitsEntireControlBar') && (
        <XUIDropdownToggled
          dropdown={
            <XUIDropdown>
              <XUIPicklist>
                <XUIPickitem id="cc" key="cc" value="cc">
                  <XUIIcon icon={expand} isBoxed /> Fit to window
                </XUIPickitem>
                <XUIPickitem id="aa" key="aa" value="aa">
                  <XUIIcon icon={rotateAnticlockwise} isBoxed /> Rotate anti-clockwise
                </XUIPickitem>
                <XUIPickitem id="bb" key="bb" value="bb">
                  <XUIIcon icon={rotateClockwise} isBoxed /> Rotate clockwise
                </XUIPickitem>
              </XUIPicklist>
            </XUIDropdown>
          }
          trigger={<XUIIconButton ariaLabel="More options" icon={overflow} onClick={() => {}} />}
        />
      )}
    </XUIFilePreviewFooter>
  );
};

const downloadAction = (
  <XUIButton size="small" variant="borderless-main" className="xui-text-truncated">
    <XUIIcon className="xui-margin-right-xsmall" icon={importIcon} />
    Download
  </XUIButton>
);
const header = (
  <XUIFilePreviewHeader
    actions={downloadAction}
    navigationButton={<XUIIconButton ariaLabel="close" icon={cross} onClick={() => {}} />}
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

const Example = () => {
  return (
    <div style={wrapperStyles}>
      <XUIFilePreview footer={<ExampleFooter />} header={header}>
        <img
          alt="A casual meeting across a conference table"
          src="https://edge.xero.com/illustration/casual-meeting-01/casual-meeting-01.svg"
          style={imageStyles}
        />
      </XUIFilePreview>
    </div>
  );
};
<Example />;
```
