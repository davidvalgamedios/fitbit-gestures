interface MouseEvent {
  readonly screenX: number;
  readonly screenY: number;
  readonly defaultPrevented: boolean;
  readonly target: any;
  readonly type: string;

  preventDefault (): void;

  stopImmediatePropagation (): void;

  stopPropagation (): void;
}

export function wait (ms: number): Promise<void> {
  return new Promise((resolve) => {
    // @ts-ignore
    return setTimeout(resolve, ms)
  })
}

export function getMouseEvent (x: number, y: number): MouseEvent {
  return {
    screenX: x,
    screenY: y,
    defaultPrevented: false,
    target: null,
    type: 'MouseEvent',
    preventDefault: () => {
    },
    stopImmediatePropagation: () => {
    },
    stopPropagation: () => {
    }
  }
}

export function getFakeElement () {
  // @ts-ignore
  return <Element><unknown>{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onmousedown: (evt?: MouseEvent) => {
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onmousemove: (evt?: MouseEvent) => {
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onmouseup: (evt?: MouseEvent) => {
    }
  }
}
