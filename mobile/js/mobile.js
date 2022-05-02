var slickPage=$('.main_notice_pagecount>span');
$('.main_notice_content').each(function(i){
  $('.main_notice_content').eq(i).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    var j=(currentSlide ? currentSlide : 0) + 1;
    slickPage.eq(i).find('.present_page').text(`${j}`);
    slickPage.eq(i).find('.total_page').text(`${slick.slideCount-2}`);
  });
});

const infoSlide=$('.info_img_slide>li'), promoSlide=$('.promotion_img_slide>li'), infoSlideStop=$('.infoimg_slide_play_stop'), promoSlideStop=$('.promoimg_slide_play_stop');
let infoCurrent=0, mainSlideTimer;
infoSlide.each(function(i){
  infoSlide.eq(i).css('left', i*100+'%');
  if(i==infoSlide.length-1){
    infoSlide.eq(i).css('left', '-100%');
  }
});
function mainSlide(){
  let now=infoSlide.eq(infoCurrent);
  let prev=infoSlide.eq(infoCurrent-1);
  if(infoCurrent-1<0){
    let cheack=infoSlide.length+(infoCurrent-1);
    prev=infoSlide.eq(cheack);
  }
  moving(prev,'-100%','-200%');
  moving(now,0,'-100%');
  infoCurrent++;
  if(infoCurrent==infoSlide.length){
    infoCurrent=0;
  }
  let next=infoSlide.eq(infoCurrent);
  let forNext=infoSlide.eq(infoCurrent+1);
  if(infoCurrent+1==infoSlide.length){
    let cheack=0;
    forNext=infoSlide.eq(cheack);
  }
  moving(next,'100%',0);
  moving(forNext,'200%','100%');
  imgSlideCounter(infoCurrent,infoSlide.length);
}
function imgSlideCounter(num,length){
  $('.infoimg_slide_page').text(`${num+1} / ${length}`);
}
infoSlideStop.click(function(){
  var stopclassCheck=infoSlideStop.hasClass('active');
  if(stopclassCheck==false){
    infoSlideStop.addClass('active');
    clearInterval(mainSlideTimer);
  }
  else{
    infoSlideStop.removeClass('active');
    autoStart();
  }
});
function moving(tg,start,end){
  tg.css('left',start).stop().animate({left: end},500);
}
function autoStart(){
  mainSlideTimer=setInterval(mainSlide, 4000);
}
autoStart();

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

$('.main_notice_contents>div').slick({
    autoplay: false,
    arrows: false,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true,
    swipeToSlide: true,
    swipe: true,
    draggable: true
});

$('.bookmark_open').slick({
    autoplay: false,
    arrows: false,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4
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
$('.sns_hanam>div').slick({
  autoplay: false,
    arrows: false,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true
})