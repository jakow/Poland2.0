import * as React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { DatespanUnit, DatespanPeriod } from './datespan';
import { rhythm, Center } from '../typography';
import Arc from './Arc';
import { breakpointMax } from '../variables';

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

const Circle = styled('span')({
  position: 'relative',
  display: 'block',
  height: '100%',
  marginBottom: rhythm(0.5)
});

const Value = styled('h3')({
  display: 'block',
  position: 'absolute',
  top: rhythm(0.66)
});

const style = css({
  [breakpointMax('mobile')]: {
    transform: 'scale(0.75)'
  },
  width: rhythm(3.25),
  height: rhythm(2),
  '& + &': {
    [breakpointMax('mobile')]: {
      marginLeft: 0
    },
    marginLeft: rhythm(1)
  },
  '*': {
    width: '100%'
  }
});

const Period: React.StatelessComponent<DatespanPeriod & { stroke?: string }> =
  ({ unit, value, max, stroke }) => (
    <Center className={style}>
      <Circle>
        <Arc max={max} value={value} stroke={stroke}/>
        <Value>{value}</Value>
      </Circle>
      <h3>{unitString(unit, value)}</h3>
    </Center>
  );

export default Period;
