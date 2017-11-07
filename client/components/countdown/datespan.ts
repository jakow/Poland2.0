
export enum DatespanUnit {
  YEARS,
  MONTHS,
  DAYS,
  HOURS,
  MINUTES,
  SECONDS,
}
export interface DatespanOptions {
  minUnit: DatespanUnit;
  maxUnit: DatespanUnit;
}

export interface DatespanPeriod {
  unit: DatespanUnit;
  value: number;
  max: number;
}

export default class Datespan implements Iterable<DatespanPeriod> {
  private arr: DatespanPeriod[];
  private span: number;
  constructor(private from: Date, private to: Date, options?: Partial<DatespanOptions>) {
    this.arr = [];

    const defaults: DatespanOptions = {
      maxUnit: DatespanUnit.MONTHS,
      minUnit: DatespanUnit.SECONDS,
    };
    const opts = Object.assign(defaults, options);
    let remaining = Math.max(Math.round((to.getTime() - from.getTime()) / 1000), 0);
    this.span = remaining;

    for (let unit = +opts.maxUnit; unit <= +opts.minUnit; ++unit) {
      const result = getUnitsInTimespan(unit, remaining, to);
      const max = result.max;
      remaining = result.remaining;
      this.arr.push({ value: result.value, unit, max });
    }
  }

  public get isZero() {
    return this.span === 0;
  }

  public toArray() {
    return  [...this.arr];
  }

  public get [Symbol.iterator]() {
    let i = 0;
    const arr = this.arr;
    return function*() {
      while (i < arr.length) {
        yield arr[i++];
      }
      return;
    };
  }
}

function getUnitsInTimespan(unit: DatespanUnit, timespanInSeconds: number, endDate: Date) {
  if (unit === DatespanUnit.YEARS) {
    return getFullYearsFromEndDate(timespanInSeconds, endDate);
  } else if (unit === DatespanUnit.MONTHS) {
    return getFullMonthsFromEndDate(timespanInSeconds, endDate);
  }
  return getFullUnits(unit, timespanInSeconds, endDate);
}

function getFullYearsFromEndDate(timespanInSeconds: number, endDate: Date) {
  const last = endDate.getFullYear() - 1; // start with year before the current
  let year = last;
  let sec = daysInYear(year) * 24 * 60 * 60;
  while (timespanInSeconds - sec >= 0) {
    timespanInSeconds -= sec;
    year--;
    sec = daysInYear(year) * 24 * 60 * 60;
  }

  return {
    remaining: timespanInSeconds,
    value: last - year,
    max: 0,
  };
}

function getFullMonthsFromEndDate(timespanInSeconds: number, endDate: Date) {
  let currYear = endDate.getFullYear();
  let currMonth = endDate.getMonth() - 1; // take previous months length
  let months = 0;
  let sec = daysInMonth(currMonth, currYear) * 24 * 60 * 60;

  while (timespanInSeconds - sec >= 0) {
    timespanInSeconds -= sec;
    currMonth--;
    months++;

    if (currMonth === -1) {
      currMonth = 11;
      currYear--;
    }

    sec = daysInMonth(currMonth, currYear) * 24 * 60 * 60;
  }

  return {
    remaining: timespanInSeconds,
    value: months,
    max: 12,
  };
}

function getFullUnits(unit: DatespanUnit, timespanInSeconds: number, endDate: Date) {
  if (unit === DatespanUnit.MONTHS || unit === DatespanUnit.YEARS) {
    throw new Error('Cannot get full units of months or years');
  }

  const unitDurations = {
    [DatespanUnit.SECONDS]: 1,
    [DatespanUnit.MINUTES]: 60,
    [DatespanUnit.HOURS]: 60 * 60,
    [DatespanUnit.DAYS]: 24 * 60 * 60,
  };

  const unitMaxes = {
    [DatespanUnit.SECONDS]: 60,
    [DatespanUnit.MINUTES]: 60,
    [DatespanUnit.HOURS]: 24,
    [DatespanUnit.DAYS]: daysInMonth(endDate.getMonth(), endDate.getFullYear()),
  };

  return {
    value: Math.floor(timespanInSeconds / unitDurations[unit]),
    remaining: timespanInSeconds % unitDurations[unit],
    max: unitMaxes[unit],
  };
}

function isLeapYear(year: number) {
  if (year % 4 !== 0) {
    return false;
  } else if (year % 100 === 0) {
    return year % 400 === 0;
  }
  return true;
}

function daysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

function daysInYear(year: number) {
  return isLeapYear(year) ? 366 : 365;
}
