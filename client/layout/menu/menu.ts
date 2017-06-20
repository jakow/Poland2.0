import anime = require('animejs');
import {debounce} from 'lodash';
import {preventScroll} from '../../utils';

const TABLET_BREAKPOINT = 768;
const MENU_ITEM_DURATION = 100; // ms
const MENU_ITEM_DELAY = 100;
const MENU_ITEM_TRANSLATE_AMOUNT = -10; // px

type AnimationType = boolean;
const OPEN: AnimationType = true;
const CLOSE: AnimationType = false;

export default class Menu {
  private static delayFunc: anime.PropFunction = (el, i: number, l) => MENU_ITEM_DELAY * i;
  // dom elements
  private openState: boolean;
  private button: HTMLElement;
  private overlayContainer: HTMLElement;
  private overlay: HTMLElement;
  private nav: HTMLElement;
  private menuItems: NodeList;
  // dimensions
  // private windowCenterX: number;
  // private windowCenterY: number;
  private translateX: number;
  private translateY: number;
  // animation state
  private isAnimating: boolean;
  private animation: anime.AnimationTimeline;
  constructor() {
    // grab elements from DOM
    this.button = document.querySelector('.site-header__menu-button') as HTMLElement;
    this.overlayContainer = document.getElementById('mobile-menu');
    this.overlay = document.querySelector('.mobile-menu__overlay') as HTMLElement;
    this.nav = document.querySelector('.mobile-menu') as HTMLElement;
    this.menuItems = this.nav.querySelectorAll('li');
    // if viewport becomes wide enough, close the menu
    window.addEventListener('resize', debounce(this.onWindowResize, 400));
    // click listener
    this.button.addEventListener('click', () => {
      if (!this.isAnimating) {
        this.toggle();
      }
    });
    // immediately close the menu (some glitch with animejs occurs on first open otherwise)
    this.overlayContainer.style.display = 'none';
    anime(this.getOverlayAnimationProps(false, true));
    anime(this.getMenuItemAnimationProps(false, true));
    setTimeout(() => this.overlay.style.display = 'visible', 1);
  }

  public get isOpen() {
    return this.openState;
  }

  public toggle() {
    if (this.openState) {
      console.log('close');
      this.close();
    } else {
      console.log('open');
      this.open();
    }
  }

  public open() {
    this.calculateDimensions();
    this.openState = true;
    // this.nav.classList.add('.site-nav--visible');
    document.body.classList.add('mobile-menu-open');
    this.button.setAttribute('aria-expanded', 'true');
    preventScroll(true);
    this.overlayContainer.style.display = 'block';
    if (this.isAnimating) {
      this.animation.reverse();
    } else {
      this.startAnimation(OPEN);
    }
  }

  public close() {
    this.calculateDimensions();
    this.openState = false;
    // prevent scroll is removed on animation finished to prevent a reflow mid animation
    document.body.classList.remove('mobile-menu-open');
    this.button.setAttribute('aria-expanded', 'false');
    if (this.isAnimating) {
      this.animation.reverse();
    } else {
      this.startAnimation(CLOSE);
    }
  }

  private calculateDimensions = () => {
    console.log('[menu] calculate dimensions');
    // grab dimensions only once to improve performance since this
    // rarely will change (especially on mobile)
    const windowCenterY = window.innerHeight / 2;
    const windowCenterX = window.innerWidth / 2;
    // 1.25 multiplier adds some margin to account for changing
    // viewport height on ihpone
    const radius = Math.hypot(windowCenterX, windowCenterY) * 1.25;
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
      this.overlayContainer.style.display = 'none';
      // this.nav.classList.remove('.site-nav--visible');
      preventScroll(false);
    }
  }

  private onWindowResize = () => {
    this.calculateDimensions();
    if (window.innerWidth >= TABLET_BREAKPOINT) {
      this.close();
    } else if (this.openState) {
      anime(this.getOverlayAnimationProps(OPEN, true));
    }
  }

  private startAnimation(type: AnimationType) {
    this.isAnimating = true;
    const overlayAnimationProps = this.getOverlayAnimationProps(type);
    const menuItemAnimationProps = this.getMenuItemAnimationProps(type);
    this.animation = anime.timeline();
    if (type === OPEN) {
      this.animation.add(overlayAnimationProps).add({...menuItemAnimationProps, complete: this.onAnimationFinished});
    } else {
      this.animation.add(menuItemAnimationProps).add({...overlayAnimationProps, complete: this.onAnimationFinished});
    }
  }

  private getOverlayAnimationProps(openNotClose: boolean, immediate: boolean = false) {
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

  private getMenuItemAnimationProps(openNotClose: boolean, immediate: boolean = false) {
    if (openNotClose) {
      return {
        targets: this.menuItems,
        opacity: 1,
        translateY: 0,
        duration: immediate ? 1 : MENU_ITEM_DURATION,
        delay: immediate ? 0 : Menu.delayFunc,
        easing: 'easeInQuart',
      };
    } else {
      return {
        targets: this.menuItems,
        opacity: 0,
        translateY: MENU_ITEM_TRANSLATE_AMOUNT,
        duration: immediate ? 1 : MENU_ITEM_DURATION,
        delay: immediate ? 0 : Menu.delayFunc,
        easing: 'easeOutQuart',
      };
    }
  }
}
