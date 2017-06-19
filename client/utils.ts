/**
 * Prevent scrolling of non-fixed elements in body.
 * @param prevent True to prevent, false to allow scrolling again
 */
let lastScrollPos = 0;
export function preventScroll(prevent: boolean = true) {
  const siteContainer = document.querySelector('.site-container') as HTMLElement;
  if (prevent) {
    lastScrollPos = window.scrollY;
    siteContainer.style.top = `-${lastScrollPos}px`;
    siteContainer.classList.add('prevent-scroll');
  } else {
    siteContainer.classList.remove('prevent-scroll');
    window.scrollTo(0, lastScrollPos);
    setTimeout(() => window.scrollTo(0, lastScrollPos));
  }
}
