export default function sortRefsByDOMOrder<T extends HTMLElement>(refs: Array<React.RefObject<T>>) {
  return [...refs].sort((a, b) => {
    if (!a.current || !b.current) {
      return 0;
    }
    return (
      // eslint-disable-next-line no-bitwise
      a.current.compareDocumentPosition(b.current) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    );
  });
}
