import * as anime from 'animejs';
import {debounce} from 'lodash';
import {preventScroll} from '../../utils';

export default class Menu {
  // dom elements
  private openState: boolean;
  private button: HTMLElement;
  private nav: HTMLElement;
  private overlay: HTMLElement;
  // dimensions
  // private windowCenterX: number;
  // private windowCenterY: number;
  private translateX: number;
  private translateY: number;
  // animation state
  private isAnimating: boolean;
  private overlayAnimation: anime.Animation;
  private animationProps: anime.AnimeProps;
  constructor() {
    // grab elements from DOM
    this.button = document.querySelector('.site-header__menu-button') as HTMLElement;
    this.button.addEventListener('click', this.toggle);
    this.nav = document.getElementById('mobile-menu');
    this.overlay = this.nav.querySelector('.mobile-menu__overlay') as HTMLElement;
    // recalculate overlay dimensions
    this.calculateDimensions();
    window.addEventListener('resize', debounce(this.calculateDimensions, 200));
    this.button.addEventListener('click', this.toggle);
    // immediately close (some glitch)
    this.overlay.style.visibility = 'hidden';
    this.nav.style.display = 'none';
    anime({
      targets: this.overlay,
      scale: 0,
      translateX: 0,
      translateY: 0,
      duration: 1,
    });
    setTimeout(() => this.overlay.style.visibility = 'visible', 1);
  }

  public get isOpen() {
    return this.openState;
  }

  public toggle = () => {
    if (this.openState) {
      this.close();
    } else {
      this.open();
    }
    this.openState = !this.openState;
  }

  private open() {
    preventScroll(true);
    this.nav.style.display = 'block';
    document.body.classList.add('mobile-menu-open');
    this.button.setAttribute('aria-expanded', 'true');
    this.nav.classList.add('open');
    if (this.isAnimating) {
      this.overlayAnimation.reverse();
    } else {
      this.startAnimation(true);
    }
  }

  private close() {
    preventScroll(false);
    document.body.classList.remove('mobile-menu-open');
    this.button.setAttribute('aria-expanded', 'false');
    this.nav.classList.remove('open');
    if (this.isAnimating) {
      this.overlayAnimation.reverse();
    } else {
      this.startAnimation(false);
    }
  }

  private calculateDimensions = () => {
    console.log('[menu] calculate dimensions');
    // grab dimensions only once to improve performance since this
    // rarely will change (especially on mobile)
    const windowCenterY = window.innerHeight / 2;
    const windowCenterX = window.innerWidth / 2;
    const radius = Math.hypot(windowCenterX, windowCenterY);
    const diameter = `${2 * radius}px`;
    // make the overlay fit the screen
    this.overlay.style.width = diameter;
    this.overlay.style.height = diameter;
    // the menu animation originates from where the menu button is
    // so we place it there
    const menuButton = document.querySelector('.site-header__menu-button');
    const rect = menuButton.getBoundingClientRect();
    const buttonCenterX = (rect.left + rect.right) / 2;
    const buttonCenterY = (rect.top + rect.bottom) / 2;
    this.overlay.style.left = `${buttonCenterX - radius}px`;
    this.overlay.style.top = `${buttonCenterY - radius}px`;
    // recalculate animation props
    this.translateX = windowCenterX - buttonCenterX;
    this.translateY = windowCenterY - buttonCenterY;
  }

  private onAnimationFinished = () => {
    this.isAnimating = false;
    if (!this.openState) {
      this.nav.style.display = 'none';
    }
  }

  private startAnimation(openNotClose: boolean) {
    this.isAnimating = true;
    this.animationProps = this.getAnimationProps(openNotClose);
    this.overlayAnimation = anime(this.animationProps);
    this.overlayAnimation.finished.then(this.onAnimationFinished);
  }

  private getAnimationProps(openNotClose: boolean) {
    if (openNotClose) {
      return {
        targets: this.overlay,
        translateX: {
          value: this.translateX,
          duration: 300,
          easing: 'easeInOutQuart',
        },
        translateY: {
          value: this.translateY,
          duration: 400,
          easing: 'easeInOutQuart',
        },
        scale: {
          value: 1,
          duration: 450,
          easing: 'easeInOutSine',
        },
        // direction:
      };
    } else {
      return {
        targets: this.overlay,
        translateX: {
          value: 0,
          duration: 400,
          delay: 50,
          easing: 'easeInOutQuart',
        },
        translateY: {
          value: 0,
          duration: 300,
          delay: 150,
          easing: 'easeInOutQuart',
        },
        scale: {
          value: 0,
          duration: 450,
          easing: 'easeInOutCubic',
        },
      };
    }
  }
}
