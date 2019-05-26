import React, { PureComponent } from 'react';
import {
  XUIContentBlock,
  XUIContentBlockItem,
  XUIPanel,
  XUIPanelSection,
} from '../../../structural';
import XUIButton, { XUIButtonCaret } from '../../../button';
import Dropdown, { DropDownToggled } from '../../../dropdown';
import Picklist, { Pickitem } from '../../../picklist';
import XUIIcon from '../../../icon';
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
      <XUIButton className="xui-u-hidden-medium-up" variant="borderless-standard" size="small">
        Filter <XUIButtonCaret />
      </XUIButton>
    );

    const dropdown = (
      <Dropdown>
        <Picklist>
          {dropdownOptions.map(item => (
            <Pickitem id={item} key={item} onSelect={onSelectItem.bind(this, item)}>
              Navigation item {item}
            </Pickitem>
          ))}
        </Picklist>
      </Dropdown>
    );

    const toggledDropdown = showMediumDownButton ? (
      <DropDownToggled trigger={MediumDownButton} dropdown={dropdown} />
    ) : null;

    return (
      <XUIPanel>
        <XUIPanelSection className="xui-padding-bottom">
          <XUIContentBlock className="xui-panel">
            <XUIContentBlockItem primaryHeading="Heading" action={toggledDropdown} />
            {[1, 2, 3].map(item => (
              <XUIContentBlockItem
                key={item}
                primaryHeading="Title"
                secondaryHeading="Subtitle"
                overflow={
                  <XUIButton variant="icon" aria-label="Overflow menu">
                    <XUIIcon icon={overflow} />
                  </XUIButton>
                }
              />
            ))}
            <XUIContentBlockItem
              primaryHeading="Title"
              secondaryHeading="Subtitle"
              description="Description &middot; Description &middot; Description"
              overflow={
                <XUIButton variant="icon" aria-label="Overflow menu">
                  <XUIIcon icon={overflow} />
                </XUIButton>
              }
            />
          </XUIContentBlock>
        </XUIPanelSection>
        <XUIPanelSection className="xui-padding-top">
          <Table data={this.data}>
            <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />
            <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />
            <Column
              head={<Cell>Price / kg</Cell>}
              body={({ price }) => <Cell>{`$${price}`}</Cell>}
            />
            <Column head={<Cell>One</Cell>} body={({ one }) => <Cell>{`${one}`}</Cell>} />
            <Column head={<Cell>Two</Cell>} body={({ two }) => <Cell>{`${two}`}</Cell>} />
            <Column head={<Cell>Three</Cell>} body={({ three }) => <Cell>{`${three}`}</Cell>} />
            <Column head={<Cell>Four</Cell>} body={({ four }) => <Cell>{`${four}`}</Cell>} />
            <Column head={<Cell>Five</Cell>} body={({ five }) => <Cell>{`${five}`}</Cell>} />
            <Column head={<Cell>Six</Cell>} body={({ six }) => <Cell>{`${six}`}</Cell>} />
          </Table>
        </XUIPanelSection>
      </XUIPanel>
    );
  }
}
