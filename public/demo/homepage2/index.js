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

var imgList = ['/public/demo/homepage2/assets/Profile_pic.jpg',
  '/public/demo/homepage2/assets/neon_1-min.png',
  '/public/demo/homepage2/assets/neon_2-min.png',
  '/public/demo/homepage2/assets/neon_2-min.png',
  '/public/demo/homepage2/assets/neon_3-min.png',
  '/public/demo/homepage2/assets/twit.png',
  '/public/demo/homepage2/assets/git.jpg',
  '/public/demo/homepage2/assets/insta.png',
  '/public/demo/homepage2/assets/linkd.png'
]
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
      setTimeout(() => {
        document.getElementsByClassName('loading_screen_div')[0].style.display = 'none';
        sk_ani();
        display_header();
        setTimeout(() => {
          activateScroll();
          document.getElementsByClassName('scrolling_msg')[0].style.display = 'block'
        }, 3000)
      }, 1000)
    }, 2500)
  }
}


// -------------- actual webpage code --------------




function sk_ani() {
  document.querySelector('.sk').querySelector('svg').style.opacity = '100%';
  //2.1seconds
  setTimeout(() => {
    document.querySelector('#blue_effect').style.opacity = '0%';
    setTimeout(() => {
      document.querySelector('#blue_effect').style.opacity = '100%';
      setTimeout(() => {
        document.querySelector('#blue_effect').style.opacity = '0%';
        setTimeout(() => {
          document.querySelector('#blue_effect').style.opacity = '100%';
          setTimeout(() => {
            document.querySelector('#blue_effect').style.opacity = '0%';
            setTimeout(() => {
              document.querySelector('#blue_effect').style.opacity = '100%';
              setTimeout(() => {
                document.querySelector('#blue_effect').style.opacity = '0%';
                setTimeout(() => {
                  document.querySelector('#blue_effect').style.opacity = '100%';
                  setTimeout(() => {
                    document.querySelector('#blue_effect').style.opacity = '0%';
                    setTimeout(() => {
                      document.querySelector('#blue_effect').style.opacity = '100%';

                    }, 100)
                  }, 100)
                }, 100)
              }, 200)
            }, 200)
          }, 200)
        }, 400)
      }, 400)
    }, 300)
  }, 100)
}


function display_header() {
  setTimeout(() => {
    document.querySelector('header').style.pointerEvents = 'auto';
    document.querySelector('header').style.opacity = '100%';
  }, 2200)

}

function activateScroll() {
  document.querySelector('.main').style.overflowY = 'scroll';
}

function listAni() {
  let li = document.querySelector('.list').querySelectorAll('li');
  li.forEach((ele) => {
    scroll = document.querySelector('.main').scrollTop;
    if (ele.offsetTop < scroll) {
      if (ele.classList.contains('right')) {
        ele.style.transform = 'translateX(-100%)';
      } else {
        ele.style.transform = 'translateX(0%)';
      }
    } else {
      if (ele.classList.contains('right')) {
        ele.style.transform = 'translateX(-75%)';
      } else {
        ele.style.transform = 'translateX(-25%)';
      }
    }
  })
}



document.querySelector('.my_card').style.top = window.innerHeight + document.querySelector('.list').clientHeight + 100 + 'px';
document.querySelector('.footer').style.top = window.innerHeight + document.querySelector('.list').clientHeight + document.querySelector('.my_card').clientHeight + 100 + 'px';

window.addEventListener('resize', () => {
  document.querySelector('.my_card').style.top = window.innerHeight + document.querySelector('.list').clientHeight + 100 + 'px';
  document.querySelector('.footer').style.top = window.innerHeight + document.querySelector('.list').clientHeight + document.querySelector('.my_card').clientHeight + 100 + 'px';
})
document.querySelector('.main').addEventListener('scroll', () => {
  listAni();
  document.getElementsByClassName('scrolling_msg')[0].style.display = 'none'
})