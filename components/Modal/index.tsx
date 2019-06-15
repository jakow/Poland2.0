import * as React from 'react';
import styled from '@emotion/styled';
import { colors } from 'components/variables';
import { rhythm } from 'components/typography';
import { CrossIcon } from 'components/icons';

const transitionDuration = '300ms';

interface VisibilityProps {
  visible: 'hidden' | 'visible';
}

const CloseButton = styled('a')({
  position: 'absolute',
  right: rhythm(1),
  top: rhythm(-2),
  width: rhythm(1),
  height: rhythm(1),
  color: `${colors.white}`,
  cursor: 'pointer'
});

const Content = styled('section')({
  margin: `${rhythm(3)} ${rhythm(1)}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const Main = styled('main')({
  position: 'relative',
  maxWidth: 1024,
  margin: '0 auto',
  transition: `transform ${transitionDuration} ease-in-out,\
opacity ${transitionDuration} ease-in-out`,
  opacity: 0,
  '&.visible': {
    opacity: 1,
    height: 'auto'
  }
});

const Overlay = styled('div')({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: 0,
  backgroundColor: `${colors.dark.fade(0.05)}`,
  opacity: 0,
  transition: `opacity ${transitionDuration} ease-in-out, height 0ms linear`,
  transitionDelay: `0ms, ${transitionDuration}`,
  '&.visible': {
    transitionDelay: '0ms, 0ms',
    opacity: 1,
    height: '100%'
  }
});

const Wrapper = styled('div')({
  position: 'fixed',
  zIndex: 2018,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: 0,
  margin: '0 auto',
  transition: `all 0ms linear ${transitionDuration}`,
  visibility: 'hidden',
  '&.visible': {
    visibility: 'visible',
    transitionDelay: '0ms',
    height: '100%',
    overflowY: 'scroll'
  }
});

interface Props {
  label: string;
  trigger: JSX.Element;
}

/**
 * Displays a modal, overlaying the entire page, with content passed as children.
 * @param trigger Single element used to trigger the opening of the modal.
 * @param label Label of the modal for ARIA.
 */
export default class Modal extends React.Component<Props, VisibilityProps> {
  constructor(props: Props) {
    super(props);
    this._trigger = React.cloneElement(props.trigger, { onClick: this.open });
  }

  componentDidUpdate() { // prevent root element from scrolling
    if (document.documentElement) {
      document.documentElement.style.overflow =
        this.state.visible === 'visible' ? 'hidden' : 'unset';
    }
  }

  state: VisibilityProps = {
    visible: 'hidden'
  };

  _trigger: React.ReactNode;

  open = () => this.setState({ visible: 'visible' });
  close = () => this.setState({ visible: 'hidden' });

  render = () => {
    return (
      <React.Fragment>
        {this._trigger}
        <Wrapper className={this.state.visible} role="dialog" aria-label={this.props.label}>
          <Overlay className={this.state.visible}/>
          <Main className={this.state.visible}>
            <CloseButton onClick={this.close} aria-label="Close" title="Close">
              <h2><CrossIcon/></h2>
            </CloseButton>
            <Content>
              {this.props.children}
            </Content>
          </Main>
        </Wrapper>
      </React.Fragment>
    );
  }
}
