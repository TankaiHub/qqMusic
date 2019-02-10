(function ($, root) {
    var $Wrapper = $('.wrapper');
    // 图片
    function readerImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $Wrapper.find('.bg-box img').attr('src', src);
            root.blurImg(img, $('body'));
        }
    }

    //歌曲信息
    function readerInfo(info) {
        var str = '<div class="song-name">' + info.song + '</div>\
                   <div class="song-singer">'+ info.singer +'</div>\
                   <div class="song-album">' + info.album + '</div>';
        $Wrapper.find('.song-info').html(str);
    }

    root.reader = function (data) {
        readerImg(data.image);
        readerInfo(data);
    }

})(window.Zepto, window.player || (window.player = {}))