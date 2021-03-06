import { __extends } from "tslib";
import { FindElement } from '../helpers/dom.helper';
import { Swipe } from './Swipe';
var SwipeDetector = /** @class */ (function (_super) {
    __extends(SwipeDetector, _super);
    function SwipeDetector(element, cb, cfg) {
        var _this = _super.call(this, cb, cfg) || this;
        _this.element = FindElement(element);
        _this.element.onmousedown = _this._onMouseDown.bind(_this);
        _this.element.onmousemove = _this._onMouseMove.bind(_this);
        _this.element.onmouseup = _this._onMouseUp.bind(_this);
        return _this;
    }
    return SwipeDetector;
}(Swipe));
export { SwipeDetector };
