function callbackFunc(){
  return;
}

// 레이어 팝업
var idxLayPop = 0;
var popupOpen = false; //2022-03-10 추가(뒤로가기 관련)
function gfnOpenLayer(popupContent, _this){
  var settings = {
      position : 'fixed',
      width : '100%',
      minHeight : '100%',
      top : 0,
      bottom : 0,
      opacity : 0.5,
      y : 0,
      zIndex : 1000 + idxLayPop
  }

  popupContent = $(popupContent); //개발팀 추가 부분
  idxLayPop = idxLayPop + 1;
  TweenMax.set(popupContent, settings);
  popupContent.show();
  popupContent.attr('tabIndex' , -1).focus();

  TweenMax.to(popupContent, 0.2, {
      opacity : 1,
      y : 0,
      onComplete : function(){
          popupContent.find('.layerHeader h2').attr('tabIndex' , -1).focus();
          popupContent.css({ transform : 'initial' });

          return callbackFunc(); // callback
      }
  });

  $('body').addClass('openPop');
  popupContent.addClass('open');
  popupContent.attr('aria-hidden', false);
  popupContent.scrollTop(0);

  // 안드로이드 레이어팝업 인풋박스 포커스 이슈
  if(/Android/.test(navigator.appVersion)) {
     window.addEventListener("resize", function() {
       if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
         document.activeElement.scrollIntoView();
       }
    })
  }

  // 2025-09-08 추가 s */
  // 딤 영역 클릭시 닫힘
  popupContent.off("click.dimClick").on("click.dimClick", function (e) {
      if (e.target === this) {
          gfnCloseLayer(popupContent);
      }
  });

  popupContent.find(".layerPop", ".layerWrap").off("click.stopBubble").on("click.stopBubble", function (e) {
      e.stopPropagation();
  });
  // 2025-09-08 추가 e */


  // 레이어 닫기
  popupContent.find('.popClose, .js-PopClose').off('click.closeEvent').on('click.closeEvent', function(){
      $(this).closest(popupContent).hide().removeAttr('style');
      $(this).closest(popupContent).removeClass('open');
      $(this).closest(popupContent).attr('aria-hidden' , true)

      idxLayPop = idxLayPop - 1;

      if($('.layerDim').hasClass('open')){
          $('.layerDim').each(function(idx, obj){
              if($(obj).hasClass('open')){
                  if(idx >= 0){
                      $('body').addClass('openPop');
                  }else{
                      $('body').removeClass('openPop');
                  }
              }
          });
      }else{
          $('body').removeClass('openPop');
      }

      if(window.focusBtn){
          $(window).scrollTop($(window.focusBtn).offset().top - (window.innerHeight / 2));
          window.focusBtn.focus();
      }
      if($('.layerActive').length > 0){
          $(window).scrollTop($('.layerActive').offset().top - (window.innerHeight / 2));
          $('.layerActive').focus().removeClass('layerActive')
      }
  });

  //2022-03-10 추가(뒤로가기 관련)
  popupContent.find('.layerPop typeCont .js-PopClose').off('click.closeEvent').on('click.closeEvent', function(){
      window.history.back(); //
      $(this).closest(popupContent).hide().removeAttr('style');
      $(this).closest(popupContent).removeClass('open');
      $(this).closest(popupContent).attr('aria-hidden' , true)

      idxLayPop = idxLayPop - 1;

      if($('.layerDim').hasClass('open')){
          $('.layerDim').each(function(idx, obj){
              if($(obj).hasClass('open')){
                  if(idx >= 0){
                      $('body').addClass('openPop');
                  }else{
                      $('body').removeClass('openPop');
                  }
              }
          });
      }else{
          $('body').removeClass('openPop');
      }

      if(window.focusBtn){
          $(window).scrollTop($(window.focusBtn).offset().top - (window.innerHeight / 2));
          window.focusBtn.focus();
      }
      if($('.layerActive').length > 0){
          $(window).scrollTop($('.layerActive').offset().top - (window.innerHeight / 2));
          $('.layerActive').focus().removeClass('layerActive')
      }
  });
}

// 레이어 닫기
function gfnCloseLayer(popupContent){
  $(popupContent).hide().removeAttr('style');
  $(popupContent).removeClass('open');
  $(popupContent).attr('aria-hidden' , true);

  try{
      if(window.focusBtn){
          setTimeout(function(){
              $(window).scrollTop($(window.focusBtn).offset().top - (window.innerHeight / 2));
                      window.focusBtn.focus();
          }, 50)
      }
      if($('.layerActive').length > 0){
          setTimeout(function(){
              $(window).scrollTop($('.layerActive').offset().top - (window.innerHeight / 2));
              $('.layerActive').focus().removeClass('layerActive')
          }, 50)
      }
  }catch(e){}

  if($('.layerDim').hasClass('open')){
      $('.layerDim').each(function(idx, obj){
          if($(obj).hasClass('open')){
              if(idx >= 0){
                  $('body').addClass('openPop');
              }
              else{
                  $('body').removeClass('openPop');
              }
          }
      });
  }else{
      $('body').removeClass('openPop');
  }
}

// 스낵바
function snackBarFunc(elem) {
  const snackBar = typeof elem === 'string' ? document.querySelector(elem) : elem;

  if(!snackBar) return;
  snackBar.style.display = 'block';

  const elemFlag = snackBar.style.display === 'block';

  if(elemFlag) {
      setTimeout(() => {
          if(document.contains(snackBar)) {
              snackBar.style.display = 'none';
          }
      }, 2100);
  }
}
