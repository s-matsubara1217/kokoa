(function($) {


    // ★trimthumbnail
    if ($('.object-fit-img').length) {
        objectFitImages('.object-fit-img');
    }


    // iphone addClass
    if ( navigator.userAgent.indexOf('iPhone') > 0 ) {
        $("body").addClass("iPhone");
    };



    // ★appeal toggle
    var appealToggle = function() {
        var $acodionItem = $('.appeal_list_item'),
            $acodionTrigger = $acodionItem.find('.appeal_list_item_head'),
            $apealTriggerIco = $acodionItem .find('.toggle_ico'),
            $acodionTxt = $acodionItem.find('.appeal_list_item_detail'),
            speed = 400;

        $acodionTrigger.on('click' , function(){
            
            $(this).next().slideToggle('fast').end().children($apealTriggerIco).toggleClass('js-active');
            
//            var scrollAddPosition = 50,
//                n = window.location.href.slice(window.location.href.indexOf('?') + 4),
//                p = $(this).parent().offset().top;
//
//            $('html,body').animate({
//                scrollTop: p
//            }, speed );
//            return false;
        });

        $(window).on('load resize', function() {
            if( 'none' == $acodionTrigger.css('pointer-events') ){
                $acodionTxt.css('display','');
                $acodionTrigger.children($apealTriggerIco).removeClass('js-active');
            };
        });

        //spのopen closeのレイアウトをpcに引き継がせない
        var widthFlag = '';
        $(window).on('load resize', function () {
            wdToggle();
        });
        function wdToggle() {
            var windowWidth = $(window).width(),
//                bp = 768,
                bp = 834,
                $apealToggle = $('.appeal_list_item'),
                $apealToggleArea = $apealToggle.find('.appeal_list_item_detail');

						// 画面幅834以下でフラグがpcでない時
            if (windowWidth <= bp && widthFlag != 'pc') {
                widthFlag = 'pc';
                $apealToggleArea.hide();

							// 画面幅834以上でフラグがtabletでない時
            } else if (windowWidth > bp && widthFlag != 'tablet') {
                widthFlag = 'tablet';
                $apealToggleArea.show();
            }
        }
    }
    appealToggle();


    // ★text overflow toggle
    var overFlowText = function() {
        
        $('.job_post_slidedown').each(function() {
            
            var $textSlideDown = $(this),
                $slideDownText = $textSlideDown.find('.job_lead'),
                $slideDownTextHeight =$slideDownText.height(),
                textHeight = '100',
                maxHeight = ['70px' , '5000px'],
                speed = 400,
                insertHtml = '<div class="more_link_inner"><a class="more_link is_sp">もっと見る</a></div>';
            
            if($slideDownTextHeight > textHeight) {
                
                $slideDownText.css({ 'max-height' : maxHeight[0] });
                
                $textSlideDown.append(insertHtml);
                
                var $more_btn = $textSlideDown.find('.more_link');
                
                $more_btn.on('click', function(){
                    $(this).toggleClass('js-active').parent().prev().toggleClass('js-active');
                    
                    if($more_btn.hasClass('js-active')){
                        $slideDownText.css({ 'max-height' : maxHeight[1] });
                        $more_btn.text('閉じる');
                    }else{
                        $slideDownText.css({ 'max-height' : maxHeight[0] });
                        $more_btn.text('もっと見る');
                    }
                    
//                    var scrollAddPosition = 50,
//                        n = window.location.href.slice(window.location.href.indexOf('?') + 4),
//                        p = $textSlideDown.parent().offset().top;
//                    
//                    $('html,body').animate({
//                        scrollTop: p
//                    }, speed );
//                    return false;
                });
            }
            
        });
        
    }
//    overFlowText();

    var widthFlag = '';
    $(window).on('load resize', function () {
        overFlowSlide();
    });
    var overFlowSlide = function() {
        
        var windowWidth = $(window).width(),
            bp = 480;

        // 画面幅480以下でフラグがpcでない時
        if (windowWidth <= bp && widthFlag != 'pc') {
            widthFlag = 'pc';
            overFlowText();

            // 画面幅480以上でフラグがspでない時
        } else if (windowWidth > bp && widthFlag != 'sp') {
            widthFlag = 'sp';
            $('.job_lead').css({ 'max-height' : 'none' });
            $('.more_link_inner').remove();
        }
        
    }


    // ★求人条件検索
    var searchPanelToggle = function() {
        
        $('.search_panel').each(function (event) {
            
            var $searchPanel = $(this),
                $toggleArea = $('.search-toggle'),
                $toggleIco = $('.toggle_trigger'),
                $formMenu = $('.search_body'),
                speed = 400;

            $toggleArea.on('click', function(){
                $toggleArea.toggleClass('js-active');
                if($toggleArea.hasClass('js-active')){
                    $formMenu.slideDown(speed);
                }else{
                    $formMenu.slideUp(speed);
                }
            });
            // default open
//            $toggleArea.trigger('click');
        });
        
    }
    searchPanelToggle();


    // ★check済み項目のリセット
    var inputReset = function() {

        $(".resetbtn").bind("click", function(){
            $(this).closest('.custom-form_parts').find(':checked').prop('checked', false);
        });

    }
    inputReset();


})(jQuery);
