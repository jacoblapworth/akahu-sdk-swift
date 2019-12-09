import React, { PureComponent } from 'react';
import { XUIOverviewBlock, XUIOverviewSection } from '../../../overviewblock';

export default class Summary extends PureComponent {
  render() {
    const { ...other } = this.props;

    return (
      <XUIOverviewBlock className="xui-panel" hasBackground={false} {...other}>
        {['One', 'Two', 'Three'].map(item => (
          <XUIOverviewSection key={item} label={`Summary ${item.toLowerCase()}`} value={item} />
        ))}
      </XUIOverviewBlock>
    );
  }
}
