const mainMenu=document.querySelector('#header_nav');
const menuHeight=mainMenu.offsetHeight;

const imgSlide=$('.img_slide_frame .info_img_slide li');
const imgCount=imgSlide.length;
const prevBtn=$('.img_slide .img_slide_prev'), nextBtn=$('.img_slide .img_slide_next');
let current=0;

let imgSlidePos=imgSlide.each(function(i){
  $(this).css('left',i*100+'%');
});

function horzontalSlide(){
  var prev=imgSlide.eq(current);
  slideMove(prev,0,'-100%');
  current++;
  if(current==imgCount){
    current=0;
  }
  var next=imgSlide.eq(current);
  slideMove(next,'100%',0);
}

prevBtn.click(function(){
  var prev=imgSlide.eq(current);
  slideMove(prev,0,'100%');
  current++;
  if(current==imgCount){
    current=0;
  }
  var next=imgSlide.eq(current);
  slideMove(next,'-100%',0);
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
  nextBtn.prop('disabled',true);
  setTimeout(function(){
    nextBtn.prop('disabled',false);
  },500);
  return false;
});

function slideMove(tg,start,end){
  tg.css('left',start).stop().animate({left:end},500);
}

prevBtn.hover(stopTimer,startTimer);
nextBtn.hover(stopTimer,startTimer);

function startTimer(){
  timer=setInterval(horzontalSlide,5000);
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
var slickPage=$('.main_notice_pagecount');
$('.main_notice_content').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
  var i=(currentSlide ? currentSlide : 0) + 1;
  slickPage.text(`${i} / ${slick.slideCount-2}`);
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
  currentIndex++;
  if(currentIndex==slideCount){
    currentIndex=0;
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