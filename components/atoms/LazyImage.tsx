import React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';
import Observer from '@researchgate/react-intersection-observer';

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
});

const style = css({
  margin: 0,
  objectFit: 'fill',
  width: '100%',
  willChange: 'opacity',
  transition: 'opacity 0.25s ease-in',
});

const preview = css({
  filter: 'blur(5px)',
});

interface Props {
  src: string;
  placeholder: string;
  onRender?: Function;
  throttle?: number;
}

/**
 * @param src URL of the source image
 * @param placeholder URL of the placeholder image.
 * Should be lightweight for this component to do its job...
 * @param onRender Function to be called after the image is loaded
 * @param throttle Delay to be added to image loading, in milliseconds
 */
export default class LazyImage extends React.Component<Props> {
  element = React.createRef<HTMLImageElement>();

  state = {
    disabled: false,
  };

  handleIntersection = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      if (this.props.throttle) {
        setTimeout(() => this.loadImage(entry.target as HTMLImageElement), this.props.throttle);
      } else {
        this.loadImage(entry.target as HTMLImageElement);
      }
    }
  };

  loadImage = (image: HTMLImageElement) => {
    image.src = this.props.src;

    if (!this.state.disabled) {
      this.setState({ disabled: true }, () => {
        if (this.props.onRender) {
          this.props.onRender();
        }
      });
    }
  };

  observerOptions = {
    onChange: this.handleIntersection,
  };

  render() {
    return (
      <Wrapper>
        <Observer {...this.observerOptions} {...this.state.disabled}>
          <img
            src={this.props.placeholder}
            ref={this.element}
            className={`${style} ${!this.state.disabled ? preview : ''}`}
          />
        </Observer>
      </Wrapper>
    );
  }
}
