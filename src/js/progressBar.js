(function ($, root) {
    //渲染时间
    var $Wrapper = $('.wrapper');
    var duration;
    var startTime;
    var nowTime;
    var lastTime = 0;
    var frameId = null;

    //渲染总时间
    function renderAllTime(data) {
        duration = data.duration;
        $Wrapper.find('.endTime').html(renMinute(duration));
    }

    //返回分钟， 秒
    function renMinute(data) {
        data = Math.round(data);
        var t = Math.floor(data / 60);
        var s = data - (t * 60);
        return ('0' + t).slice(-2) + ':' + ('0' + s).slice(-2);
    }


    //渲染开始时间  进度条
    function proBar(pec) {
        if(pec == 0) {
            lastTime = 0;
        }
        $Wrapper.find('.bar-box .starTime').html(renMinute(duration * pec));
        var pro = (pec - 1) * 100 + '%';
        $Wrapper.find('.pro-wrap .pro-top').css({
            transform: 'translateX(' + pro + ')'
        });
    }

    //时间动画
    function renderStartTime(data) {
        lastTime = data == undefined ? lastTime : data;
        cancelAnimationFrame(frameId);
        startTime = +new Date();
        function frame() {
            nowTime = +new Date();
            var pec = lastTime + (nowTime - startTime) / (duration * 1000);
            if(pec < 1) {
                frameId = requestAnimationFrame(frame);
                proBar(pec);
            }else{
                cancelAnimationFrame(frameId);
                $Wrapper.find('.next').trigger('click');
            }
        }
        frame();
    }

    //点击停止  记录上一次的时间    
    function stop() {
        var stop = +new Date();
        lastTime = lastTime + (stop - startTime) / (duration * 1000);
        cancelAnimationFrame(frameId);
    }

    root.progress = {
        allTime: renderAllTime,
        startTime: renderStartTime,
        pro:proBar,
        stop : stop
    };
})(window.Zepto, window.player || (window.player = {}))