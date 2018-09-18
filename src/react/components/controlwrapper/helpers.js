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
	const generatedlabelId = labelId || uuidv4();
	const messageId = generatedlabelId && `${generatedlabelId}-message`;
	return {
		label: generatedlabelId,
		message: messageId,
	};
}
