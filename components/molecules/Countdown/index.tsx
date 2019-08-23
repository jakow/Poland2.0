import React from 'react';
import styled from '@emotion/styled';
import Datespan, { DatespanUnit } from './datespan';
import Period from './Period';

const Time = styled('time')({
  display: 'inline-flex',
});

interface CountdownProps {
  date: Date;
  maxUnit?: DatespanUnit;
  minUnit?: DatespanUnit;
  stroke?: string;
}

interface CountdownState {
  datespan: Datespan;
  interval: NodeJS.Timeout;
}

export default class Countdown extends React.Component<CountdownProps, CountdownState> {
  static defaultProps = {
    date: new Date(),
    maxUnit: DatespanUnit.DAYS,
    minUnit: DatespanUnit.SECONDS,
  };

  componentDidMount() {
    const { date } = this.props;
    if (date) {
      this.start();
    }
  }

  componentDidUpdate(prevProps: CountdownProps) {
    const { date } = this.props;
    if (date !== prevProps.date) {
      this.stop();
      this.start();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  private update = () => {
    const { date, minUnit, maxUnit } = this.props;
    const datespan = new Datespan(new Date(), date, {
      minUnit,
      maxUnit,
    });

    this.setState({ datespan }, () => {
      if (datespan.isZero) {
        this.stop();
      }
    });
  }

  private stop() {
    const { interval } = this.state;
    clearInterval(interval);
  }

  private start() {
    this.update();
    this.setState({
      interval: setInterval(this.update, 1000),
    });
  }

  private renderDatespan() {
    const { datespan } = this.state;
    const { stroke } = this.props;

    return datespan.toArray().map(d => <Period key={d.unit} stroke={stroke} {...d} />);
  }

  render() {
    const { date } = this.props;
    return (
      <Time dateTime={date.toISOString()}>
        {this.state && this.renderDatespan()}
      </Time>
    );
  }
}
