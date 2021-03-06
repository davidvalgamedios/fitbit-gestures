import { Point } from '../interfaces/point.interface'
import { GestureCallback } from '../interfaces/gesture-callback.interface'
import { GestureType } from '../enums/gesture-type.enum'
import { IsInsideThreshold } from '../helpers/point.helper'

export interface LongPressConfig {
  time?: number,
  threshold?: number
}

export abstract class LongPress {
  private readonly minTime: number
  private readonly threshold: number
  private initialPoint: Point | null
  private timeout: number = null
  private executed = false

  constructor (
    private readonly cb: GestureCallback,
    cfg?: LongPressConfig
  ) {
    this.minTime = cfg?.time || 300
    this.threshold = cfg?.threshold || 10
  }

  protected _onMouseDown (evt: MouseEvent) {
    this._init(evt)
  }

  protected _onMouseMove (evt: MouseEvent) {
    if (this.executed || !this.initialPoint) {
      return
    }
    if (
      !IsInsideThreshold(this.initialPoint, {
        x: evt.screenX,
        y: evt.screenY
      }, this.threshold)
    ) {
      this._reset()
      this.executed = true
    }
  }

  protected _onMouseUp () {
    this._reset()
  }

  private _init (evt: MouseEvent) {
    this._reset()
    this.timeout = setTimeout(this._execute.bind(this), this.minTime)
    this.initialPoint = {
      x: evt.screenX,
      y: evt.screenY
    }
  }

  private _reset () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.initialPoint = null
    this.executed = false
  }

  private _execute () {
    this.executed = true
    this.cb({
      type: GestureType.LongPress,
      point: this.initialPoint
    })
  }
}
