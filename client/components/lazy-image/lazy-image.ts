import {throttle, takeWhile} from 'lodash';

const lazyImages: LazyImage[] = [];
let scrollTriggeredQueue: LazyImage[];
let onScroll: (ev: UIEvent) => void;

class LazyImage {
  public readonly method: string;
  public readonly previewSrc: string;
  public readonly originalSrc: string;
  // public readonly yPosition: number;
  private preview: HTMLImageElement;

  constructor(private container: HTMLElement) {
    this.method = this.container.dataset.method;
    this.preview = this.container.querySelector('img.preview') as HTMLImageElement;
    if (this.preview) {
      this.previewSrc = this.preview.src;
      this.showPreview();
    }
    this.originalSrc = this.container.dataset.src;
    // this.yPosition = this.container.offsetTop;
    if (this.method === 'immediate') {
      this.showOriginal();
    }
 }

 public get yPosition() {
   return this.container.offsetTop;
 }

  public showPreview() {
    this.imgLoaded(this.previewSrc).then(() => {
      this.container.classList.add('preview-loaded');
    });
  }

  public async showOriginal() {

    const img = await this.imgLoaded(this.originalSrc);
    img.classList.add('original');
    img.alt = this.container.dataset.alt;
    img.setAttribute('property', this.container.dataset.property);
    this.container.appendChild(img);
    // animate on next frame
    setTimeout(() => this.container.classList.add('loaded'), 1000 / 60);
  }
  /**
   * The Lazy Image module will automatically bootstrap images that exist in the document.
   * If images are added dynamically, then register() will add them to the queue
   */
  public register() {
    // TODO: implementation
    // TODO: Dynamically registered images should use a priority queue to maintain yPosition order efficiently
    throw new Error("not implemented");
  }

  private imgLoaded(src: string, element?: HTMLImageElement) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = typeof element === 'undefined' ? new Image() : element;
    // if network is dropped the promise never resolves.
    img.onload = (elem) => {
      img.onload = null;
      resolve(img);
    };
    img.src = src;
  });
}
}

export function init() {
  const containers: HTMLElement[] = Array.prototype.slice.call(document.querySelectorAll('.lazy-img'));
  for (const container of containers) { // tslint disable-line
    lazyImages.push(new LazyImage(container));
  }
  // sort ascending by Y position
  scrollTriggeredQueue = lazyImages.filter((img) => img.method === 'scroll').sort((a, b) => a.yPosition - b.yPosition);

  /* The scroll event is expensive because it always reads the current offsetTop of elements
  * rather than doing it once for each iamge. This is because dom elements may expand in which case
  * the images may not need to be loaded anymore. Because it is computationally heavy it is really
  * important that the event is throttled.
  */
  onScroll = throttle(showNextOnScroll, 500);
  window.addEventListener('scroll', onScroll, (supportsPassiveEvents() ? {passive: true} : undefined) as any);
  showNextOnScroll();
  return lazyImages;
}

/**
 * Detect passive events which never prevent default. Scrolling is smoother if scroll event is passive
 */
function supportsPassiveEvents() {
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: () => {
        supportsPassive = true;
      },
    });
    window.addEventListener("test", null, opts);
  } catch (e) {
    // pass
  }
  // console.info('Support for passive scroll handlers', supportsPassive);
  return supportsPassive;
}

/**
 * Handle showing of scroll-triggered LazyImages
 * @param ev The scroll event that triggers the loading.
 */
function showNextOnScroll(ev?: UIEvent) {
  const threshold = document.body.scrollTop + window.innerHeight;
  // because the array is sorted w.r.t. y position then we can just select the images
  // that are above the threshold and splice them from array;
  const toBeShown = takeWhile(scrollTriggeredQueue, (img) => img.yPosition < threshold);
  toBeShown.forEach((img) => img.showOriginal());
  // remove the shown images from the shown array
  scrollTriggeredQueue.splice(0, toBeShown.length);
  if (scrollTriggeredQueue.length === 0) {
    window.removeEventListener('scroll', onScroll);
  }
}
