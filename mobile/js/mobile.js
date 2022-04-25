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