// Type definitions for headroom.js v0.7.0
// Project: http://wicky.nillia.ms/headroom.js/
// Definitions by: Jakub Olek <https://github.com/hakubo/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
declare module 'headroom.js' {
namespace Headroom {
	interface HeadroomOptions {
		offset?: number;
		tolerance?: any;
		classes?: {
			initial?: string;
			notBottom?: string;
			notTop?: string;
			pinned?: string;
			top?: string;
			unpinned?: string;
		};
		scroller?: Element;
		onPin?: () => void;
		onUnpin?: () => void;
		onTop?: () => void;
		onNotTop?: () => void;
		onNotBottom?: () => void;
		onBottom?: () => void;
	}
}

class Headroom {
	constructor(element: Node, options?: Headroom.HeadroomOptions);
	constructor(element: Element, options?: Headroom.HeadroomOptions);
	init: () => void;
}
export = Headroom;
}
