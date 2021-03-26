import { isKeyClick } from '../../helpers/reactKeyHandler';

function queryIsValidInteraction(event: React.MouseEvent | React.KeyboardEvent) {
  return event.type === 'click' || isKeyClick(event as React.KeyboardEvent);
}

export default queryIsValidInteraction;
