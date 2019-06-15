import * as React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { colors, breakpointMin } from 'components/variables';
import { MenuItem } from '.';
import { rhythm } from 'components/typography';
import { NavButton } from 'components/Button';

const transition = '200ms cubic-bezier(0.77, 0, 0.175, 1)';
const iconWidth = 28.284;
const iconHeight = 20;

const button = css({
  outline: 'none',
  cursor: 'pointer',
  WebkitAppearance: 'none',
  border: 'none',
  background: 'none',
  padding: `${rhythm(1)} 0`,
  margin: 0,
  position: 'relative',
  height: rhythm(3),
  width: rhythm(3),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const bar = css({
  display: 'block',
  position: 'absolute',
  top: 0,
  backgroundColor: `${colors.dark}`,
  width: iconWidth,
  height: 1,
  transformOrigin: 'left',
  transform: 'scale(1)',
  transition: `transform ${transition}, background-color ${transition}`,
  ':nth-child(2)': {
    top: (iconHeight - 1) / 2,
  },
  ':nth-child(3)': {
    top: iconHeight - 1,
  },
  ':last-of-type': {
    transform: 'scaleX(0.62)',
  },
});

const isOpenClass = css({
  [`& .${bar}`]: {
    backgroundColor: `${colors.white}`,
    ':nth-child(1)': {
      transform: `translateX(${(iconWidth - iconHeight) / 2}px) rotate(45deg)`,
    },
    ':nth-child(2)': {
      transform: 'scaleX(0)',
    },
    ':nth-child(3)': {
      transform: `translateX(${(iconWidth - iconHeight) / 2}px) rotate(-45deg)`,
    },
  },
});

const icon = css({
  width: iconWidth,
  height: iconHeight,
  display: 'block',
  position: 'relative',
  zIndex: 2018
});

const ItemList = styled('ul')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  listStyle: 'none',
  marginTop: rhythm(4),
  marginLeft: '0 !important'
});

const Item = styled('li')({
  textAlign: 'center',
  flex: '1 0 100%',
});

const ItemLink = styled('h3')({
  display: 'inline-block',
  marginBottom: `${rhythm(1)} !important`,
  a: {
    textDecoration: 'none',
    color: `${colors.white}`,
    '&.active': {
      borderBottom: `1px solid ${colors.white}`,
      paddingBottom: '2px'
    }
  }
});

const Menu = styled('nav')({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  [breakpointMin('tablet')]: {
    display: 'none !important'
  }
});

const Overlay = styled('div')({
  position: 'fixed',
  overflowY: 'scroll',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  borderRadius: 0,
  transform: 'initial',
  backgroundColor: `${colors.dark.alpha(0.75)}`
});

export const MobileNavIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className={`${icon} ${isOpen ? isOpenClass : ''}`}>
    <span className={bar} />
    <span className={bar} />
    <span className={bar} />
  </div>
);

interface HamburgerProps {
  onClick: () => void;
  navName: string;
  isOpen: boolean;
}

export const MobileNavButton = ({ onClick, navName, isOpen }: HamburgerProps) => (
  <button
    aria-controls={navName}
    onClick={onClick}
    className={button}
  >
    <MobileNavIcon isOpen={isOpen} />
  </button>
);

interface NavProps {
  items: MenuItem[];
  open: boolean;
  requestClose: () => void;
  Router?: React.ComponentType<any>;
}

export default ({ items, open, requestClose, Router }: NavProps) => (
  <React.Fragment>
    {open && (
      <Menu>
        <Overlay>
          <ItemList>
            {items.map((item, index) => (
              <Item key={index}>
                <ItemLink>
                  {item.type === 'button'
                    ?
                    <NavButton
                      href={item.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {item.title}
                    </NavButton>
                    : Router ?
                      <Router href={item.url}>
                        <a>
                          <span onClick={requestClose}>
                            {item.title}
                          </span>
                        </a>
                      </Router>
                      :
                      <a
                        href={item.url}
                        className={item.active ? 'active' : ''}
                        onClick={requestClose}
                      >
                        {item.title}
                      </a>
                  }
                </ItemLink>
              </Item>
            ))}
          </ItemList>
        </Overlay>
      </Menu>
    )}
  </React.Fragment>
);
