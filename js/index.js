const mainMenu=document.querySelector('#header_nav');
const menuHeight=mainMenu.offsetHeight;
const bt=document.querySelector('#top_btn');

window.addEventListener('scroll',()=>{
    let scrollTop=window.scrollY;

    if(scrollTop>menuHeight){
        bt.classList.add('visible');
        mainMenu.classList.add('fixed');
    }
    else{
        bt.classList.remove('visible');
        mainMenu.classList.remove('fixed');
    }
},false);

bt.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(bt.getAttribute('href')).scrollIntoView({behavior:'smooth'});
});


const imgSlide=$('.img_slide_frame .info_img_slide li'), promoSlide=$('.img_slide_frame .promotion_img_slide li');
const imgCount=imgSlide.length, promoCount=promoSlide.length;
const prevBtn=$('.img_slide .img_slide_prev'), nextBtn=$('.img_slide .img_slide_next'), imgSlideStopBtn=$('.infoimg_slide_play_stop'), promoSlideStopBtn=$('.promoimg_slide_play_stop');
let current=0, promoslideCurrent=0;
const infoImgSlide=$('.category_info'), promoImgSlide=$('.category_promotion');

infoImgSlide.click(function(){
  var btnClassCheack=infoImgSlide.hasClass('categorybtn_active');
  if(btnClassCheack==false){
    promoImgSlide.removeClass('categorybtn_active');
    infoImgSlide.addClass('categorybtn_active');
    $('.promotion_img_slide').css('display','none');
    $('.promoimg_slide_page').css('display','none');
    $('.promoimg_slide_play_stop').css('display','none');
    if(promoSlideStopBtn.hasClass('active')){
      promoSlideStopBtn.removeClass('active');
      startTimer();
    }
    $('.info_img_slide').css('display','block');
    imgSlide.each(function(i){
      $(this).css('left',i*100+'%');
    });
    $('.infoimg_slide_page').css('display','block');
    $('.infoimg_slide_play_stop').css('display','block');

    current=0;
    imgSlideCounter(current,imgCount);
    return current;
  }
});
promoImgSlide.click(function(){
  var btnClassCheack=promoImgSlide.hasClass('categorybtn_active');
  if(btnClassCheack==false){
    infoImgSlide.removeClass('categorybtn_active');
    promoImgSlide.addClass('categorybtn_active');
    $('.info_img_slide').css('display','none');
    $('.infoimg_slide_page').css('display','none');
    $('.infoimg_slide_play_stop').css('display','none');
    if(imgSlideStopBtn.hasClass('active')){
      imgSlideStopBtn.removeClass('active');
      startTimer();
    }
    $('.promotion_img_slide').css('display','block');
    promoSlide.each(function(i){
      $(this).css('left',i*100+'%');
    });
    $('.promoimg_slide_page').css('display','block');
    $('.promoimg_slide_play_stop').css('display','block');

    promoslideCurrent=0;
    promoSlideCounter(promoslideCurrent,promoCount);
    return promoslideCurrent;
  }
});

let imgSlidePos=imgSlide.each(function(i){
  $(this).css('left',i*100+'%');
});
let promoSlidePos=promoSlide.each(function(i){
  $(this).css('left',i*100+'%');
});

function imgSlideCounter(num,length){
  $('.infoimg_slide_page').text(`${num+1} / ${length}`);
}
function promoSlideCounter(num,length){
  $('.promoimg_slide_page').text(`${num+1} / ${length}`);
}

function horzontalSlide(){
  var prev=imgSlide.eq(current);
  slideMove(prev,0,'-100%');
  current++;
  if(current==imgCount){
    current=0;
  }
  var next=imgSlide.eq(current);
  slideMove(next,'100%',0);
  imgSlideCounter(current,imgCount);

  var promprev=promoSlide.eq(promoslideCurrent);
  slideMove(promprev,0,'-100%');
  promoslideCurrent++;
  if(promoslideCurrent==promoCount){
    promoslideCurrent=0;
  }
  var promnext=promoSlide.eq(promoslideCurrent);
  slideMove(promnext,'100%',0);
  promoSlideCounter(promoslideCurrent,promoCount);
}

