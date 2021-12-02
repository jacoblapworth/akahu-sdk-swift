import React, { PureComponent } from 'react';

import addition from '@xero/xui-icon/icons/addition';
import subtraction from '@xero/xui-icon/icons/subtraction';
import expand from '@xero/xui-icon/icons/expand';
import rotateClockwise from '@xero/xui-icon/icons/rotate-clockwise';
import rotateAnticlockwise from '@xero/xui-icon/icons/rotate-anticlockwise';
import overflow from '@xero/xui-icon/icons/overflow';

import useContainerQuery from '../../../helpers/useContainerQuery';
import XUIFilePreviewFooter from '../../XUIFilePreviewFooter';
import { XUIIconButton } from '../../../../button';
import XUIIcon from '../../../../icon';
import XUIPagination from '../../../../pagination';
import { XUIDropdown, XUIDropdownToggled } from '../../../../dropdown';
import { XUIPicklist, XUIPickitem } from '../../../../picklist';
import {
  defaultCreateCountContent,
  defaultCreatePagingContent,
  defaultPerPageContent,
} from '../../../pagination/private/helpers';

const defaultPaginationProps = {
  ariaLabel: 'Pagination',
  createCountContent: defaultCreateCountContent,
  createPagingContent: defaultCreatePagingContent,
  nextPageLabel: 'Next Page',
  pageSelectLabel: 'Select a page',
  perPageContent: defaultPerPageContent,
  perPageCountSelectLabel: 'Select a per page count',
  previousPageLabel: 'Previous Page',
};

const ExampleFooter = () => {
  const { isWidthAboveBreakpoint, observedElementRef } = useContainerQuery({
    fitsEntireControlBar: 450,
  });

  return (
    <XUIFilePreviewFooter ref={observedElementRef}>
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
      <XUIPagination
        count={3}
        perPageCount={1}
        perPageCountOptions={[1]}
        showCount={false}
        showPerPageCountSelect={false}
        {...defaultPaginationProps}
      />
      {!isWidthAboveBreakpoint('fitsEntireControlBar') && (
        <XUIDropdownToggled
          dropdown={
            <XUIDropdown>
              <XUIPicklist>
                <XUIPickitem id="cc" key="cc" value="cc">
                  <XUIIcon icon={expand} isBoxed /> Fit to page
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

export default ExampleFooter;
