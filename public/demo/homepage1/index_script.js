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

var imgList = ['/public/demo/homepage1/assets/linkd.png',
  '/public/demo/homepage1/assets/twit.png',
  '/public/demo/homepage1/assets/git.jpg',
  '/public/demo/homepage1/assets/facebook.png',
  '/public/demo/homepage1/assets/insta.png',
  '/public/demo/homepage1/assets/Square_back.jpg',
  '/public/demo/homepage1/assets/square.jpg',
  '/public/demo/homepage1/assets/Milton-Berle.jpg',
  '/public/demo/homepage1/assets/Mahatma-Gandhi.jpg',
  '/public/demo/homepage1/assets/about_bg.jpg',
  '/public/demo/homepage1/assets/Client_bg.jpg',
  '/public/demo/homepage1/assets/project_bg.jpg',
  '/public/demo/homepage1/assets/blog.jpg',
  '/public/demo/homepage1/assets/about_bg.jpg',
  '/public/demo/homepage1/assets/Client_bg.jpg',
  '/public/demo/homepage1/assets/project_bg.jpg',
  '/public/demo/homepage1/assets/Profile_pic.jpg',
  '/public/demo/homepage1/assets/home_icon.png',
  '/public/demo/homepage1/assets/page_1_bg.jpg',
  '/public/demo/homepage1/assets/q1.png',
  '/public/demo/homepage1/assets/q2.png',
  '/public/demo/homepage1/assets/q3.png',
  '/public/demo/homepage1/assets/q4.png',
  '/public/demo/homepage1/assets/page_2_bg.jpg',
  '/public/demo/homepage1/assets/page_3_bg.jpg',
  '/public/demo/homepage1/assets/page_4_bg.jpg',
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
        animate();
      }, 1000)
    }, 2500)
  }
}


// -------------- actual webpage code --------------



//js for modfying top header menu starts here


// a function to change the appearence of menu on the basis
// of windows width. 
function modifying_menu() {

  let menu_items = document.querySelectorAll('.header_menu_items');
  let window_width = window.outerWidth;
  if (menu_items.length == 0) {
    menu_items = document.querySelectorAll('.header_menu_items_in');
  }
  // changes the appearence of the menu if the width is <900 and items in menu list
  // are greater than 4
  if (menu_items.length > 4 || window_width < 770) {

    // makes sure that when screen is resized the menu list icon is shown
    // not the close button.
    let menu_btn = document.querySelector('.on');
    if (menu_btn) {
      menu_btn.classList.remove('on');
    }
    let menu_img = document.querySelector(
      '.header_home_icon');
    if (menu_img) {
      menu_img.childNodes[1].style.display = 'none';
      menu_img.classList.remove('header_home_icon');
      menu_img.classList.add('header_menu_item_icon');
      menu_img.onclick = () => {
        toggling_displaying_menu();
      }
    }

    let menu_items = document.querySelectorAll('.header_menu_items');
    let menu = document.querySelector('.header_menu');
    if (menu_items) {
      menu_items.forEach((items) => {
        items.classList.remove('header_menu_items');
        items.classList.add('header_menu_items_in');
        items.style.display = 'none';
      })
    }
    if (menu) {
      menu.classList.remove('header_menu');
      menu.classList.add('header_menu_in');
    }
  }
  // In case the screen size is increased without reloading, and the width becomes >900
  // we need to make sure that the menu appearence is changed. This if handles that special case.
  else {
    let menu_img = document.querySelector(
      '.header_home_icon');

    if (!menu_img) {
      let menu_icon = document.querySelector(
        '.header_menu_item_icon');
      menu_icon.childNodes[1].style.display = 'inline-block';
      menu_icon.classList.add('header_home_icon');
      menu_icon.classList.remove('header_menu_item_icon');
    }

    let menu_items = document.querySelectorAll('.header_menu_items');
    let menu = document.querySelector('.header_menu');
    if (menu_items.length == 0) {
      menu_items = document.querySelectorAll('.header_menu_items_in');
      menu_items.forEach((items) => {
        items.classList.add('header_menu_items');
        items.classList.remove('header_menu_items_in');
        items.style.display = 'block';
      })
    }
    if (!menu) {
      menu = document.querySelector('.header_menu_in');
      menu.classList.add('header_menu');
      menu.classList.remove('header_menu_in');
    }
  }
}

