
var root = window.player;
var timer = null;
var $Wrapper = $('.wrapper');
var dataList;
var len;
var control;
var reader = root.reader;
var audio = root.audio;;
var progress = root.progress;

getData('../mock/data.json');
function getData(url) {
    $.ajax({
        url: url,
        type: "GET",
        success: function (res) {
            console.log(res)
            dataList = res;
            len = dataList.length;
            root.reader(dataList[0]);
            audio.getAudio(dataList[0].audio);
            progress.allTime(dataList[0]);
            control = new root.control(len);
            root.list.reader(dataList);
            bindEvent();
            touchEvent();
        },
        error: function (e) {
            alert('error')
        }
    });
}


function bindEvent() {
    //操作框
    $('body').on('play:change', function (e, index, flag) {
        reader(dataList[index]);
        progress.allTime(dataList[index]);
        audio.getAudio(dataList[index].audio);
        if (audio.status == 'play' || flag) {
            progress.startTime(0);
            audio.play();
            rotated(0);
        } else {
            progress.pro(0);
            $Wrapper.find('.bg-box').attr('data-deg', 0);
            $Wrapper.find('.bg-box').css({
                transform: 'rotateZ(0deg)',
                transition: 'none'
            });
        }
    });
    $Wrapper.find('.handle-box').on('click', '.btn', function (e) {
        //isLike
        if ($(this).hasClass('like')) {
            $('.like').toggleClass('liking');
        }
        //上一曲
        if ($(this).hasClass('prev')) {
            var i = control.prev();
            $('body').trigger('play:change', i);
        }
        //开始 / 暂停
        if ($(this).hasClass('play')) {
            var deg = parseInt($Wrapper.find('.bg-box').attr('data-deg'));
            if (audio.status == 'play') {
                audio.pause();
                progress.stop();
                clearInterval(timer);
            } else {
                progress.startTime();
                audio.play();
                rotated(deg);
            }
            $(this).toggleClass('playing');
        }
        //下一曲
        if ($(this).hasClass('next')) {
            var i = control.prev();
            $('body').trigger('play:change', i);
        }
        //歌曲列表
        if ($(this).hasClass('list')) {
            root.list.hL(control);
        }
    });
}


function touchEvent() {
    var $ProWrap = $Wrapper.find('.pro-wrap');
    var l = $ProWrap.offset().left;
    var $Slide = $ProWrap.find('.slider');
    var w = $ProWrap.width();
    $Slide.on('touchstart', function (e) {
        progress.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if(per > 1 || per < 0) {
            per = 0;
        }
        progress.pro(per);

    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if(per > 1 || per < 0) {
            per = 0;
        }
        progress.pro(per);
        var time = dataList[control.index].duration * per;
        progress.startTime(per);
        audio.jumpToplay(time);
        $('.play').addClass('playing')
    });

}


// 旋转图片
function rotated(deg) {
    clearInterval(timer);
    timer = setInterval(function () {
        deg += 2;
        $('.bg-box').attr('data-deg', deg);
        $('.bg-box').css({
            transform: 'rotateZ(' + deg + 'deg)',
            transition: 'all 0.3s ease-out'
        });
    }, 100);
}





///       信息+ 图片渲染到页面上  render
//        点击按钮
//        音频的播放与暂停  切歌
//        进度条的运动与拖拽
//        图片旋转
//        列表切歌
