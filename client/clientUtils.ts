import jump from 'jump.js';
/**
 * Prevent scrolling of non-fixed elements in body.
 * @param prevent True to prevent, false to allow scrolling again
 * deprecated: use overflow: auto;
 */
// let lastScrollPos = 0;
export function preventScroll(prevent: boolean = true) {
  // const container = document.querySelector('.site-container');
  // if (prevent) {
  //   container.classList.add('prevent-scroll');
  // } else {
  //   container.classList.remove('prevent-scroll');
  // }
}
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
          history.pushState(null, null, anchor.hash);
          jump(target, {...JUMP_OPTIONS});
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
  if (location.hash) {
    // jump(document.querySelector(location.hash), {offset: -HEADER_HEIGHT, durat});
    const target = document.querySelector(location.hash) as HTMLElement;
    if (target) {
      jump(target, {...JUMP_OPTIONS, duration: 1});
    }
  }
  window.addEventListener('popstate', (e) => {
  console.log('popstate', e);
  const target = document.querySelector(window.location.hash);
  if (target) {
    jump(target, JUMP_OPTIONS);
  }
});
}