// for displaying the menu on menu list button click and changing the 
// menu list icon to close icon and when the close icon is clicked changing
// the close icon to menu list icon and hiding the menus.
function toggling_displaying_menu() {
  let menu_btn = document.querySelector('.on');
  let menu_img = document.querySelector('.header_menu_item_icon');
  // toggling between menu icon and close icon
  if (menu_btn) {
    menu_btn.classList.remove('on');
  } else if (menu_img) {
    menu_img.classList.add('on')
  }
  // hiding menu items if visible and vice versa.
  let menu_list = document.querySelectorAll('.header_menu_in');
  let menu_items = document.querySelectorAll('.header_menu_items_in');
  if (menu_items.length != 0) {
    if (menu_items[0].style.display == 'none' || menu_items[0].style.display == '') {
      menu_list[0].style.zIndex = '4'
      menu_items.forEach((items) => {
        items.style.display = 'block';
      });
    } else {
      menu_list[0].style.zIndex = '1'
      menu_items.forEach((items) => {
        items.style.display = 'none';
      });
    }
  }
}

// showing menu based on screen width
modifying_menu();

//adding onclick event on menu icon incase the page is open in phone or tab.
let menu_icon = document.querySelector('.header_menu_item_icon');
if (menu_icon) {
  menu_icon.onclick = () => {
    toggling_displaying_menu();
  }
}



//-----------------------------------------
//js for modfying top header menu ends here
//-----------------------------------------


//-----------------------------------------
//js for Changing bg_images for PC and mobile starts here
//-----------------------------------------
function changing_bg() {
  let window_width = window.outerWidth;
  if (window_width <= 770) {

    document.querySelector('#first_page').childNodes[1].setAttribute('src', '/public/demo/homepage1/assets/page_1_bg_mobile.jpg');
    document.querySelector('#second_page').childNodes[1].setAttribute('src', '/public/demo/homepage1/assets/page_2_bg_mobile.jpg');
    document.querySelector('#third_page').childNodes[1].setAttribute('src', '/public/demo/homepage1/assets/page_3_bg_mobile.jpg');
    document.querySelector('#fourth_page').childNodes[1].setAttribute('src', '/public/demo/homepage1/assets/page_4_bg_mobile.jpg');
  } else {

    document.querySelector('#first_page').childNodes[1].setAttribute('src', '/public/demo/homepage1/assets/page_1_bg.jpg');
    document.querySelector('#second_page').childNodes[1].setAttribute('src', '/public/demo/homepage1/assets/page_2_bg.jpg');
    document.querySelector('#third_page').childNodes[1].setAttribute('src', '/public/demo/homepage1/assets/page_3_bg.jpg');
    document.querySelector('#fourth_page').childNodes[1].setAttribute('src', '/public/demo/homepage1/assets/page_4_bg.jpg');
  }
}

changing_bg();


//-----------------------------------------
//js for Changing bg_images for PC and mobile ends here
//-----------------------------------------

//-----------------------------------------
//js for menu swiping starts here
//-----------------------------------------

function position_height() {
  var top = document.getElementsByClassName('home_follow_circle')[0].offsetTop + document.getElementsByClassName('home_follow_circle')[0].offsetHeight;
  document.getElementsByClassName('swiper_container')[0].style.top = top;
}

