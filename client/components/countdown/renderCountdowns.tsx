import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Countdown from './index';
import { DatespanUnit } from './datespan';
// hacky way to drop react components on page before a full react rewrite

export default function renderCountdowns() {
  const countdowns = Array.from(document.querySelectorAll('.countdown')) as HTMLElement[];
  for (const c of countdowns) {
    const date = new Date(c.dataset.date);
    const maxUnit = parseInt(c.dataset.maxUnit, 10) || DatespanUnit.DAYS;
    console.log(c.dataset.date);
    ReactDOM.render(<Countdown
      date={date}
      maxUnit={maxUnit}
    />, c);
  }
}
