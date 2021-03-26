// These have not been added to @types/react-beautiful-dnd yet so we run them through JS to prevent
// TS from looking at them too closely
import { useMouseSensor, useTouchSensor } from 'react-beautiful-dnd';

export { useMouseSensor, useTouchSensor };
