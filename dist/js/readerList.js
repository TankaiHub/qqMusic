(function ($, root) {
    var $Wrapper = $('.wrapper');
    var $Div = $Wrapper.find(".list-box");
    var $Close = $Div.find('.close');
    var control;
    function reader(data) {
        var str = '';
        for (var prop in data) {
            str += '<li><span>' + data[prop].singer + '</span>\
                        <span>'+ data[prop].song + '</span></li>';             
        }
        $Div.find('ul').html(str);
        bindEvent();
    }

    function hiddenList(index) {
        control = index;
        $Div.addClass('show');
    }

    function picthOn(index) {
        $Div.find('ul li').removeClass('song');
        $Div.find('ul li').eq(index).addClass('song')
    }
    function bindEvent() {
        $Close.on('click', function () {
            $Div.removeClass('show');
        });
        $Div.find('ul').on('click', 'li', function () {
            var  index = $(this).index();
            control = index;
            picthOn(index);
            $('body').trigger('play:change', [index, true]);
            $('.wrapper').find('.handle-box .play').addClass('playing');
            $Div.removeClass('show');
        });
    }
    root.list = {
        reader: reader,
        hL: hiddenList,
    };
})(window.Zepto, window.player || (window.player = {}))