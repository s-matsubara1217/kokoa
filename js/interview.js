/*-------------------------------
  SPのみ画像順番入れ替え
-------------------------------*/
var mediaQueryList01 = window.matchMedia("(max-width:834px)");
var mediaQueryList02 = window.matchMedia("(min-width:835px)");
const ListItems = document.querySelectorAll('.interview__list__item');
const ListItemsArr = Array.prototype.slice.call(ListItems);

/* イベントリスナー */
var listener01 = function(event) {
  // リサイズ時に行う処理
  if (event.matches) {
    // 835px未満

    // インタビュー 画像
    ListItemsArr.forEach(function (ListItem) {
      const Target = ListItem.querySelector('.img-holder');
      const Destination = ListItem.querySelector('.term-holder')
      const ParentNode = ListItem.querySelector('.txt-holder');

      Destination.parentNode.insertBefore(Target, Destination.nextElementSibling);
    })

  }
};
var listener02 = function(event) {
  // リサイズ時に行う処理
  if (event.matches) {
    // 835px以上

    // インタビュー 画像
    ListItemsArr.forEach(function (ListItem) {
      const Target = ListItem.querySelector('.img-holder');
      const Destination = ListItem.querySelector('.term-holder')
      const ParentNode = ListItem.querySelector('.txt-holder');

      ParentNode.parentNode.insertBefore(Target, ParentNode);
    })

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
