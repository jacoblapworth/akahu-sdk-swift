// Libs
import React, { Component, PureComponent } from 'react';

// Story book things
import { storiesOf } from '@storybook/react';

const introPageName = 'About Storybook for XUI';
const introCategory = 'Introduction';

const stories = storiesOf(`${introCategory}/${introPageName}`, module);

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsHidden: true,
    };
  }

  toggleModalVisibility = () => {
    this.setState(prevState => ({
      modalIsHidden: !prevState.modalIsHidden,
    }));
  };

  render() {
    const { modalIsHidden } = this.state;

    return (
      <div className="xui-page-width-standard">
        <div className="xui-row-grid">
          <div className="xui-panel xui-padding xui-margin-vertical xui-column-12-of-12">
            <h1 className="xui-heading-large">About Storybook for XUI</h1>
            <p>
              Storybook is used to help us with composition and UI regression testing. We also use
              it to help us develop our components in isolation.
            </p>
            <p>
              <b>Note:</b> <i>Storybook is not used to help solve the issue with documentation</i>
            </p>
          </div>

          <div className="xui-panel xui-margin-vertical xui-column-6-of-12">
            <img
              src="//i.imgur.com/r74hXAj.jpg"
              style={{ width: '100%', height: '100px', objectFit: 'cover' }}
            />
            <div className="xui-padding">
              <h2 className="xui-heading-large">Isolated components</h2>
              <p>
                You'll find isolated components under the <b>Components</b> section, in the left
                hand nav. It's used for building components in isolation, away from everything else.
              </p>
            </div>
          </div>

          <div className="xui-panel xui-margin-vertical xui-column-6-of-12">
            <img
              src="//i.imgur.com/kg0CFnu.jpg"
              style={{ width: '100%', height: '100px', objectFit: 'cover' }}
            />
            <div className="xui-padding">
              <h2 className="xui-heading-large">Use cases</h2>
              <p>
                You'll find composed components under the <b>Use cases</b> section, in the left hand
                nav. It's used for building up stories of composed components so we can test common
                compositions and UI regressions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

stories.add(introPageName, () => {
  return <Welcome />;
});
