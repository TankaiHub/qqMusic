(function ($, root) {
    function Control(len) {
        this.index = 0;
        this.len = len;
    }
    Control.prototype = {
        prev: function () {
            if (this.index == 0) {
                this.index = this.len - 1;
            } else {
                this.index--;
            }
            return this.index;
        },
        next: function () {
            if (this.index == this.len - 1) {
                this.index = 0;
            } else {
                this.index++;
            }
            return this.index;
        }
    }

    root.control = Control;

})(window.Zepto, window.player || (window.player = {}))