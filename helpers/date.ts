import moment from 'moment';

export function dateString(startDate: string, endDate: string) {
  // NOTE the use of en dash instead of hyphen in dates

  const start = moment(startDate);
  const end = moment(endDate);

  // start date must always be filled
  if (start == null) {
    return '';
  }

  if (end.month() === start.month()) {
    // one day only
    if (start.date() === end.date()) {
      return `${start.format('D MMMM YYYY')}`;
    }
    // multiple days in a single month
    return `${start.date()}–${end.format('D MMMM YYYY')}`;
  }

  // contracted months are printed - assume that the year is the same.
  return `${start.format('D MMM')}–${end.format('D MMM YYYY')}`;
}
