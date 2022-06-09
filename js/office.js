/*-------------------------------
事業所紹介（詳細）
-------------------------------*/
//サムネイル
var sliderThumbnail = new Swiper('.slider-thumbnail', {
  slidesPerView: 6,
  spaceBetween: 15,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  speed: 800,
  direction: 'vertical',
  autoplay: {
		delay: 6000,
		disableOnInteraction: false,
	},
  breakpoints: {
    834: {
      slidesPerView: 4,
      spaceBetween: 10,
      direction: 'horizontal',
    }
  },
});

//スライダー
var slider = new Swiper('.slider', {
  spaceBetween: 32,
  speed: 800,
  autoplay: {
		delay: 6000,
		disableOnInteraction: false,
	},
  thumbs: {
    swiper: sliderThumbnail
  },
  breakpoints: {
    834: {
      spaceBetween: 24,
    }
  },
});


/*-------------------------------
	SPのみ画像順番入れ替え
-------------------------------*/
var mediaQueryList01 = window.matchMedia("(max-width:834px)");
var mediaQueryList02 = window.matchMedia("(min-width:835px)");

/* イベントリスナー */
var listener01 = function(event) {
  // リサイズ時に行う処理
	if (event.matches) {
		// 835px未満
		$('#Destination01').after($('#Target01'));
	}
};
var listener02 = function(event) {
  // リサイズ時に行う処理
	if (event.matches) {
		// 835px以上
		$('#BenchMark01').before($('#Target01'));
	}
};

/* リスナー登録 */
if (mediaQueryList01.addEventListener) {
	mediaQueryList01.addEventListener("change", listener01, false);
} else if (mediaQueryList01.attachEvent) {
	mediaQueryList01.attachEvent("change", listener01);
}

if (mediaQueryList02.addEventListener) {
	mediaQueryList02.addEventListener("change", listener02, false);
} else if (mediaQueryList02.attachEvent) {
	mediaQueryList02.attachEvent("change", listener02);
}

/* 初期化処理 */
listener01(mediaQueryList01);
listener02(mediaQueryList02);
