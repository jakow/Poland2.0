import {throttle, takeWhile} from 'lodash';

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
      this.preview.classList.add('loaded');
    });
  }

  public async showOriginal() {
    const img = await this.imgLoaded(this.originalSrc, this.original);
    img.classList.add('loaded');
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

export let lazyImages: LazyImage[] = [];
export let scrollTriggeredImages: LazyImage[];

let onScroll: (ev: UIEvent) => void;
export function init() {
  const containers: HTMLElement[] = Array.prototype.slice.call(document.querySelectorAll('.lazy-img'));
  for (const container of containers) { // tslint disable-line
    lazyImages.push(new LazyImage(container));
  }
  scrollTriggeredImages = lazyImages.filter( (img) => img.method === 'scroll');
  scrollTriggeredImages.sort((a, b) => a.yPosition - b.yPosition);
  onScroll = throttle(showNext, 400);
  document.addEventListener('scroll', onScroll);
  showNext();
}

function showNext(ev?: UIEvent) {
  const threshold = window.scrollY + window.innerHeight;
  // because the array is sorted w.r.t. y position then we can just count the images
  // that are above the threshold and unshift them from array;
  const toBeShown = takeWhile(scrollTriggeredImages, (img) => img.yPosition < threshold);
  toBeShown.forEach((img) => img.showOriginal());
  // remove the shown images from the shown array
  scrollTriggeredImages.splice(0, toBeShown.length);
}
