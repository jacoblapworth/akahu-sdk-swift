// Libs
import React, { Fragment } from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';

// Components we need to test with
import XUIModal from '../XUIModal';
import XUIModalBody from '../XUIModalBody';
import XUIModalFooter from '../XUIModalFooter';
import XUIModalHeader from '../XUIModalHeader';
import XUITextInput from '../../textinput/XUITextInput';
import XUIButton from '../../button/XUIButton';
import { modalSizes } from '../constants';

import { storiesWithKnobsKindName, storiesWithVariationsKindName, variations } from './variations';

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);

storiesWithKnobs.add('Playground', () => {
  const headerEnabled = boolean('Show Header', true);
  const header = headerEnabled ? <XUIModalHeader>Header</XUIModalHeader> : null;

  const footerEnabled = boolean('Show Footer', true);
  const footer = footerEnabled ? <XUIModalFooter>Footer!</XUIModalFooter> : null;

  return (
    <>
      <XUITextInput />
      <XUIButton>Test button</XUIButton>
      <XUIModal
        closeButtonLabel="Close"
        isForm={boolean('Main content is a form', false)}
        isOpen={boolean('Is open', true)}
        isUsingPortal={boolean('Uses portal', true)}
        size={select('Size', Object.keys(modalSizes))}
      >
        {header}
        <XUIModalBody>
          Plain modal
          <XUITextInput />
          <XUIButton>Test button</XUIButton>
        </XUIModalBody>
        {footer}
      </XUIModal>
    </>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;

    const header = variationMinusStoryDetails.header ? (
      <XUIModalHeader>Header</XUIModalHeader>
    ) : null;

    const footer = variationMinusStoryDetails.footer ? (
      <XUIModalFooter>Footer!</XUIModalFooter>
    ) : null;

    return (
      <XUIModal closeButtonLabel="Close" isOpen {...variationMinusStoryDetails}>
        {header}
        <XUIModalBody>This is some Modal content.</XUIModalBody>
        {footer}
      </XUIModal>
    );
  });
});
