// When element is undefined or null or empty string, it shouldn't be rendered.
export default function shouldRender(element) {
  return element != null && element !== '';
}