function swiper(listener) {

  var no_ele = 8;
  var pos = 0;

  var swiper_container = document.querySelectorAll('.swiper_container');

  swiper_container.forEach((ele) => {
    ele.scrollLeft = ele.childNodes[5].offsetLeft - (ele.clientWidth * (25 / 100));
  });

  swiper_container.forEach((elem) => {
    elem.childNodes.forEach((ele) => {
      if (ele.classList != undefined) {
        if (ele.classList.contains('active')) {
          ele.classList.remove('active');
        }
      }
    });
  });

  swiper_container.forEach((ele) => {
    ele.childNodes[5].classList.add('active');
  })
  if (!listener) {
    swiper_container.forEach((ele) => {
      ele.addEventListener('touchstart', function (event) {
        handleTouchStart(event);
      }, false);
    });
    swiper_container.forEach((ele) => {
      ele.addEventListener('touchmove', function (event) {
        handleTouchMove(event, ele);
      }, false);
    });
  }
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

    swiper_container = element;
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        let i = 0;
        swiper_container.childNodes.forEach((ele) => {
          if (ele.classList != undefined) {
            if (ele.classList.contains('active')) {
              ele.classList.remove('active');
              pos = i;
            }
          }
          i = i + 1;
        });
        let scroll_left = swiper_container.childNodes[pos + 2].offsetLeft - (swiper_container.clientWidth * (25 / 100));

        if (scroll_left >= swiper_container.childNodes[(no_ele * 2) - 3].offsetLeft - (swiper_container.clientWidth * (25 / 100)) - 1) {
          swiper_container.scrollLeft = swiper_container.childNodes[(no_ele * 2) - ((no_ele * 2) - 3)].offsetLeft - (swiper_container.clientWidth * (25 / 100));
          swiper_container.childNodes[(no_ele * 2) - ((no_ele * 2) - 3)].classList.add('active');
          swiper_container.childNodes[(no_ele * 2) - ((no_ele * 2) - 3)].classList.remove('active');
          pos = (no_ele * 2) - ((no_ele * 2) - 3)
          scroll_left = swiper_container.childNodes[pos + 2].offsetLeft - (swiper_container.clientWidth * (25 / 100));
        }
        clearInterval(id);
        id = setInterval(frame, 0.05);

        function frame() {
          scroll_pos = swiper_container.scrollLeft;
          if (scroll_pos >= scroll_left) {
            clearInterval(id);
          } else {
            scroll_pos++;
            swiper_container.scrollLeft = scroll_pos;
          }
        }

        swiper_container.childNodes[pos + 2].classList.add('active');

        pos = 0;
      } else {
        let i = 0;
        swiper_container.childNodes.forEach((ele) => {
          if (ele.classList != undefined) {
            if (ele.classList.contains('active')) {
              ele.classList.remove('active');
              pos = i;
            }
          }
          i = i + 1;
        });

        let scroll_right = swiper_container.childNodes[pos - 2].offsetLeft - (swiper_container.clientWidth * (25 / 100));
        if (scroll_right <= swiper_container.childNodes[(no_ele * 2) - ((no_ele * 2) - 3)].offsetLeft - (swiper_container.clientWidth * (25 / 100)) - 1) {
          swiper_container.childNodes[(no_ele * 2) - 5].classList.add('active');
          swiper_container.scrollLeft = swiper_container.childNodes[(no_ele * 2) - 5].offsetLeft - (swiper_container.clientWidth * (25 / 100));
          swiper_container.childNodes[(no_ele * 2) - 5].classList.remove('active');
          pos = (no_ele * 2) - 5
          scroll_right = swiper_container.childNodes[pos - 2].offsetLeft - (swiper_container.clientWidth * (25 / 100));
        }
        clearInterval(id);
        id = setInterval(frame, 0.05);

        function frame() {

          scroll_pos = swiper_container.scrollLeft;
          if (scroll_pos <= scroll_right) {
            clearInterval(id);
          } else {
            scroll_pos--;
            swiper_container.scrollLeft = scroll_pos;
          }
        }


        swiper_container.childNodes[pos - 2].classList.add('active');

        pos = 0;
      }
    } else if (Math.abs(xDiff) < Math.abs(yDiff)) {
      evt.preventDefault();
    }

    /* reset values */
    xDown = null;
    yDown = null;
  };
}
let listener = false;
swiper(listener);
position_height();
listener = true;


//-----------------------------------------
//js for menu swiping ends here
//-----------------------------------------

//-----------------------------------------
//js for stats display starts here
//-----------------------------------------



