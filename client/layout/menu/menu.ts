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
    // on a resize, recalculate dimensions and make sure it closes properly if viewport becomes larger
    window.addEventListener('resize', debounce(() => {
      this.calculateDimensions();
      if (window.innerWidth > 768) {
        this.close();
      } else if (this.openState) {
        // reposition overlay
        anime(this.getAnimationProps(true, true));
      }
    }, 200));
    this.button.addEventListener('click', this.toggle.bind(this));
    // immediately close the menu (some glitch with animejs occurs on first open otherwise)
    this.overlay.style.visibility = 'hidden';
    this.nav.style.visibility = 'hidden';
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

  public toggle() {
    if (this.openState) {
      this.close();
    } else {
      this.open();
    }
  }

  public open() {
    this.openState = true;
    preventScroll(true);
    this.nav.style.visibility = 'visible';
    document.body.classList.add('mobile-menu-open');
    this.button.setAttribute('aria-expanded', 'true');
    this.nav.classList.add('open');
    if (this.isAnimating) {
      this.overlayAnimation.reverse();
    } else {
      this.startAnimation(true);
    }
  }

  public close() {
    this.openState = false;
    // prevent scroll is removed on animation finished to prevent a reflow mid animation
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
      this.nav.style.visibility = 'hidden';
      preventScroll(false);
    }
  }

  private startAnimation(openNotClose: boolean) {
    this.isAnimating = true;
    this.animationProps = this.getAnimationProps(openNotClose);
    this.overlayAnimation = anime(this.animationProps);
    this.overlayAnimation.finished.then(this.onAnimationFinished);
  }

  private getAnimationProps(openNotClose: boolean, immediate: boolean = false) {
    if (openNotClose) {
      return {
        targets: this.overlay,
        translateX: {
          value: this.translateX,
          duration: immediate ? 1 : 300,
          easing: 'easeInOutQuart',
        },
        translateY: {
          value: this.translateY,
          duration: immediate ? 1 : 300,
          easing: 'easeInOutQuart',
        },
        scale: {
          value: 1,
          duration: immediate ? 1 : 450,
          easing: 'easeInOutSine',
        },
        // direction:
      };
    } else {
      return {
        targets: this.overlay,
        translateX: {
          value: 0,
          duration: immediate ? 1 : 400,
          delay: immediate ? 0 : 50 ,
          easing: 'easeInOutQuart',
        },
        translateY: {
          value: 0,
          duration: immediate ? 1 : 300,
          delay: immediate ? 0 : 150,
          easing: 'easeInOutQuart',
        },
        scale: {
          value: 0,
          duration: immediate ? 1 : 450,
          easing: 'easeInOutCubic',
        },
      };
    }
  }
}
