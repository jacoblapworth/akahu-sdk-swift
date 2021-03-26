/**
 * This file is a TS copy of react-beautiful-dnd's keyboard sensor but both `enter` and `space` can
 * be used to lift/drop a draggable item.
 *
 * https://github.com/atlassian/react-beautiful-dnd/blob/master/src/view/use-sensor-marshal/sensors/use-keyboard-sensor.js
 */

import * as React from 'react';
import { DraggableId, PreDragActions, SensorAPI, SnapDragActions } from 'react-beautiful-dnd';

import NOOP from '../../../../helpers/noop';
import { eventKeyValues, isKeyClick } from '../../../../helpers/reactKeyHandler';
import bindEvents from './react-beautiful-dnd/bind-events';
import { invariant } from './react-beautiful-dnd/invariant';
import preventStandardKeyEvents from './react-beautiful-dnd/prevent-standard-key-events';
import supportedEventname from './react-beautiful-dnd/supported-page-visibility-event-name';

type KeyMap = {
  [key: number]: true;
};

const scrollJumpKeys: KeyMap = {
  [eventKeyValues.pageDown]: true,
  [eventKeyValues.pageUp]: true,
  [eventKeyValues.home]: true,
  [eventKeyValues.end]: true,
};

function getDraggingBindings(actions: SnapDragActions, stop: () => void) {
  function cancel() {
    stop();
    actions.cancel();
  }

  function drop() {
    stop();
    actions.drop();
  }

  return [
    {
      eventName: 'keydown',
      fn: (event: KeyboardEvent) => {
        if (event.key === eventKeyValues.escape) {
          event.preventDefault();
          cancel();
          return;
        }

        // Dropping
        if (isKeyClick(event)) {
          // need to stop parent Draggable's thinking this is a lift
          event.preventDefault();
          drop();
          return;
        }

        // Movement

        if (event.key === eventKeyValues.down) {
          event.preventDefault();
          actions.moveDown();
          return;
        }

        if (event.key === eventKeyValues.up) {
          event.preventDefault();
          actions.moveUp();
          return;
        }

        if (event.key === eventKeyValues.right) {
          event.preventDefault();
          actions.moveRight();
          return;
        }

        if (event.key === eventKeyValues.left) {
          event.preventDefault();
          actions.moveLeft();
          return;
        }

        // preventing scroll jumping at this time
        if (scrollJumpKeys[event.key]) {
          event.preventDefault();
          return;
        }

        preventStandardKeyEvents(event);
      },
    },
    // any mouse actions kills a drag
    {
      eventName: 'mousedown',
      fn: cancel,
    },
    {
      eventName: 'mouseup',
      fn: cancel,
    },
    {
      eventName: 'click',
      fn: cancel,
    },
    {
      eventName: 'touchstart',
      fn: cancel,
    },
    // resizing the browser kills a drag
    {
      eventName: 'resize',
      fn: cancel,
    },
    // kill if the user is using the mouse wheel
    // We are not supporting wheel / trackpad scrolling with keyboard dragging
    {
      eventName: 'wheel',
      fn: cancel,
      // chrome says it is a violation for this to not be passive
      // it is fine for it to be passive as we just cancel as soon as we get
      // any event
      options: { passive: true },
    },
    // Cancel on page visibility change
    {
      eventName: supportedEventname,
      fn: cancel,
    },
  ];
}

export default function useKeyboardSensor(api: SensorAPI) {
  const unbindEventsRef = React.useRef<() => void>(NOOP);

  const startCaptureBinding = React.useMemo(
    () => ({
      eventName: 'keydown',
      fn: function onKeyDown(event: KeyboardEvent) {
        // Event already used
        if (event.defaultPrevented) {
          return;
        }

        // Need to start drag with keyboard key that matches a click event (space or enter)
        if (!isKeyClick(event)) {
          return;
        }

        const draggableId: DraggableId | undefined = api.findClosestDraggableId(event);

        if (!draggableId) {
          return;
        }

        const preDrag: PreDragActions | undefined = api.tryGetLock(
          draggableId,
          // abort function not defined yet
          // eslint-disable-next-line no-use-before-define
          stop,
          { sourceEvent: event },
        );

        // Cannot start capturing at this time
        if (!preDrag) {
          return;
        }

        // we are consuming the event
        event.preventDefault();
        let isCapturing = true;

        // There is no pending period for a keyboard drag
        // We can lift immediately
        const actions: SnapDragActions = preDrag.snapLift();

        // unbind this listener
        unbindEventsRef.current();

        // setup our function to end everything
        function stop() {
          invariant(isCapturing, 'Cannot stop capturing a keyboard drag when not capturing');
          isCapturing = false;

          // unbind dragging bindings
          unbindEventsRef.current();
          // start listening for capture again
          // eslint-disable-next-line no-use-before-define
          listenForCapture();
        }

        // bind dragging listeners
        unbindEventsRef.current = bindEvents(window, getDraggingBindings(actions, stop), {
          capture: true,
          passive: false,
        });
      },
    }),
    // not including startPendingDrag as it is not defined initially
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api],
  );

  const listenForCapture = React.useCallback(
    function tryStartCapture() {
      const options = {
        passive: false,
        capture: true,
      };

      unbindEventsRef.current = bindEvents(window, [startCaptureBinding], options);
    },
    [startCaptureBinding],
  );

  React.useLayoutEffect(
    function mount() {
      listenForCapture();

      // kill any pending window events when unmounting
      return function unmount() {
        unbindEventsRef.current();
      };
    },
    [listenForCapture],
  );
}
