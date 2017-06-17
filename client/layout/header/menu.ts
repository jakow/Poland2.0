class Menu {
  private openState: boolean;
  private button: HTMLElement;
  private nav: HTMLElement;
  constructor() {
    this.button = document.querySelector('.site-header__menu-button') as HTMLElement;
    this.button.addEventListener('click', this.toggleMenu);
    this.nav = document.getElementById('mobile-menu');
  }

  public get isOpen() {
    return this.openState;
  }

  public toggleMenu = () => {
    if (this.openState) {
      this.close();
    } else {
      this.open();
    }
    this.openState = !this.openState;
  }

  private open() {
    // open the nav
    this.nav.classList.add('open');
  }

  private close() {
    this.nav.classList.remove('open');
  }
}
