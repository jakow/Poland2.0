import 'core-js/shim';
import {debounce} from 'lodash';
import * as moment from 'moment';
import * as Headroom from 'headroom.js';
import jump from 'jump.js';
import Loader from './layout/loader/loader';
import Menu from './layout/menu/menu';
import * as lazyImages from './components/lazy-image/lazy-image';
import initForms from './components/form/form';
import './main.scss';
import {animatedHashAnchors, initHashNavigation, JUMP_OPTIONS} from './clientUtils';

document.addEventListener('DOMContentLoaded', () => {
  // a bespoke loader for poland 2.0 site
  const loader = new Loader(document.querySelector('.loader') as HTMLElement);
  loader.hide(); // for now
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
  initForms();
});
