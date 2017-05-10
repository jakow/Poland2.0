import {throttle, takeWhile} from 'lodash';

const lazyImages: LazyImage[] = [];
let scrollTriggeredQueue: LazyImage[];
let onScroll: (ev: UIEvent) => void;

class LazyImage {
  public readonly method: string;
  public readonly previewSrc: string;
  public readonly originalSrc: string;
  public readonly yPosition: number;
  private preview: HTMLImageElement;
  private original: HTMLImageElement;

  constructor(private container: HTMLElement) {
    this.method = this.container.dataset.method;
    this.preview = this.container.querySelector('img.preview') as HTMLImageElement;
    this.original = this.container.querySelector('img.original') as HTMLImageElement;
    if (this.preview === null || this.original === null) {
      throw new Error(`Container element ${container.tagName}.${container.className}` +
        `does not have the required children preview and original`);
    }
    this.previewSrc = this.preview.src;
    this.originalSrc = this.container.dataset.src;
    this.yPosition = this.container.getBoundingClientRect().top;
    this.showPreview();
    if (this.method === 'immediate') {
      this.showOriginal();
    }
 }

  public showPreview() {
    this.imgLoaded(this.previewSrc).then(() => {
      this.container.classList.add('preview-loaded');
    });
  }

  public async showOriginal() {
    await this.imgLoaded(this.originalSrc, this.original);
    this.container.classList.add('loaded');
  }
  /**
   * The Lazy Image module will automatically bootstrap images that exist in the document.
   * If images are added dynamically, then register() will add them to the 
   */
  public register() {
    //
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
  scrollTriggeredQueue = lazyImages.filter( (img) => img.method === 'scroll')
    .sort((a, b) => a.yPosition - b.yPosition); // sort ascending by Y position
  onScroll = throttle(showNextOnScroll, 400);
  document.addEventListener('scroll', onScroll);
  showNextOnScroll();
  return lazyImages;
}

/**
 * Handle showing of scroll-triggered LazyImages
 * @param ev The UI event that triggers the loading. Currently unused.
 */
function showNextOnScroll(ev?: UIEvent) {
  const threshold = window.scrollY + window.innerHeight;
  // because the array is sorted w.r.t. y position then we can just select the images
  // that are above the threshold and splice them from array;
  const toBeShown = takeWhile(scrollTriggeredQueue, (img) => img.yPosition < threshold);
  toBeShown.forEach((img) => img.showOriginal());
  // remove the shown images from the shown array
  scrollTriggeredQueue.splice(0, toBeShown.length);
}
