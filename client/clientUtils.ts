import jump from 'jump.js';

export const Breakpoint = {
  MOBILE_LANDSCAPE: 512,
  TABLET: 768,
  DESKTOP: 1024,
};

const HEADER_HEIGHT = 4.5 * 16;
export const JUMP_OPTIONS = {
  duration: (distance: number) => Math.min(Math.abs(distance), 1000),
  offset: -HEADER_HEIGHT,
};
/**
 * Attach event handlers to anchor tags with a hash target so that instead  of immediately jumping
 * to the target, the target smoothly scrolls into view.
 * @param offset the offset from a fixed header to account when scrolling the anchor into view
 * @param callback an optional callback to be called on click of such anchor. Here used to close menu
 */
export function animatedHashAnchors(callback?: () => void) {
  // select all anchors with non empty hash (which is typically used for anchor-based buttons)
  const anchors = document.querySelectorAll('a[href*="#"]:not([href="#"])') as NodeListOf<HTMLAnchorElement>;
  for (let i = 0; i < anchors.length; ++i) { //tslint:disable-line
    const anchor = anchors[i];
    addHashScroll(anchor, callback);
  }
}

/**
 * Attach a click handler to perform an animated scroll to a hash anchor target
 * @param anchor The anchor element with a hash target
 * @param offset The scroll position offset, in pixels (i.e. due to fixed size header)
 * @param callback Callback to be executed on click. Useful i.e. for closing a menu on click
 */
export function addHashScroll(anchor: HTMLAnchorElement, callback?: () => void) {
    const same = location.pathname.replace(/^\//, '') === anchor.pathname.replace(/^\//, '')
      && location.hostname === anchor.hostname;
    if (same) {
      // find if the anchor target actually exists
      const target = document.querySelector(anchor.hash);
      if (target != null) {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          // add the link to history so it can be copied from the top bar
          history.pushState(null, null, anchor.hash);
          // if scrolling DOWN on MOBILE then the top bar will hide if scrolling down so we can
          // disregard the bar height
          const isMobile = window.innerWidth < Breakpoint.TABLET;
          const scrollingDown = target.getBoundingClientRect().top > 0;
          const offset = isMobile && scrollingDown ? 0 : -HEADER_HEIGHT;
          const options = {...JUMP_OPTIONS, offset };
          jump(target, options);
          if (callback) {
            callback();
          }
          if (target instanceof HTMLElement) {
            target.focus();
          }
        });
    }
  }
}

export function initHashNavigation() {
  // initial jump to the hash
  if (location.hash && location.hash.length > 1) {
    // jump(document.querySelector(location.hash), {offset: -HEADER_HEIGHT, durat});
    const target = document.querySelector(location.hash) as HTMLElement;
    if (target) {
      jump(target, {...JUMP_OPTIONS, duration: 1});
    }
  }
  window.addEventListener('popstate', (e) => {
    e.preventDefault();
    const hash = window.location.hash;
    if (hash.length === 1) {
      // do not jump to '#' target, it is invalid
      return;
    }
    const target = document.querySelector(hash) as HTMLElement;
    if (target) {
      const isMobile = window.innerWidth < Breakpoint.TABLET;
      const scrollingDown = target.getBoundingClientRect().top > 0;
      const offset = isMobile && scrollingDown ? 0 : -HEADER_HEIGHT;
      jump(target, {...JUMP_OPTIONS, offset});
    }
  });
}
