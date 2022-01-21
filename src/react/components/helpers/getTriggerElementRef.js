const getTriggerElementRef = triggerRef => ({
  _triggerRef: triggerRef,
  get current() {
    const possibleTriggerElements = [
      this._triggerRef.current,
      this._triggerRef.current?.rootNode,
      this._triggerRef.current?.rootNode?.current,
      this._triggerRef.current?.rootNode?.current?.rootNode?.current,
    ];
    return possibleTriggerElements.find(item => item instanceof HTMLElement) || null;
  },
});

export default getTriggerElementRef;
