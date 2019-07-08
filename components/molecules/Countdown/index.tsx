import * as React from 'react';
import Datespan, { DatespanUnit } from './datespan';
import styled from '@emotion/styled';
import Period from './Period';

const Time = styled('time')({
  display: 'inline-flex'
});

interface CountdownProps {
  date: Date;
  maxUnit?: DatespanUnit;
  minUnit?: DatespanUnit;
  stroke?: string;
}

interface CountdownState {
  datespan: Datespan;
}

export default class Countdown extends React.Component<CountdownProps, CountdownState> {
  static defaultProps = {
    date: new Date(),
    maxUnit: DatespanUnit.DAYS,
    minUnit: DatespanUnit.SECONDS,
  };

  interval: any;

  componentWillMount() {
    this.props.date && this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  componentWillReceiveProps(newProps: CountdownProps) {
    if (this.props.date !== newProps.date) {
      this.stop();
      this.start();
    }
  }

  private start() {
    this.update();
    this.interval = setInterval(this.update, 1000);
  }

  private stop() {
    clearInterval(this.interval);
  }

  private update = () => {
    const datespan = new Datespan(new Date(), this.props.date, {
      minUnit: this.props.minUnit,
      maxUnit: this.props.maxUnit,
    });

    this.refs.time && this.setState({ datespan }, () => {
      datespan.isZero && this.stop();
    });
  }

  private renderDatespan() {
    const datespan = this.state.datespan;
    return datespan.toArray().map(d => <Period key={d.unit} stroke={this.props.stroke} {...d} />);
  }

  render() {
    return (
      <Time ref="time" dateTime={this.props.date.toISOString()}>
        {this.refs.time && this.renderDatespan()}
      </Time>
    );
  }
}
