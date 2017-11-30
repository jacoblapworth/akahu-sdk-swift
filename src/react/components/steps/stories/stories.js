// Libs
import React from 'react';

// Components we need to test with
import XUISteps from '../XUISteps';

// Story book things
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

const storiesWithKnobs = storiesOf('Instances', module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
// storiesWithKnobs.add('XUIStep', () => (
// 	<XUISteps />
// ));

const tabs = new Array(6).fill(0).map((_, i) => ({name: `Link ${i + 1}`, href: '#', isActive: !i}));

storiesWithKnobs.add('XUIStep', withInfo('Xxxxx xxxx xxxx xxxx')(() => (
   <XUISteps tabs={tabs} />
)));
