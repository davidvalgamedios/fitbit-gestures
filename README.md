# Gestures for Fitbit

This library allows you to detect different gestures in Fitbit devices. Tested only on Fitbit SDK 5.0

## Installation

Install the library with `npm i fitbit-gestures` or `yarn add fitbit-gestures` 

## Available gestures

| Gesture | Description | Examples
| :---: | :--- |  ---  
| ![Tap gesture][tapGif] | Regular "click" | Buttons
| ![DoubleTap gesture][doubleTapGif] | Fast double "click" | Secondary actions
| ![LongPress gesture][longPressGif] | Press without release | Secondary actions
| ![Slide gesture][slideGif] | Press and move | Drag objects
| ![Swipe gesture][swipeGif] | Press move and release | Navigation


[tapGif]: ./demo/Tap.gif "Tap gesture"
[doubleTapGif]: ./demo/DoubleTap.gif "DoubleTap gesture"
[LongPressGif]: ./demo/LongPress.gif "LongPress gesture"
[slideGif]: ./demo/Slide.gif "Slide gesture"
[swipeGif]: ./demo/Swipe.gif "Swipe gesture"


## Usage

You must provide an [Element](https://dev.fitbit.com/build/reference/device-api/document/#interface-element) or the ID of an existing element.

The selected element should have "pointer-events" set to "visible". Will work only on elements which can have this attribute, like [RectElements](https://dev.fitbit.com/build/guides/user-interface/svg/#rectangles).

```xml
<svg>
  <rect id="detectorElement" pointer-events="visible" />
</svg>
```

> **Warning**
>
> Keep in mind that only one gesture listener can be attached to each element. Attaching multiple detectors to the same element will overwrite the previous ones. 


### Gesture Detector

All detectors are customizable. View configuration below.

```typescript
import { GestureDetector, GestureEvent } from 'fitbit-gestures';

// Get the element. You can also pass the element ID
const element = document.getElementById('detectorElement'); 

const detector = new GestureDetector(element)
    .onTap((event: GestureEvent) => {
      //Do something
    })
    .onDoubleTap((event: GestureEvent) => {
      //Do something
    })
    .onLongPress((event: GestureEvent) => {
      //Do something
    })
    .onSlide((event: GestureEvent) => {
      //Do something
    })
    .onSwipe((event: GestureEvent) => {
      //Do something
    });
```

### Events

All detectors will return a **GestureEvent** in the callback function

```typescript
interface GestureEvent {
  type: GestureType,
  point: Point,
  from?: Point,                   //Swipe & Slide only
  dir?: GestureDirection,         //Swipe only
  ended?: boolean                 //Slide only
}
```

##### Point
```typescript
interface Point {
  x: number,
  y: number
}
```

##### Types

```typescript
enum GestureType {
  Tap = 'Tap',
  DoubleTap = 'DoubleTap',
  LongPress = 'LongPress',
  Slide = 'Slide',
  Swipe = 'Swipe'
}
```

##### Directions (Swipe only)

```typescript
enum GestureDirection {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
  UpRight = 'UpRight',
  UpLeft = 'UpLeft',
  DownRight = 'DownRight',
  DownLeft = 'DownLeft',
}
```

### Single gesture detectors

If you only need one type of gesture on an element, it will be slightly faster to use a dedicated class. 

```typescript

//Optional configurations
const tapConfig: TapConfig = {
  interval: 250,
  threshold: 10
}
const doubleTapConfig: DoubleTapConfig = {
  interval: 250,
  threshold: 10
}
const longPressConfig: LongPressConfig = {
  time: 300,
  threshold: 10
}
const slideConfig: SlideConfig = {
  threshold: 10
}
const swipeConfig: SwipeConfig = {
  threshold: 100
}

const tap = new TapDetector('tapElement', onGesture.bind(this), tapConfig);
const doubleTap = new DoubleTapDetector('doubleTapElement', onGesture.bind(this), doubleTapConfig);
const longPress = new LongPressDetector('longPressElement', onGesture.bind(this));
const slide = new SlideDetector('slideElement', onGesture.bind(this), slideConfig);
const swipe = new SwipeDetector('swipeElement', onGesture.bind(this), swipeConfig);

function onGesture(event: GestureEvent) {
  if(event.type === GestureType.Swipe && event.dir === GestureDirection.Down) {
    //Do something
  } else if(event.type === GestureType.Slide) {
    //Do something
  }
}
```
##### Tap configuration

| Attribute | Description | Default |
| --- | :--- | --- |
| **interval** | Maximum time (in ms) between start touching and releasing | 250ms
| **threshold** | Maximum allowed distance (in px) between start touching and releasing | 10px

##### DoubleTap configuration

| Attribute | Description | Default |
| --- | :--- | --- |
| **interval** | Maximum time (in ms) between taps | 250ms
| **threshold** | Maximum allowed distance (in px) between taps | 10px

##### LongPress configuration

| Attribute | Description | Default |
| --- | :--- | --- |
| **time** | Minimum time (in ms) required to trigger the event | 300ms
| **threshold** | Max distance (in px) allowed | 10px

##### Slide configuration

| Attribute | Description | Default |
| --- | :--- | --- |
| **threshold** | Minimum distance (in pixels) to start recognizing | 10px

##### Swipe configuration

| Attribute | Description | Default |
| --- | :--- | --- |
| **threshold** | Minimum distance (in pixels) required to trigger the event | 100px
