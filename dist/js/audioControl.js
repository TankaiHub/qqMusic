(function ($, root) {
    function AudioManager() {
        //创建一个音频
        this.audio = new Audio();
        //默认状态
        this.status = 'pause';
    }
    AudioManager.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause'
        },
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        jumpToplay: function (time) {
            this.audio.currentTime = time;
            this.play();
        }
    }
    root.audio = new AudioManager();

})(window.Zepto, window.player || (window.player = {}))