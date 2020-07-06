import React, { PureComponent } from 'react';
import { XUIContentBlock, XUIContentBlockItem } from '../../../contentblock';
import { XUIPanel, XUIPanelSection } from '../../../panel';
import XUIButton, { XUIIconButton } from '../../../button';
import XUIDropdown, { XUIDropdownToggled } from '../../../dropdown';
import XUIPicklist, { XUIPickitem } from '../../../picklist';
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '../../../table';
import overflow from '@xero/xui-icon/icons/overflow';

export default class ContentBlock extends PureComponent {
  data = {
    abc123: {
      fruit: 'Banana',
      color: 'Yellow',
      price: 2.99,
      one: 'longer comment goes in here, thanks',
      two: 'longer comment goes in here, thanks',
      three: 'longer comment goes in here, thanks',
      four: 'longer comment goes in here, thanks',
      five: 'longer comment goes in here, thanks',
      six: 'longer comment goes in here, thanks',
    },
  };

  render() {
    const { showMediumDownButton, dropdownOptions = [], onSelectItem } = this.props;

    const MediumDownButton = (
      <XUIButton
        className="xui-u-hidden-medium-up"
        hasCaret
        size="small"
        variant="borderless-standard"
      >
        Filter
      </XUIButton>
    );

    const dropdown = (
      <XUIDropdown>
        <XUIPicklist>
          {dropdownOptions.map(item => (
            <XUIPickitem id={item} key={item} onSelect={onSelectItem.bind(this, item)}>
              Navigation item {item}
            </XUIPickitem>
          ))}
        </XUIPicklist>
      </XUIDropdown>
    );

    const toggledDropdown = showMediumDownButton ? (
      <XUIDropdownToggled dropdown={dropdown} trigger={MediumDownButton} />
    ) : null;

    return (
      <XUIPanel>
        <XUIPanelSection className="xui-padding-bottom">
          <XUIContentBlock className="xui-panel">
            <XUIContentBlockItem action={toggledDropdown} primaryHeading="Heading" />
            {[1, 2, 3].map(item => (
              <XUIContentBlockItem
                key={item}
                overflow={<XUIIconButton ariaLabel="Overflow menu" icon={overflow} />}
                primaryHeading="Title"
                secondaryHeading="Subtitle"
              />
            ))}
            <XUIContentBlockItem
              description="Description &middot; Description &middot; Description"
              overflow={<XUIIconButton ariaLabel="Overflow menu" icon={overflow} />}
              primaryHeading="Title"
              secondaryHeading="Subtitle"
            />
          </XUIContentBlock>
        </XUIPanelSection>
        <XUIPanelSection className="xui-padding-top">
          <Table data={this.data}>
            <Column body={({ fruit }) => <Cell>{fruit}</Cell>} head={<Cell>Fruit</Cell>} />
            <Column body={({ color }) => <Cell>{color}</Cell>} head={<Cell>Color</Cell>} />
            <Column
              body={({ price }) => <Cell>{`$${price}`}</Cell>}
              head={<Cell>Price / kg</Cell>}
            />
            <Column body={({ one }) => <Cell>{`${one}`}</Cell>} head={<Cell>One</Cell>} />
            <Column body={({ two }) => <Cell>{`${two}`}</Cell>} head={<Cell>Two</Cell>} />
            <Column body={({ three }) => <Cell>{`${three}`}</Cell>} head={<Cell>Three</Cell>} />
            <Column body={({ four }) => <Cell>{`${four}`}</Cell>} head={<Cell>Four</Cell>} />
            <Column body={({ five }) => <Cell>{`${five}`}</Cell>} head={<Cell>Five</Cell>} />
            <Column body={({ six }) => <Cell>{`${six}`}</Cell>} head={<Cell>Six</Cell>} />
          </Table>
        </XUIPanelSection>
      </XUIPanel>
    );
  }
}
