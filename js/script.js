(function ($) {
  /*-------------------------------
		objectFitImages
	-------------------------------*/
  objectFitImages('img.ofi');

  /*-------------------------------
		iPhone class
	-------------------------------*/
  if (navigator.userAgent.indexOf('iPhone') > 0) {
    $('body').addClass('iPhone');
  }

  /*-------------------------------
		aのクリックイベント
	-------------------------------*/
  $('a').on('click', function (e) {
    var str = this.getAttribute('href').substring(0, 1),
      $linktype = $(this).attr('target'),
      $call = this.getAttribute('href').substring(0, 3);

    if (str === '#') {
      //スムーズスクロールをさせる
      if (
        location.pathname.replace(/^\//, '') ===
          this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=' + this.hash.slice(1) + ']");
        if (target.length) {
          $('html,body').animate(
            {
              scrollTop: target.offset().top - $('header').innerHeight(),
            },
            700
          );
          return false;
        }
      }
    } else if ($linktype == '_blank' || $call == 'tel') {
      //何もしない
    }
  });

  /*-------------------------------
		固定ヘッダー
	-------------------------------*/
  var navElm = $('.header');
  var fixNav = navElm.clone().attr('class', 'header px-30 fixHeader');
  fixNav.appendTo('#container');
  //スクロールしたら出現
  $(window).on('load scroll', function () {
    var s_top = $(window).scrollTop();
    var navTop = navElm.offset().top;
    navTop = navTop + navElm.innerHeight();
    if (s_top > navTop) {
      $('.fixHeader').addClass('js-active');
    } else {
      $('.fixHeader').removeClass('js-active');
    }
  });

  /*-------------------------------
		フッターで止まるページトップ
	-------------------------------*/
  function PageTopAnime() {
    var pagetopPos = 0;
    if (window.innerWidth >= 835) {
      pagetopPos = 49;
    } else {
      pagetopPos = 39;
    }
    var scroll = $(window).scrollTop(); //スクロール値を取得
    var wH = window.innerHeight; //画面の高さを取得
    var footerPos = $('.footer').offset().top; //footerの位置を取得
    if (scroll + wH >= footerPos + pagetopPos) {
      var pos = scroll + wH - footerPos + pagetopPos; //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
      $('.pagetop').addClass('js-noFix'); //#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
    } else {
      //それ以外は
      $('.pagetop').removeClass('js-noFix');
    }
  }
  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function () {
    PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
  });
  // ページが読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function () {
    PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
  });

  /*-------------------------------
		ドロワーメニュー
	-------------------------------*/
  $header = $('.header');
  $toggleBtn = $('.d-btn');
  $toggleBtn.on('click', function () {
    if ($toggleBtn.hasClass('js-open')) {
      $('.d-menuOverlay').removeClass('js-open');
      $header.removeClass('js-open');
      $toggleBtn.removeClass('js-open');
    } else {
      $('.d-menuOverlay').addClass('js-open');
      $header.addClass('js-open');
      $toggleBtn.addClass('js-open');
    }
  });

  $('.d-menu').on('click', function (e) {
    e.stopPropagation();
  });
  $('.d-menuOverlay').on('click', function () {
    $('.d-menuOverlay').removeClass('js-open');
    $header.removeClass('js-open');
    $toggleBtn.removeClass('js-open');
  });

  /*-------------------------------
		アコーディオン
	-------------------------------*/
  $('.accTrigger').on('click', function () {
    if ($(this).hasClass('js-acc-active')) {
      $(this).siblings('.accTarget').slideUp(160).removeClass('js-acc-open');
      $(this).removeClass('js-acc-active');
    } else {
      $(this).siblings('.accTarget').slideDown(160).addClass('js-acc-open');
      $(this).addClass('js-acc-active');
    }
  });

  /*-------------------------------
		スクロール判定
	-------------------------------*/
  $(window).on('load scroll', function () {
    var s_top = $(window).scrollTop();
    if (s_top > 0) {
      $('body').addClass('js-scroll');
    } else {
      $('body').removeClass('js-scroll');
    }
  });

  /*-------------------------------
	ローディング
	-------------------------------*/
  function loading() {
    window.addEventListener("load", function () {
      let body = document.body;
      body.classList.add('page-loaded');
    });
  }
  loading();

  /*-------------------------------
  フォームのセレクトタグ初期スタイル
	-------------------------------*/
  if ($('.custom-form').length) {
    const Target = $('.is-empty');
    $(Target).on('change', function(){
      if ($(Target).val() !== ""){
        $(this).removeClass('is-empty');
      } else {
        $(this).addClass('is-empty');
      }
    });
  };

  /*-------------------------------
  ★index page only
  -------------------------------*/
  const frontPage = document.querySelector(".front-page");
  if (frontPage) {
    const is = [].slice.call(frontPage.querySelectorAll(".bg .img"));
    const ss = new Array();
    // imgタグからsrcを配列で保存
    is.forEach(function (e) {
      const i = e.querySelector("img");
      if (i) {
        const s = i.getAttribute('src');
        ss.push(s);
      }
    });
    // srcをランダムに並び替える
    is.forEach(function (_, n) {
      const m = Math.floor(Math.random() * (n + 1));
      let s = ss[n];
      ss[n] = ss[m];
      ss[m] = s;
    });
    // imgタグに並び替えたsrcで書き換える
    is.forEach(function (e, n) {
      const i = e.querySelector("img");
      i.setAttribute('src', ss[n]);
    });
  }


})(jQuery);

/*-------------------------------
 	スクロールアクション
 -------------------------------*/
function scrollAnime() {
  const animation = document.querySelectorAll('.anime');
  const animationArray = Array.prototype.slice.call(animation, 0);

  const options = {
    root: null,
    rootMargin: '-100px 0px -100px',
    threshold: 0,
  };
  const observer = new IntersectionObserver(doWhenIntersect, options);
  animationArray.forEach(function (animation) {
    observer.observe(animation);
  });

  function doWhenIntersect(entries) {
    const entriesArray = Array.prototype.slice.call(entries, 0);

    entriesArray.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('js-active');
      }
    });
  }
}
scrollAnime();

//ロード時、ウィンドウ内に入っている要素は強制的に表示
function loadActive() {
  $('.anime').each(function () {
    var targetAnime = $(this).offset().top;
    var windowHeight = $(window).height();
    if (targetAnime < windowHeight) {
      $(this).addClass('js-active');
    }
  });
}
loadActive();

/*-------------------------------
 	文字列を分割
 -------------------------------*/
function spanWrap(targetElm) {
  const targets = [].slice.call(document.querySelectorAll(targetElm));
  targets.forEach(function (target) {
    const nodes = [].slice.call(target.childNodes);
    let spanWrapText = '';

    nodes.forEach(function (node) {
      if (node.nodeType == 3) {
        //テキストの場合
        const text = node.textContent.replace(/\r?\n/g, ''); //テキストから改行コード削除
        //spanで囲んで連結
        spanWrapText =
          spanWrapText +
          text.split('').reduce(function (acc, v) {
            return acc + '<span>' + v + '</span>';
          }, '');
      } else {
        //テキスト以外
        //<br>などテキスト以外の要素をそのまま連結
        spanWrapText = spanWrapText + node.outerHTML;
      }
    });

    target.innerHTML = spanWrapText;
  });
}
spanWrap('.split');



/*-------------------------------
 	interview list page matchHeight
 -------------------------------*/
if ($('.lower-interview_l').length) {
  $('.js-matchHeight').matchHeight();
}