prevBtn.click(function(){
  var prev=imgSlide.eq(current);
  slideMove(prev,0,'100%');
  current--;
  if(current<0){
    current=imgCount-1;
  }
  var next=imgSlide.eq(current);
  slideMove(next,'-100%',0);
  imgSlideCounter(current,imgCount);

  var promprev=promoSlide.eq(promoslideCurrent);
  slideMove(promprev,0,'100%');
  promoslideCurrent--;
  if(promoslideCurrent<0){
    promoslideCurrent=promoCount-1;
  }
  var promnext=promoSlide.eq(promoslideCurrent);
  slideMove(promnext,'-100%',0);
  promoSlideCounter(promoslideCurrent,promoCount);

  prevBtn.prop('disabled',true);
  setTimeout(function(){
    prevBtn.prop('disabled',false);
  },500);
  return false;
});

nextBtn.click(function(){
  var prev=imgSlide.eq(current);
  slideMove(prev,0,'-100%');
  current++;
  if(current==imgCount){
    current=0;
  }
  var next=imgSlide.eq(current);
  slideMove(next,'100%',0);
  imgSlideCounter(current,imgCount);

  var promprev=promoSlide.eq(promoslideCurrent);
  slideMove(promprev,0,'-100%');
  promoslideCurrent++;
  if(promoslideCurrent==promoCount){
    promoslideCurrent=0;
  }
  var promnext=promoSlide.eq(promoslideCurrent);
  slideMove(promnext,'100%',0);
  promoSlideCounter(promoslideCurrent,promoCount);

  nextBtn.prop('disabled',true);
  setTimeout(function(){
    nextBtn.prop('disabled',false);
  },500);
  return false;
});

imgSlideStopBtn.click(function(){
  var stopclassCheck=imgSlideStopBtn.hasClass('active');
  if(stopclassCheck==false){
    imgSlideStopBtn.addClass('active');
    clearInterval(timer);
  }
  else{
    imgSlideStopBtn.removeClass('active');
    startTimer();
  }
});

promoSlideStopBtn.click(function(){
  var stopclassCheck=promoSlideStopBtn.hasClass('active');
  if(stopclassCheck==false){
    promoSlideStopBtn.addClass('active');
    clearInterval(timer);
  }
  else{
    promoSlideStopBtn.removeClass('active');
    startTimer();
  }
});

function slideMove(tg,start,end){
  tg.css('left',start).stop().animate({left:end},500);
}

prevBtn.hover(stopTimer,startTimer);
nextBtn.hover(stopTimer,startTimer);

function startTimer(){
  timer=setInterval(horzontalSlide,4000);
}
function stopTimer(){
  clearInterval(timer);
}
startTimer();


const bookmarkWrap=document.querySelector('.content1 .bookmark_wrap .bookmark_open');
const bookmarkBtn=document.querySelector('.bookmark_btn');
bookmarkBtn.addEventListener('click',function(){
  bookmarkWrap.classList.toggle('active');
  bookmarkBtn.classList.toggle('active');
});

var slickPage=$('.main_notice_pagecount>span');
$('.main_notice_content').each(function(i){
  $('.main_notice_content').eq(i).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    var j=(currentSlide ? currentSlide : 0) + 1;
    slickPage.eq(i).find('.present_page').text(`${j}`);
    slickPage.eq(i).find('.total_page').text(`${slick.slideCount-2}`);
  });
});

