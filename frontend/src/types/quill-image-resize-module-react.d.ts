declare module 'quill-image-resize-module-react' {
    import { Quill } from 'quill';
    interface ImageResizeOptions {
        modules?: string[];
        parchment?: any;
        // add other options if needed
    }
    export default class ImageResize {
        constructor(quill: Quill, options?: ImageResizeOptions);
    }
}
