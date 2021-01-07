export declare enum SLIDE_EVENT {
    STARTED = "STARTED",
    MOVED = "MOVED",
    ENDED = "ENDED"
}
export interface SlideData {
    type: SLIDE_EVENT;
    x: MovementData;
    y: MovementData;
}
export interface MovementData {
    from: number;
    to: number;
}
export declare type SlideCallback = (data: SlideData) => any;
export declare class Slide {
    private readonly slideCallback;
    private startX;
    private lastX;
    private startY;
    private lastY;
    protected constructor(slideCallback: SlideCallback);
    protected _onMouseDown(evt: MouseEvent): void;
    protected _onMouseUp(evt: MouseEvent): void;
    protected _onMouseMove(evt: MouseEvent): void;
    private _generateEvent;
}
