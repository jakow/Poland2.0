import * as React from 'react';
import Datespan, { DatespanPeriod, DatespanUnit } from './datespan';

interface CountdownProps {
  date: Date;
  maxUnit?: DatespanUnit;
  minUnit?: DatespanUnit;
}

interface CountdownState {
  datespan: Datespan;
}

export default class Countdown extends React.Component<CountdownProps, CountdownState> {
  public static defaultProps: Partial<CountdownProps> = {
    maxUnit: DatespanUnit.DAYS,
    minUnit: DatespanUnit.SECONDS,
  };

  private interval: number;

  public componentWillMount() {
    if (this.props.date) {
      this.start();
    }
  }

  public componentWillReceiveProps(newProps: CountdownProps) {
    if (this.props.date !== newProps.date) {
      this.stop();
      this.start();
    }
  }

  public render() {
    return (<time className="countdown" dateTime={this.props.date.toISOString()}>
      { this.renderDatespan() }
    </time>
    );
  }

  private start() {
    this.update();
    this.interval = window.setInterval(this.update, 1000);
  }

  private stop() {
    window.clearInterval(this.interval);
  }

  private update = () => {
    const datespan = new Datespan(new Date(), this.props.date, {
      minUnit: this.props.minUnit,
      maxUnit: this.props.maxUnit,
    });
    this.setState({ datespan });
    if (datespan.isZero) {
      this.stop();
    }
  }

  private renderDatespan() {
    const datespan = this.state.datespan;
    return datespan.toArray().map((d, idx) => <Period index={idx} key={d.unit} {...d} />);
  }
}

type DatespanPeriodProps = DatespanPeriod & {
  index: number;
};

function unitString(unit: DatespanUnit, value: number) {
  const unitNames = {
    [DatespanUnit.YEARS]: 'year',
    [DatespanUnit.MONTHS]: 'month',
    [DatespanUnit.DAYS]: 'day',
    [DatespanUnit.HOURS]: 'hour',
    [DatespanUnit.MINUTES]: 'minute',
    [DatespanUnit.SECONDS]: 'second',
  };
  let s = unitNames[unit];
  if (value !== 1) {
    s += 's';
  }
  return s;
}

function Period({index, unit, value, max}: DatespanPeriodProps) {
  return (<div className="countdown__period">
    <span className="countdown__circle">
      <Arc max={max} value={value} className="countdown__arc"/>
      <span className="countdown__value">{value}</span>
    </span>
    <span className="countdown__unit">
      {unitString(unit, value)}
    </span>
  </div>);
}

function Arc({max, value, className}: {max: number, value: number, className: string}) {
  const radius = 27;
  const strokeWidth = 2;
  const size = 2 * radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  if (max !== 0 && value !== 0) {
    offset = (value / max - 1) * circumference;
  }
  return (
    <svg width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle className={className}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth}
          stroke="black"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none" />
      </g>
    </svg>);
}
