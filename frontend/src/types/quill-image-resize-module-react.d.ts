declare module 'quill-image-resize-module-react' {
    import { Quill } from 'quill';
    interface ImageResizeOptions {
        modules?: string[];
        parchment?: any;
    }
    export default class ImageResize {
        constructor(quill: Quill, options?: ImageResizeOptions);
    }
}
