// ---------------Loading site code -------------

function animate_loading_logo() {
    let logo = document.getElementsByClassName('logo')[0]

    logo.style.marginBottom = '40px';
    setTimeout(() => {

        rot = rot == 360 ? 0 : 360;
        logo.style.transform = `rotateZ(${rot}deg)`;
        setTimeout(() => {

            logo.style.marginBottom = '0px'
        }, 500)
    }, 500)
}
let rot = 0;
animate_loading_logo();
setInterval(() => {
    animate_loading_logo();
}, 2000);
document.getElementsByClassName('loading_msg1')[0].style.display = 'block'
window.onload = () => {
    document.getElementsByClassName('loading_msg1')[0].style.display = 'none'
    document.getElementsByClassName('loading_msg2')[0].style.display = 'block'
}

//waiting for images to get loaded
// cloning all images then after all images are loaded
// run the rest
var img_cont = document.getElementById('test_images');

var imgList = ['/public/Homepage/assets/linkedin.png',
               '/public/Homepage/assets/github.png', 
               '/public/Homepage/assets/instagram.png', 
               '/public/Homepage/assets/twitter.png', 
               '/public/Homepage/assets/website.png', 
               '/public/Homepage/assets/photo_frame.png',
               '/public/Homepage/assets/linkedin_c.png',
               '/public/Homepage/assets/github_c.png',
               '/public/Homepage/assets/instagram_c.png',
               '/public/Homepage/assets/twitter_c.png',
               '/public/Homepage/assets/gmail.png',
               '/public/Homepage/assets/profile_frame_m.png',
               '/public/Homepage/assets/arrow.svg',
               '/public/Homepage/assets/sarvh.png',
               '/public/Homepage/assets/shaka.png',
               '/public/Homepage/assets/projects.png',
               '/public/Homepage/assets/service_t.svg',
               '/public/Homepage/assets/service_ad.png',
               '/public/Homepage/assets/service_b.png',
               '/public/Homepage/assets/service_fe.png',
               '/public/Homepage/assets/service_be.png',
               '/public/Homepage/assets/services_app.png']
for (var i = 0; i < imgList.length; i++) {
    var img = document.createElement('img');
    img.src = imgList[i];
    img.addEventListener('load', () => {
        CheckImageLoaded()
    });
    img_cont.appendChild(img);
}


var imgCount = imgList.length;
var imgloaded = 0;

function CheckImageLoaded() {
    imgloaded = imgloaded + 1;
    if (imgloaded == imgCount) {
        document.getElementsByClassName('loading_msg2')[0].style.display = 'none';
        document.getElementsByClassName('loading_welcome')[0].style.display = 'block';
        setTimeout(() => {
            document.getElementsByClassName('loading_screen_div')[0].style.opacity = '0';
            setTimeout(()=>{
                document.getElementsByClassName('loading_screen_div')[0].style.display = 'none';
                document.querySelector('header').style.opacity=1;
                document.querySelector('.profile').style.opacity=1;
            },1000)
        }, 2500)
    }
}


// -------------- actual webpage code --------------
// aroow functionality in experience section
// for small screens
function arrows() {
    var arrow_left = document.getElementsByClassName('arrow-left')[0]
    var arrow_right = document.getElementsByClassName('arrow-right')[0]
    var list = document.getElementById('experience_list');
    var translate = 0;
    list.style.transform = `translateX(${translate}%)`
    arrow_left.addEventListener('click', () => {

        if (translate == 0) {
            translate = 200;
            list.style.transform = `translateX(-${translate}%)`
        } else {
            translate = translate - 100;
            list.style.transform = `translateX(-${translate}%)`
        }
    });

    arrow_right.addEventListener('click', () => {

        if (translate == 200) {
            translate = 0;
            list.style.transform = `translateX(-${translate}%)`
        } else {
            translate = translate + 100;
            list.style.transform = `translateX(-${translate}%)`
        }
    })

    // for swiping effect

    list.addEventListener('touchstart', function (event) {
        handleTouchStart(event);
    }, false)
    list.addEventListener('touchmove', function (event) {
        handleTouchMove(event);
    }, false)


    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
        return evt.touches || // browser API
            evt.originalEvent.touches; // jQuery
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };
    let id = null;

    function handleTouchMove(evt, element) {
        if (!xDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            /*most significant*/
            if (xDiff > 0) {
                if (translate == 200) {
                    translate = 0;
                    list.style.transform = `translateX(-${translate}%)`
                } else {
                    translate = translate + 100;
                    list.style.transform = `translateX(-${translate}%)`
                }
            } else {
                if (translate == 0) {
                    translate = 200;
                    list.style.transform = `translateX(-${translate}%)`
                } else {
                    translate = translate - 100;
                    list.style.transform = `translateX(-${translate}%)`
                }
            }
        } else if (Math.abs(xDiff) < Math.abs(yDiff)) {
            evt.preventDefault();
        }

        /* reset values */
        xDown = null;
        yDown = null;
    };
}

arrows();



// site animation
let window_width = window.innerWidth;
function experience_ani(){
    if(window_width>=650){
        let info_divs=document.querySelectorAll('.info_div');
        let experience_list=document.querySelector('#experience_list')
        let experience_list_lis = experience_list.querySelectorAll('li')
        let word_div = document.querySelector('#work')
        let skills_list = document.getElementsByClassName('skills_list')[0]
        experience_list_lis.forEach((ele) =>{
            let top= ele.offsetTop + experience_list.offsetTop + word_div.offsetTop;
            if(top <= window.scrollY+window.innerHeight+50){
                ele.querySelector('.info_div').style.marginLeft='0px'
            } else{
                ele.querySelector('.info_div').style.marginLeft='-15%'
            }
        });
        let top= experience_list.offsetTop + word_div.offsetTop;
        if(top <= window.scrollY+window.innerHeight+50){
            skills_list.style.transform='translateX(0)'
        } else{
            skills_list.style.transform='translateX(-100%)'
        }
        
    }
}

function services_ani(){
    let work = document.getElementsByClassName('work')[0]
    let exp_services=document.getElementsByClassName('exp_services')[0]
    let services = document.getElementsByClassName('services')[0]
    let services_div=document.querySelectorAll('.services_1');
    
    if(window_width >=650){
        services_div.forEach((ele)=>{
            let ul = ele.querySelectorAll('li');
            ul.forEach((ele2)=>{
                let top = ele.offsetTop + services.offsetTop + exp_services.offsetTop + work.offsetTop;
                if(top <= window.scrollY+window.innerHeight){
                    ele2.style.marginTop='0px'
                } else{
                    ele2.style.marginTop='40%'
                }
            })
        })
    }
    else{
        services_div.forEach((ele)=>{
            let ul = ele.querySelectorAll('li');
            ul.forEach((ele2)=>{
                let top = ele2.offsetTop + ele.offsetTop + services.offsetTop + exp_services.offsetTop + work.offsetTop;
                if(top <= window.scrollY+window.innerHeight){
                    ele2.style.marginTop='0px'
                } else{
                    ele2.style.marginTop='40%'
                }
            })
        })
    }
}



window.addEventListener('scroll',()=>{
    experience_ani();
    services_ani();
})


window.addEventListener('resize',()=>{
    window_width = window.innerWidth;
})