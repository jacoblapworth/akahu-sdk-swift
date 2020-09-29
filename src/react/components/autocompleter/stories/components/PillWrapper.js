import React, { PureComponent } from 'react';

import XUIPill from '../../../pill/XUIPill';
import peopleDataSet from '../../private/people';

class PillWrapper extends PureComponent {
  deleteSelf = e => {
    this.props.onDeleteClick(this.props.id);
  };

  render() {
    const { id } = this.props;
    return (
      <XUIPill
        className="xui-autocompleter--pill"
        deleteButtonLabel="Delete"
        key={id}
        onDeleteClick={this.deleteSelf}
        value={peopleDataSet[id].name}
      />
    );
  }
}

export default PillWrapper;
