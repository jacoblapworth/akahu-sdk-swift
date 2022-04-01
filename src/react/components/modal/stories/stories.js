import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import XUIActions from '../../actions/XUIActions';
import XUIButton from '../../button/XUIButton';
import XUIDateInput from '../../dateinput/XUIDateInput';
import XUITextInput from '../../textinput/XUITextInput';
import { modalSizes } from '../constants';
import XUIModal from '../XUIModal';
import XUIModalBody from '../XUIModalBody';
import XUIModalFooter from '../XUIModalFooter';
import XUIModalHeader from '../XUIModalHeader';
import { storiesWithKnobsKindName, storiesWithVariationsKindName, variations } from './variations';

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);

storiesWithKnobs.add('Playground', () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const headerEnabled = boolean('Has header', true);
  const header = headerEnabled ? <XUIModalHeader>New project</XUIModalHeader> : null;

  const footerEnabled = boolean('Has footer', true);
  const footer = footerEnabled ? (
    <XUIModalFooter>
      <XUIActions
        primaryAction={<XUIButton variant="main">Create project</XUIButton>}
        secondaryAction={<XUIButton onClick={handleClose}>Cancel</XUIButton>}
      />
    </XUIModalFooter>
  ) : null;

  return (
    <>
      <XUIButton onClick={handleOpen}>Open modal</XUIButton>
      <XUIModal
        ariaDescribedBy={text('ariaDescribedBy', undefined)}
        ariaLabelledBy={text('ariaLabeledBy', undefined)}
        closeButtonLabel="Close"
        hasDefaultLayout={boolean('hasDefaultLayout', true)}
        hideOnEsc={boolean('hideOnEsc', true)}
        hideOnOverlayClick={boolean('hideOnOverlayClick', false)}
        isForm
        isOpen={boolean('isOpen', true) && isOpen}
        isUsingPortal={boolean('isUsingPortal', true)}
        onClose={handleClose}
        size={select('Size', Object.keys(modalSizes), 'medium')}
      >
        {header}
        <XUIModalBody>
          <XUITextInput isFieldLayout label="Contact" placeholder="Find or create a contact" />
          <XUITextInput isFieldLayout label="Project name" />
          <XUIDateInput isFieldLayout label="Deadline" placeholder="Select date" />
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
