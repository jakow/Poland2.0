import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  colors, shadow, shadowLight,
} from '../variables';
import { rhythm } from '../typography';
import LazyImage from '../atoms/LazyImage';

const borderStyle = '1px solid rgba(1, 1, 1, 0.12)';

interface Props {
  clickable: boolean;
  width?: string;
}

const CardContainer = styled('li')(
  shadowLight,
  (props: Props) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: props.width || rhythm(16),
    overflow: 'hidden',
    border: borderStyle,
    backgroundColor: `${colors.white}`,
  }),
  (props: Props) => (props.clickable && {
    '&:hover': shadow,
  }),
);

const CardContent = styled('div')({
  flex: '1 0 0',
  padding: `${rhythm(1)} 1rem`,
  width: '100%',
});

const CardFooter = styled('footer')({
  flex: '0 1',
  padding: `${rhythm(0.5)} 1rem`,
  borderTop: borderStyle,
  textAlign: 'center',
});

const container = css({
  display: 'contents',
  flex: '1 0 0',
});

const CardLink = styled('a')(
  container,
  {
    textDecoration: 'inherit',
    color: 'inherit',
  },
);

const CardClickable = styled('button')(
  container,
  {
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    alignItems: 'inherit',
    padding: 0,
    border: 'none',
    color: 'inherit',
    outline: 'none',
    backgroundColor: 'transparent',
  },
);

export const CardList = styled('ol')({
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: 0,
  margin: 0,
  '& > li': {
    flex: '0 0 100%',
    margin: `0 ${rhythm(0.33)} ${rhythm(1)}`,
  },
});

const renderCardContent = (content: React.ReactNode, href?: string, onClick?: () => void) => {
  if (href) {
    return <CardLink href={href} rel="noopener noreferrer" target="_blank">{content}</CardLink>;
  }
  if (onClick) {
    return <CardClickable onClick={onClick}>{content}</CardClickable>;
  }
  return content;
};

interface CardProps {
  children?: React.ReactNode;
  footer?: React.ReactNode;
  image?: string;
  imagePreview?: string;
  onClick?: () => void;
  href?: string;
  width?: string;
  id?: string;
}

const Card: React.FunctionComponent<CardProps> = ({
  children, footer, image, imagePreview, onClick, href, width, id,
}) => {
  const content = (
    <React.Fragment>
      {image && imagePreview && <LazyImage src={image} placeholder={imagePreview} />}
      {children && (
        <CardContent>
          {children}
        </CardContent>
      )}
    </React.Fragment>
  );

  return (
    <CardContainer clickable={!!onClick || !!href} width={width}>
      {id && <a id={id}/>} {/* eslint-disable-line */}
      {renderCardContent(content, href, onClick)}
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};

export default Card;
