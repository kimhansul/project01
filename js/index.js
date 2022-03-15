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