const testContainerElement = document.getElementById('test-container');
const div = testContainerElement || document.createElement('div');
if (!testContainerElement) {
  div.id = 'test-container';
  document.body.appendChild(div);
}

export default div;
