/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
import * as React from 'react';

import XUITable from '../XUITable';
import XUITableCell from '../XUITableCell';
import XUITableColumn from '../XUITableColumn';

const XUITableWithData = React.forwardRef<
  XUITable,
  Omit<React.ComponentProps<typeof XUITable>, 'caption' | 'children' | 'data'> & {
    customBodyProps?: Array<React.ComponentProps<typeof XUITableColumn>['body']>;
    customHeadProps?: Array<React.ComponentProps<typeof XUITableColumn>['head']>;
    data?: React.ComponentProps<typeof XUITable>['data'];
    inlineAlignment?: 'end' | 'start';
  }
>(({ customBodyProps = [], customHeadProps = [], inlineAlignment, ...props }, ref) => (
  <XUITable
    caption="List of fruits with color and price per kg"
    data={{
      row1: { fruit: 'Apple', color: 'Red', price: 2.99 },
    }}
    ref={ref}
    {...props}
  >
    <XUITableColumn
      body={
        customBodyProps.hasOwnProperty(0)
          ? customBodyProps[0]
          : ({ fruit }) => <XUITableCell>{fruit}</XUITableCell>
      }
      head={
        customHeadProps.hasOwnProperty(0) ? customHeadProps[0] : <XUITableCell>Fruit</XUITableCell>
      }
      inlineAlignment={inlineAlignment}
    />

    <XUITableColumn
      body={
        customBodyProps.hasOwnProperty(1)
          ? customBodyProps[1]
          : ({ color }) => <XUITableCell>{color}</XUITableCell>
      }
      head={
        customHeadProps.hasOwnProperty(1) ? customHeadProps[1] : <XUITableCell>Color</XUITableCell>
      }
    />

    <XUITableColumn
      body={
        customBodyProps.hasOwnProperty(2)
          ? customBodyProps[2]
          : ({ price }) => <XUITableCell>{`$${price}`}</XUITableCell>
      }
      head={
        customHeadProps.hasOwnProperty(2) ? (
          customHeadProps[2]
        ) : (
          <XUITableCell>Price / kg</XUITableCell>
        )
      }
    />
  </XUITable>
));

export default XUITableWithData;
