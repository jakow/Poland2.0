const MODAL_OPEN_BODY_CLASS = 'modal-is-open';
const OPEN_CLASS = 'modal--open';
const OVERLAY_CLASS = 'modal__overlay';
const OVERLAY_CLOSE_BUTTON_CLASS = 'modal__close-button';
const ANIM_DURATION = 400;
import * as anime from 'animejs';

enum AnimationType {OPEN, CLOSE}

export default class Modal {
  public static previousFocus: Element;
  private openState: boolean;
  private overlay: HTMLElement;
  private closeButton: HTMLElement;
  private openButton: HTMLAnchorElement;
  private previousFocus: Element;
  constructor(private container: HTMLElement) {
    this.overlay = this.container.querySelector('.' + OVERLAY_CLASS) as HTMLElement;
    this.closeButton =  this.container.getElementsByClassName(OVERLAY_CLOSE_BUTTON_CLASS)[0] as HTMLElement;
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.onCloseClick);
    }
    // use the aria-controls attribute to find the controlling button
    this.openButton = document.querySelector(`a[aria-controls="${this.container.id}"`) as HTMLAnchorElement;
    if (this.openButton) {
      this.openButton.addEventListener('click', this.onOpenClick);
      this.openButton.setAttribute('aria-expanded', 'false');
    }
  }

  public get isOpen() {
    return this.openState;
  }

  public toggle() {
  if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  public open() {
    this.openState = true;

    if (this.openButton) {
      this.openButton.setAttribute('aria-expanded', 'true');
    }
    document.body.classList.add(MODAL_OPEN_BODY_CLASS);
    this.container.classList.add(OPEN_CLASS);
    // handle click and keyboard events
    document.addEventListener('keydown', this.onEscape);
    this.overlay.addEventListener('click', this.onCloseClick);
    // handle re-focus on close - important for aria accessibility
    if (this.closeButton) {
      Modal.previousFocus = document.activeElement;
      this.closeButton.focus();
    }
  }

  public close() {
    this.openState = false;

    if (this.openButton) {
      this.openButton.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove(MODAL_OPEN_BODY_CLASS);
    this.container.classList.remove(OPEN_CLASS);
    document.removeEventListener('keydown', this.onEscape);
    this.overlay.removeEventListener('click', this.onCloseClick);
    if (Modal.previousFocus && Modal.previousFocus instanceof HTMLElement) {
      Modal.previousFocus.focus();
      Modal.previousFocus = null;
    }
  }

  private onEscape = (ev: KeyboardEvent) => {
    if (ev.keyCode === 27) { // escape
      ev.stopPropagation();
      this.close();
    }
  }

  private onCloseClick = (ev: MouseEvent) => {
    ev.preventDefault();
    this.close();
  }

  private onOpenClick = (ev: MouseEvent) => {
    ev.preventDefault();
    this.open();
  }

  private getOverlayAnimProps(type: AnimationType) {
    return {
      targets: this.overlay,
      opacity: type === AnimationType.OPEN ? 1 : 0,
      duration: ANIM_DURATION,
      begin: type === AnimationType.OPEN ? () => document.body.classList.add(MODAL_OPEN_BODY_CLASS) : null,
      complete: type === AnimationType.CLOSE ? () => document.body.classList.remove(MODAL_OPEN_BODY_CLASS) : null,
    };
  }
}

export function initModals(containers: HTMLElement[]) {
  const modals: Modal[] = [];
  for (const modal of containers) {
    modals.push(new Modal(modal));
  }
  return modals;
}
