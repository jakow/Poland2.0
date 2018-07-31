import 'core-js/shim';
import * as Headroom from 'headroom.js';
import Menu from './layout/menu/menu';
import * as lazyImages from './components/lazy-image/lazy-image';
import './main.scss';
import {animatedHashAnchors, initHashNavigation, JUMP_OPTIONS} from './clientUtils';
import {initModals} from './components/modal/modal';
import renderCountdowns from './components/countdown/renderCountdowns';

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.remove('no-js');
  // animated menu
  const menu = new Menu();
  // hide top bar on mobile when scrolling using headroom-js
  const headroom = new Headroom(document.querySelector('.site-header'), {
    offset: 70,
    onUnpin: function() { // tslint:disable-line
      if (menu.isOpen) {
        this.elem.classList.remove(this.classes.unpinned);
        this.elem.classList.add(this.classes.pinned);
      } else {
        this.elem.classList.add(this.classes.unpinned);
        this.elem.classList.remove(this.classes.pinned);
      }
    },
  });
  headroom.init();
  // lazy images that only load when the user scrolls the image into view
  lazyImages.init();

  animatedHashAnchors(() => { if (menu.isOpen) { menu.close(); }});
  initHashNavigation();
  const modalContainers = Array.from(document.querySelectorAll('.modal:not(.contact-form-modal)')) as HTMLElement[];
  initModals(modalContainers);
  // const contactFormModal = new ContactFormModal(document.getElementById('contact-form-modal'));
  renderCountdowns();
});
