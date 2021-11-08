/* eslint-disable no-console */
import { nanoid } from 'nanoid';

import generateIds from '../ariaHelpers';

jest.mock('nanoid');
const fauxNanoId = 'fauxNano';
nanoid.mockImplementation(() => fauxNanoId);

describe('ariaHelpers > ', () => {
  describe('generateIds', () => {
    it('generates the expected IDs when no arguments are passed', () => {
      const defaultValues = generateIds();
      expect(defaultValues).toMatchObject({
        label: `xui-${fauxNanoId}`,
        control: `xui-${fauxNanoId}-control`,
        message: `xui-${fauxNanoId}-message`,
      });
    });
    it('generates the expected IDs when a labelId is passed', () => {
      const labelCenteredIDs = generateIds({ labelId: 'userLabelId' });
      expect(labelCenteredIDs).toMatchObject({
        label: 'userLabelId',
        control: 'userLabelId-control',
        message: 'userLabelId-message',
      });
    });
    it('generates the expected IDs when a control ID is passed', () => {
      const controlCenteredIDs = generateIds({ id: 'userControlId' });
      expect(controlCenteredIDs).toMatchObject({
        label: 'userControlId-label',
        control: 'userControlId',
        message: 'userControlId-message',
      });
    });
    it('generates the expected IDs when control and label IDs are passed', () => {
      const bothIDs = generateIds({ labelId: 'userLabelId', id: 'userControlId' });
      expect(bothIDs).toMatchObject({
        label: 'userLabelId',
        control: 'userControlId',
        message: 'userControlId-message',
      });
    });
  });
  describe('getAriaAttributes', () => {
    // TODO: Add some tests for this. XUI-2609
  });
  describe('getAriaAttributesInline', () => {
    // TODO: Add some tests for this. XUI-2609
  });
});