function stats_display() {
  let stats_container = document.querySelectorAll('.stats_info')[0];
  let stats_top = stats_container.offsetTop;
  let stats_bottom = stats_container.offsetTop + stats_container.clientHeight;
  let scroll_view = window.scrollY + window.innerHeight;

  if (scroll_view >= stats_top + (window.innerHeight * (20 / 100)) && scroll_view <= stats_bottom + (window.innerHeight * (80 / 100))) {

    //displaying stats percentage div
    let bar_name = document.querySelectorAll('.bar_name');
    bar_name.forEach((ele) => {
      ele.style.opacity = '1';
    });

    function display_bar() {
      let bar_value = document.querySelectorAll('.bar_value');
      bar_value.forEach((ele) => {
        ele.style.width = '100%';
      });

      setTimeout(display_bar_value, 500);

      function display_bar_value() {
        bar_value.forEach((ele) => {
          ele.childNodes[1].style.transform = 'scaleX(1)';
        });
      }
    }
    setTimeout(display_bar, 500);


    document.querySelectorAll('.info_card_m').forEach((ele) => {
      ele.style.opacity = "1";
    });

    document.querySelectorAll('.info_card').forEach((ele) => {
      ele.style.opacity = "1";
    });

    document.querySelector('.a_me').childNodes[1].style.transform = 'translateX(-50%) translateY(-50%)';
    document.querySelector('.c_area').childNodes[1].style.transform = 'translateX(-50%) translateY(-50%)';
    document.querySelector('.projects').childNodes[1].style.transform = 'translateX(-50%) translateY(-50%)';
    document.querySelector('.blog').childNodes[1].style.transform = 'translateX(-50%) translateY(-50%)';

  } else if (scroll_view < stats_top + (window.innerHeight * (20 / 100)) || scroll_view > stats_bottom + (window.innerHeight * (80 / 100))) {
    let bar_name = document.querySelectorAll('.bar_name');
    bar_name.forEach((ele) => {
      ele.style.opacity = '0';
    });

    let bar_value = document.querySelectorAll('.bar_value');
    bar_value.forEach((ele) => {
      ele.style.width = '0';
    });

    bar_value.forEach((ele) => {
      ele.childNodes[1].style.transform = 'scaleX(0)';
    });


    document.querySelectorAll('.info_card_m').forEach((ele) => {
      ele.style.opacity = "0";
    });

    document.querySelectorAll('.info_card').forEach((ele) => {
      ele.style.opacity = "0";
    });

    document.querySelector('.a_me').childNodes[1].style.transform = 'translateX(0%) translateY(0%)';
    document.querySelector('.c_area').childNodes[1].style.transform = 'translateX(-120%) translateY(0%)';
    document.querySelector('.projects').childNodes[1].style.transform = 'translateX(0%) translateY(-80%)';
    document.querySelector('.blog').childNodes[1].style.transform = 'translateX(-120%) translateY(-80%)';
  }

  let display_scroll = window.scrollY
}
//-----------------------------------------
//js for stats display ends here
//-----------------------------------------




//-----------------------------------------
//js for front page Animation starts here
//-----------------------------------------


function animate() {
  window.scrollTo(0, 0);
  document.querySelector('.home_circle_container').style.opacity = '1';
  let blue_circle = document.querySelector('.blue_circle_container');
  blue_circle.style.top = '48%';
  blue_circle.style.left = '48%';

  setTimeout(() => {
    document.querySelector('.blue_circle').childNodes[1].style.opacity = '1';
    setTimeout(() => {
      let icons = document.querySelectorAll('.card_icon_container');
      let i = 150;
      icons.forEach((ele) => {
        let time = i + 200;
        setTimeout(() => {
          ele.style.opacity = '1';
        }, time);
        i = i + 150;
      });
      setTimeout(() => {
        if (document.querySelector('.header_menu')) {
          document.querySelector('.header_menu').style.opacity = '1';
        }
        document.querySelectorAll('.q_pos_m').forEach((ele) => {
          ele.style.opacity = '1';
        });
        setTimeout(() => {
          let q_cards = document.querySelector('.q_cards_container').childNodes;
          q_cards.forEach((ele) => {
            if (ele.classList != undefined) {

              setTimeout(() => {
                ele.style.opacity = '1';
              }, 150);

            }
          });
          document.querySelector('html').style.overflowY = 'scroll'
        }, 800)
      }, 800)
    }, 800)
  }, 1000)
}
//-----------------------------------------
//js for front page Animation ends here
//-----------------------------------------


function onscroll_change() {
  stats_display();
}

window.addEventListener('scroll', onscroll_change);

function changing_items() {
  modifying_menu();
  changing_bg();
  position_height();
  swiper(listener);
  if (document.querySelector('.header_menu')) {
    document.querySelector('.header_menu').style.opacity = '1';
  }
  // aligning_sk_h1();
}
window.addEventListener('resize', changing_items);