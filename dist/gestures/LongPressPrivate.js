import { __extends } from "tslib";
import { LongPress } from './LongPress';
var LongPressPrivate = /** @class */ (function (_super) {
    __extends(LongPressPrivate, _super);
    function LongPressPrivate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LongPressPrivate.prototype.onMouseDown = function (evt) {
        _super.prototype._onMouseDown.call(this, evt);
    };
    LongPressPrivate.prototype.onMouseUp = function () {
        _super.prototype._onMouseUp.call(this);
    };
    LongPressPrivate.prototype.onMouseMove = function (evt) {
        _super.prototype._onMouseMove.call(this, evt);
    };
    return LongPressPrivate;
}(LongPress));
export { LongPressPrivate };
