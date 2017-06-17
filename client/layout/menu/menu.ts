import { throttle } from 'lodash';
export default class Menu {
  private overlay: HTMLElement;
  private buttonX: number;
  private buttonY: number;
  private visible: boolean;
  private shadow: HTMLElement;
  constructor(private triggerElement: Element, private rootElement: Element) {
    this.triggerElement.addEventListener('click', this.show.bind(this));
    this.createOverlay();
    // this.createShadow();
    this.resizeMenu();
    window.addEventListener('resize', throttle(this.resizeMenu, 100));
  }

  public show() {
    this.visible = true;
    // this.shadow.classList.toggle('show');
    this.overlay.classList.toggle('show');
  }

  public createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.classList.add('menu-overlay');
    this.rootElement.parentElement.appendChild(this.overlay);
  }

  public createShadow() {
    this.shadow = document.createElement('div');
    this.shadow.classList.add('menu-overlay-shadow');
    this.rootElement.appendChild(this.shadow);
  }

  public resizeMenu = () => {
    // get transform origin for the menu
    const rect = this.triggerElement.getBoundingClientRect();
    const buttonWidth = rect.right - rect.left;
    const buttonHeight = rect.bottom -  rect.top;
    const top = rect.top + buttonHeight / 2;
    const left = rect.left + buttonWidth / 2;
    const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;
    const w = Math.max(wWidth - left, left);
    const h = Math.max(wHeight - top, top);
    const radius = Math.hypot(w, h) + 24;
    this.overlay.style.width = `${2 * radius}px`;
    this.overlay.style.height = `${2 * radius}px`;
    this.overlay.style.left = `${left}px`;
    this.overlay.style.top = `${top}px`;
  }
}
