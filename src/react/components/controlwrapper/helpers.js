import uuidv4 from 'uuid/v4';

/**
 * @public
 * Build the label and message ids from a user-provided value, or from scratch
 * This should first be triggered by the generation of ariaAttributes from the control
 * component, and then passed a final labelId.
 * @param {string} labelId - Optional, consumer-provided string to use as the label ID
 * @returns {{label: string, message: string}}
 */
export default function generateIds(labelId) {
	const generatedLabelId = labelId || uuidv4();
	const messageId = generatedLabelId && `${generatedLabelId}-message`;
	const controlId = generatedLabelId && `${generatedLabelId}-control`;
	return {
		label: generatedLabelId,
		control: controlId,
		message: messageId,
	};
}