const noticeTabBtn=document.querySelectorAll('.main_notice_tab a'), noticeTabContent=document.querySelectorAll('.main_notice_contents>div');
for(i=0;i<noticeTabBtn.length;i++){
  noticeTabBtn[i].addEventListener('click',function(e){
    e.preventDefault();
    let tabTg=e.target.getAttribute('href');
    let tgt=tabTg.substr(14);
    noticeTabContent.forEach((i)=>{
      i.style.display='none';
      document.querySelector(tabTg).style.display='block'
      $('.main_notice_content').slick('setPosition');
    });
    noticeTabBtn.forEach((i)=>{
      i.classList.remove('tab_active');
      e.target.classList.add('tab_active');
    });
    slickPage.removeClass('active');
    slickPage.eq(tgt-1).addClass('active');
  });
  document.querySelector('#main_notice_01').style.display='block';
}
$('.main_notice_content').slick({
    autoplay: false,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
});

const tabBtn=document.querySelectorAll('.sns_btn_wrap button');
const tabContent=document.querySelectorAll('.sns_hanam>div');
for(i=0;i<tabBtn.length;i++){
  tabBtn[i].addEventListener('click',function(e){
    let tabTarget='.'+e.target.getAttribute('value');
    tabContent.forEach((i)=>{
      i.style.display='none';
      document.querySelector(tabTarget).style.display='block'
    });
    tabBtn.forEach((i)=>{
      i.classList.remove('snsbtn_active');
      e.target.classList.add('snsbtn_active');
    });
  });
  document.querySelector('.sns_hanam_contant_main').style.display='block';
}

const bannerSlide=$('.banner_box>div'), bannerPrevBtn=$('.banner_btn_top'), bannerNextBtn=$('.banner_btn_down'), bannerPauseBtn=$('.banner_btn_stop');
const slideCount=bannerSlide.length;
let currentIndex=0;
var setBannerInterval;
var autoFlag=true;

let bannerSlidePos=bannerSlide.each(function(i){
  $(this).css('bottom',i*100+'%');
});

function verticalSlide(){
  var prevSlide=bannerSlide.eq(currentIndex);
    move(prevSlide,0,'-100%');
    currentIndex++;
    if(currentIndex==slideCount){
      currentIndex=0;
    }
    var nextSlide=bannerSlide.eq(currentIndex);
    move(nextSlide,'100%',0);
}

function move(tg,start,end){
  tg.css('bottom',start).stop().animate({bottom:end},500);
}

bannerPrevBtn.click(function(){
  var prevSlide=bannerSlide.eq(currentIndex);
  move(prevSlide,0,'-100%');
  currentIndex--;
  if(currentIndex<0){
    currentIndex=slideCount-1;
  }
  var nextSlide=bannerSlide.eq(currentIndex);
  move(nextSlide,'100%',0);
  bannerPrevBtn.prop('disabled',true);
  setTimeout(function(){
    bannerPrevBtn.prop('disabled',false);
  },500);
  return false;
});
bannerNextBtn.click(function(){
  var prevSlide=bannerSlide.eq(currentIndex);
  move(prevSlide,0,'100%');
  currentIndex++;
  if(currentIndex==slideCount){
    currentIndex=0;
  }
  var nextSlide=bannerSlide.eq(currentIndex);
  move(nextSlide,'-100%',0);
  bannerNextBtn.prop('disabled',true);
  setTimeout(function(){
    bannerNextBtn.prop('disabled',false);
  },500);
  return false;
});

bannerPauseBtn.click(function(){
  var pauseclassCheck=bannerPauseBtn.hasClass('active');
  if(pauseclassCheck==false){
    bannerPauseBtn.addClass('active');
    clearInterval(setBannerInterval);
  }
  else{
    bannerPauseBtn.removeClass('active');
    bannerTimer();
  }
});

bannerPrevBtn.hover(function(){
  clearInterval(setBannerInterval);
},function(){
  bannerTimer();
});
bannerNextBtn.hover(function(){
  clearInterval(setBannerInterval);
},function(){
  bannerTimer();
});

function bannerTimer(){
  setBannerInterval=setInterval(verticalSlide,5000);
}
bannerTimer();