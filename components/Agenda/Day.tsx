import styled from '@emotion/styled';
import { rhythm } from '../typography';
import { colors } from '../variables';

export const DayList = styled('ol')({
  listStyle: 'none',
  margin: 0,
  padding: `0 0 ${rhythm(1)}`
});

export const DayItem = styled('li')({
  marginBottom: rhythm(1),
});

const ornamentSize = rhythm(0.75);
export const Description = styled('header')({
  position: 'relative',
  marginBottom: rhythm(0.5),
  padding: `0 ${rhythm(1)}`,
  marginLeft: [rhythm(0.85)],
  // circular ornament on the timeline
  '&::before': {
    content: '""',
    position: 'absolute',
    width: [ornamentSize],
    height: [ornamentSize],
    backgroundColor: `${colors.primary}`,
    borderRadius: '50%',
    marginLeft: 0,
    top: rhythm(0.1),
    left: `-${rhythm(0.55)}`,
  },
});
