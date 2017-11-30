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

storiesWithKnobs.add('XUIStep', withInfo('Xxxxx xxxx xxxx xxxx')(() => (
   <XUISteps />
)));

// // Libs
// import React from 'react';
//
// // Components we need to test with
// import XUISteps from '../XUISteps';
//
// // Story book things
// import { action } from '@storybook/addon-actions';
// import { storiesOf } from '@storybook/react';
// import { withInfo } from '@storybook/addon-info';
// import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
// import centered from '@storybook/addon-centered';
//
// const stories = storiesOf('Instances', module);
// stories.addDecorator(centered);
// stories.addDecorator(withKnobs);
//
// stories.add('XUISteps', withInfo('Xxxxx xxxx xxxx xxxx')(() => (
//    <XUISteps />
// )));
