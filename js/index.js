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

const bt=document.querySelector('#top_btn');

window.addEventListener('scroll',()=>{
    let scrollTop=window.scrollY;

    if(scrollTop>100){
        bt.classList.add('visible')
    }
    else{
        bt.classList.remove('visible');
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