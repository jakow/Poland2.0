let lastScrollPos = 0;
/**
 * Prevent scrolling of non-fixed elements in body.
 * @param prevent True to prevent, false to allow scrolling again
 */
export function preventScroll(prevent: boolean = true) {
  if (prevent) {
    lastScrollPos = window.scrollY;
    document.body.style.top = `-${lastScrollPos}px`;
    document.body.classList.add('prevent-scroll');
  } else {
    document.body.classList.remove('prevent-scroll');
    window.scrollTo(0, lastScrollPos);
    setTimeout(() => window.scrollTo(0, lastScrollPos));
  }
}
