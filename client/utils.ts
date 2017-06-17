let lastScrollPos = 0;
/**
 * Prevent scrolling of non-fixed elements in body.
 * @param prevent True to prevent, false to allow scrolling again
 */
export function preventScroll(prevent: boolean = true) {
  if (prevent) {
    lastScrollPos = document.body.scrollTop;
    document.body.style.top = `-${lastScrollPos}px`;
    document.body.classList.add('prevent-scroll');
  } else {
    document.body.classList.remove('prevent-scroll');
    requestAnimationFrame(() => document.body.scrollTop = lastScrollPos);
  }
}
