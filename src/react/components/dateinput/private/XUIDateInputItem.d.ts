import * as React from 'react';
import { DayModifiers } from 'react-day-picker';

interface Props {
  className?: string;

  onSelectDate?: (day: Date, modifiers: DayModifiers, e: React.MouseEvent<HTMLDivElement>) => void;

  qaHook?: string;

  selectedDateValue?: Date;
}

export default class XUIDateInputItem extends React.PureComponent<Props> {}
