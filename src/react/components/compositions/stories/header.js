import React, { PureComponent } from 'react';
import { XUIActions } from '../../../actions';
import { XUIPageHeader } from '../../../pageheader';
import Picklist, { Pickitem } from '../../../picklist';
import XUIButton, { XUISplitButtonGroup, XUISecondaryButton } from '../../../button';

export default class CustomHeader extends PureComponent {
  state = {
    selectedTab: 1,
  };

  onTabClick = a => {
    this.setState({
      selectedTab: a,
    });
  };

  render() {
    const { title } = this.props;
    const { selectedTab } = this.state;
    const builtTabs = (
      <Picklist>
        {[0, 1].map(item => (
          <Pickitem
            ariaRole="menuitem"
            id={`number_${item}`}
            isSelected={selectedTab === item}
            key={`number_${item}`}
            onClick={this.onTabClick.bind(this, item)}
          >
            Tab
          </Pickitem>
        ))}
      </Picklist>
    );

    return (
      <XUIPageHeader
        actions={
          <XUIActions
            secondaryAction={
              <XUISplitButtonGroup isDisabled={false} size="small" variant="create">
                <XUIButton>New thing</XUIButton>
                <XUISecondaryButton aria-label="More options" />
              </XUISplitButtonGroup>
            }
          />
        }
        tabs={builtTabs}
        title={title || 'Title'}
      />
    );
  }
}
