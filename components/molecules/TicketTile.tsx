import { NextFC } from 'next';
import Card from './Card';
import Markdown from 'react-markdown';
import { Icon } from '@blueprintjs/core';
import { Header3, Header2, Header4 } from '../atoms/Headers';
import styled from '@emotion/styled';
import { rhythm } from '../typography';
import { colors } from '../variables';
import { css } from '@emotion/core';

interface Props {
  name: string;
  description: string;
  price: number;
  quantity?: number;
  soldRecently?: number;
  benefits?: string;
}

const Wrapper = styled('section')({
  '& > h3': {
    marginBottom: rhythm(0.5)
  },
  p: {
    // textAlign: 'justify',
    marginBottom: rhythm(0.5)
  }
});

const Benefit = styled('p')({
  display: 'flex',
  marginBottom: rhythm(0.25),
  '.bp3-icon': {
    marginTop: '2px'
  }
});

const FooterStyled = styled('section')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  '.bp3-icon': {
    height: '20px'
  }
});

const margin = css({
  margin: `0 ${rhythm(0.5)}`
});

const IconLabel = styled('span')(margin);

const Quantity = styled('b')(margin, {
  paddingTop: '2px'
});

const Footer = ({ price }) => (
  <FooterStyled>
    <Header3 bold noMargin>£{price}</Header3>
    <FooterStyled>
      <Icon icon="remove" color={`${colors.dark}`} iconSize={20}/>
      <Quantity>0</Quantity>
      <Icon icon="add" color={`${colors.dark}`} iconSize={20}/>
    </FooterStyled>
  </FooterStyled>
);

const TicketTile: NextFC<Props> = ({
  name, description, quantity, soldRecently, price, benefits
}) => (
  <Card footer={<Footer price={price}/>}>
    <Wrapper>
      <Header3 bold>{name}</Header3>
      {description && <Markdown>{description}</Markdown>}
      {benefits && benefits.split('\n').map((benefit, index) => (
        <Benefit key={index}>
          <Icon icon="tick-circle" color={`${colors.dark}`} iconSize={20}/>
          <IconLabel>{benefit}</IconLabel>
        </Benefit>
      ))}
      {quantity &&
        <small>
          <b>{quantity}</b> tickets remaining.&nbsp;
          {soldRecently &&
            <span>
              <u>{soldRecently} sold</u> in the past 24 hours!
            </span>
          }
        </small>
      }
    </Wrapper>
  </Card>
);

export default TicketTile;
