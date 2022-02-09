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

var imgList = ['/public/About/assets/t_b_white-space.png',
  '/public/About/assets/space.png',
  '/public/About/assets/space.png',
  '/public/About/assets/space.png',
  '/public/About/assets/test.png',
  '/public/About/assets/sky.png'
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

      }, 1000)
    }, 2500)
  }
}


// -------------- actual webpage code --------------


// ----------------------------Global Variables-------------------------------------

let execute = true;

let height_room_bg = document.querySelector('.room_bg').clientHeight;
let right_room_bg = document.querySelector('.room_bg');
let style = getComputedStyle(right_room_bg);
const right_room_bg_style = style.right;


let room_recorded_height = 0;
// heights and tops of scroll divs .
let scroll_vals = [];

document.querySelectorAll('.scroll_divs').forEach((ele) => {
  scroll_vals.push({
    'top': ele.offsetTop,
    'height': ele.clientHeight
  });
});


// Widths of dialogues .
var widthsOfDialogue = [];
document.querySelectorAll('.dialogue').forEach((ele) => {
  widthsOfDialogue.push(ele.clientWidth);
});

document.querySelectorAll('.dialogue').forEach((ele) => {
  ele.style.width = '0px';
});

window.addEventListener('resize', () => {
  scroll_vals = [];
  document.querySelectorAll('.scroll_divs').forEach((ele) => {
    scroll_vals.push({
      'top': ele.offsetTop,
      'height': ele.clientHeight
    });
  });
  clearActive_bAndb_b();
  clearActives();

  widthsOfDialogue = [];
  document.querySelectorAll('.dialogue').forEach((ele) => {
    ele.style.width = 'max-content';
  });
  document.querySelectorAll('.dialogue').forEach((ele) => {
    widthsOfDialogue.push(ele.clientWidth);
  });
  resizeDialogues();

  //resetting room div width to auto or to room_div size
  document.querySelector('.room_bg').style.width = 'auto';
  let room_div = document.querySelector('.room');
  let room_svg = document.querySelector('.room_bg');
  if (room_div.clientWidth >= room_svg.clientWidth) {
    room_svg.style.width = room_div.clientWidth + 'px';
  }
});

var scroll = window.scrollY;

// ----------------------- defining some utils -------------------------------------

/**
 * @public
 * @description change the opacity of an element.
 * @param {string} name - class name or id of the element whose opacity is to be changed.
 * @param {Number} val - opacity value which is to be assigned to the element name passed.
 */
function opacityChange(name, val) {
  let ele = document.querySelector(name);
  ele.style.opacity = val;
}

/**
 * @public
 * @description change opacity of a specific element among a group of elements having same class name
 * @param {string} name - class name or id of an element which has more tha one instance 
 * @param {Number} pos  - index number of the element whose opacity is to be changed.
 * @param {Number} val  - value of the opacity which is to be assigned
 */
function opacityChanges(name, pos, val) {
  let ele = document.querySelectorAll(name)[pos];
  ele.style.opacity = val;
}

/**
 * @public
 * @description get the scroll position of a div as per the height percentage
 * @param {Number} top - top of the element  
 * @param {Number} height - height of the element
 * @param {Number} percentage - percentage value for which you need scroll position
 * @returns - the scroll height of the element at that particular percentage
 */
function getPositionHeight(top, height, percentage) {
  return top + (percentage / 100) * height;
}

/**
 * @public
 * @description - get Scroll height and Width per letter of the given element
 * @param {Number} height - height of the scroll for which the whole element is to be displayed
 * @param {Number} width  - width of the element
 * @returns - the scroll height per letter , the width per letter
 */
function scrollAndWidthPerLetter(height, width) {
  let ele = document.querySelector('.active');
  let len = String(ele.innerHTML).length;
  return [height / len, width / len];
}

/**
 * @public
 * @description Removes '.active' class name for all the elements
 */
function clearActives() {
  document.querySelectorAll('.dialogue').forEach((ele) => {
    if (ele.classList.contains('active')) {
      ele.classList.remove('active');
    }
  });
}

/**
 * @public
 * @description removes all the 'active_b' classes from the elements
 */
function clearActive_bAndb_b() {
  if (document.querySelector('.active_b')) {
    document.querySelectorAll('.active_b').forEach((ele) => {
      ele.classList.add('dialogue');
      ele.classList.remove('active_b');
    })
  }
  if (document.querySelector('.active_b_b')) {
    document.querySelectorAll('.active_b_b').forEach((ele) => {
      ele.classList.add('dialogue');
      ele.classList.remove('active_b_b');
    })
  }
}

/**
 * @public
 * @param {Number} scrollHeight - height value for which the whole element should be displayed 
 * @param {Number} scrollPerLetter - value of scroll per letter
 * @param {Number} widthPerLetter - value of width of a single letter
 * @returns - returns the width of the element to be displayed
 */
function displayingActive(scrollHeight, scrollPerLetter, widthPerLetter) {
  var current_scroll_height = scroll - scrollHeight;
  var no_of_letters_to_display = Math.floor(current_scroll_height / scrollPerLetter);
  var width_to_display = no_of_letters_to_display * widthPerLetter;
  return width_to_display;
}

/**
 * @public
 * @reset the widths of all the dialogues to 0
 */
function resizeDialogues() {
  document.querySelectorAll('.dialogue').forEach((ele => {
    ele.style.width = '0px';
  }));
}

/**
 * @public
 * @description adds 'active_b' class to element
 * @param {boolean} run - Whethere or not to add active_b classname 
 * @param {Number} d_num - index number of the element for which 'active_b" class is to be added
 */
function addingactive_b(d_num) {

  let dialogue_div = document.querySelectorAll('.dialogue')[d_num];
  if (d_num > 0) {
    document.querySelectorAll('.dialogue')[d_num - 1].classList.add('active_b_b');
    document.querySelectorAll('.dialogue')[d_num - 1].classList.remove('dialogue');
  }
  dialogue_div.classList.remove('dialogue');
  dialogue_div.classList.add('active_b');
  dialogue_div.classList.remove('active_b_b');
  dialogue_div.style.width = 'max-content';
  dialogue_div.style.opacity = '0.6';


}

/**
 * @public
 * @param {Number} d_num - index number of the dialogue element which is to be displayed as active 
 * @param {boolean} run - whether or not to add 'active_b' class name to element before 'active' element.
 * @param {Number} height_percent - percentage of height at which whole element is to be displayed 
 * @param {Number} scroll - variable of the scroll which should be taken as the starting point for display effect start
 * @param {Number} scroll_start_percent - percentage value which should be taken as the starting point for display effect
 */
function textScrollEffect(d_num, run, height_percent, scroll, scroll_start_percent) {
  clearActive_bAndb_b();
  clearActives();
  resizeDialogues();
  let active = document.querySelectorAll('.dialogue')[d_num];
  if (d_num > 0) {
    addingactive_b((d_num - 1));
  }

  active.classList.add('active');
  let width = widthsOfDialogue[d_num];
  active.style.opacity = '1'
  let height = (((height_percent - 5) / 100) * window.innerHeight);
  let [s_p_l, w_p_l] = scrollAndWidthPerLetter(height, width);
  active.style.width = String(displayingActive(getPositionHeight(scroll.top, scroll.height, scroll_start_percent), s_p_l, w_p_l)) + 'px';
}

/**
 * @public
 * @description displays the whole element whose index number is passed.
 * @param {Number} d_num - index number of the element which is to be displayed .
 */
function displayingFullWidth(d_num) {
  clearActive_bAndb_b();
  clearActives();
  resizeDialogues();
  let active = document.querySelectorAll('.dialogue')[d_num];
  active.classList.add('active');
  if (d_num > 0) {
    addingactive_b((d_num - 1));
  }
  let width = widthsOfDialogue[d_num];
  active.style.width = 'max-content';
}

/**
 * @public
 * @description - This function activates scroll effect for a dialogue if the scroll has reached 
 * the position where the specified d_num is to displayed. This function assums that the difference between starting
 * and ending points is less than 100.
 * @param {number} d_num - index number of the dialogue
 * @param {number} starting_point - starting percentage value for the text effect range {0-1000+}
 * @param {number} ending_point - Ending percentage value for the text effect range {0-1000+}
 * @param {number} wait_period - percentage of height to wait with full width before moving ahead.
 */
function setTextEffect(d_num, starting_point, ending_point, wait_period) {
  if (execute) {
    let scroll_val_s = scroll_vals[(Math.floor(starting_point / 100))];
    let scroll_val_e = scroll_vals[(Math.floor(ending_point / 100))];
    let scroll_to_use = {};
    let display_active_b = false;
    if (((ending_point % 100) - wait_period) >= 0) {
      scroll_to_use = scroll_val_e;
    } else {
      scroll_to_use = scroll_val_s;
    }
    if (d_num > 0) {
      display_active_b = true;
    }
    if (scroll <= getPositionHeight(scroll_to_use.top, scroll_to_use.height, (ending_point - wait_period) % 100) && scroll >= getPositionHeight(scroll_val_s.top, scroll_val_s.height, (starting_point % 100))) {
      execute = false;
      textScrollEffect(d_num, display_active_b, ((ending_point - wait_period) - starting_point), scroll_val_s, (starting_point % 100));
    } else if (scroll <= getPositionHeight(scroll_val_e.top, scroll_val_e.height, ending_point % 100) && scroll >= getPositionHeight(scroll_to_use.top, scroll_to_use.height, (ending_point - wait_period) % 100)) {
      execute = false;
      displayingFullWidth(d_num);
    }
  }
}

/**
 * @public
 * @description - Toggle between up and down scroll animation
 * @param {String} id - id the element to animate
 * @param {number} scroll_pos - position of scroll at which the animation should start.
 */
function toggleGifScroll(id, scroll_pos) {
  if (scroll > getPositionHeight(scroll_vals[Math.floor(scroll_pos / 100)].top, scroll_vals[Math.floor(scroll_pos / 100)].height, scroll_pos % 100)) {
    setTimeout(() => {
      document.getElementById(id).setAttribute('y', 530);
    }, 500);
    document.getElementById(id).animate({
      'y': 530
    }, {
      direction: 'normal',
      duration: 510,
      easing: 'ease'
    });
  } else {
    setTimeout(() => {
      document.getElementById(id).setAttribute('y', 446);
    }, 500);
    document.getElementById(id).animate({
      'y': 446
    }, {
      direction: 'normal',
      duration: 510,
      easing: 'ease'
    });
  }

}
// -------------------- Manupulating scroll starts here -----------------------------------

// js for warning div starts here
function warning_div() {
  document.querySelector('.ground').style.opacity = '0';
  if (document.querySelector('.space')) {
    document.querySelector('.space').style.top = '0%';
  } else if (document.querySelector('.space_fixed')) {
    document.querySelector('.space_fixed').classList.add('space');
    document.querySelector('.space_fixed').style.setProperty('top', '0px');
    document.querySelector('.space_fixed').style.setProperty('left', '0%');
    document.querySelector('.space_fixed').classList.remove('space_fixed');
  }
  document.querySelector('.sky').style.top = 150 + '%';
  document.querySelector('.room').style.top = 160 + '%';
  document.querySelector('.ground').style.top = 100 + '%';
  if (scroll >= getPositionHeight(scroll_vals[0].top, scroll_vals[0].height, 10)) {
    opacityChanges('.warning_h3', 0, 1);
  } else if (scroll <= getPositionHeight(scroll_vals[0].top, scroll_vals[0].height, 10)) {
    opacityChanges('.warning_h3', 0, 0);
  }

  if (scroll >= getPositionHeight(scroll_vals[0].top, scroll_vals[0].height, 20)) {
    opacityChanges('.warning_h3', 1, 1);
  } else if (scroll <= getPositionHeight(scroll_vals[0].top, scroll_vals[0].height, 20)) {
    opacityChanges('.warning_h3', 1, 0);
  }
  if (scroll >= getPositionHeight(scroll_vals[0].top, scroll_vals[0].height, 30)) {
    opacityChanges('.warning_h3', 2, 1);
  } else if (scroll <= getPositionHeight(scroll_vals[0].top, scroll_vals[0].height, 30)) {
    opacityChanges('.warning_h3', 2, 0);
  }
}

// js for cntrolling space divs
function space_div() {
  document.querySelector('.sky').style.top = 150 + '%';
  document.querySelector('.room').style.top = 160 + '%';
  document.querySelector('.ground').style.top = 100 + '%';
  if (document.querySelector('.space')) {
    var space_div = document.querySelector('.space');
  } else {
    var space_div = document.querySelector('.space_fixed');
  }
  if (scroll >= getPositionHeight(scroll_vals[1].top, scroll_vals[1].height, 75)) {
    space_div.classList.remove('space');
    space_div.classList.add('space_fixed');
  }
  if (scroll >= getPositionHeight(scroll_vals[1].top, scroll_vals[1].height, 75) && scroll <= getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 50)) {
    space_div.classList.remove('space');
    space_div.style.setProperty('top', '0%');
    space_div.classList.add('space_fixed');
  } else if (scroll < getPositionHeight(scroll_vals[1].top, scroll_vals[1].height, 75)) {
    space_div.classList.add('space');
    space_div.style.setProperty('top', '0px');
    space_div.classList.remove('space_fixed');
  }

  if (scroll >= getPositionHeight(scroll_vals[1].top, scroll_vals[1].height, 79) && scroll <= getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 0)) {

    let leftPerScroll = 50 / ((111 / 100) * window.innerHeight);
    let scroll_val = scroll - getPositionHeight(scroll_vals[1].top, scroll_vals[1].height, 89);
    let top = leftPerScroll * scroll_val;
    if (document.querySelector('.space_fixed')) {
      document.querySelector('.space_fixed').style.left = '-' + String((Math.ceil(top))) + '%';
    }

  }
  if (scroll >= getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 0)) {
    space_div.style.left = '-50%';
  }
}
// For Computers and laptops
function space_room_t() {
  document.querySelector('.ground').style.top = 100 + '%';
  document.querySelector('.ground').style.opacity = '1';
  if (scroll <= getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 10)) {
    if (document.querySelector('.space_fixed')) {
      document.querySelector('.space_fixed').style.setProperty('top', '0%');
    }

    document.querySelector('.sky').style.top = '150%';
    document.querySelector('.room').style.top = '160%';
  }
  if (scroll <= getPositionHeight(scroll_vals[4].top, scroll_vals[4].height, 60) && scroll >= getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 10)) {
    let topPerScroll = 160 / ((140 / 100) * window.innerHeight);
    let scroll_val = scroll - getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 10);
    let top = topPerScroll * scroll_val;
    document.querySelector('.space_fixed').style.setProperty('top', '-' + String((Math.ceil(top))) + '%');
    if (String(110 - (Math.ceil(top))) > -50) {
      document.querySelector('.sky').style.top = String(110 - (Math.ceil(top))) + '%';
    }
    if (String(160 - (Math.ceil(top))) > 0) {
      document.querySelector('.room').style.top = String(160 - (Math.ceil(top))) + '%';
    }

  }
  if (scroll >= getPositionHeight(scroll_vals[4].top, scroll_vals[4].height, 60)) {
    document.querySelector('.room').style.top = '0%';
    ground_div.style.top = '100%';
  }
}

// For Mobile and Tabs
function space_room_t_sc() {
  document.querySelector('.ground').style.top = 100 + '%';
  document.querySelector('.ground').style.opacity = '1';
  if (scroll <= getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 10)) {
    if (document.querySelector('.space_fixed')) {
      document.querySelector('.space_fixed').style.setProperty('top', '0%');
    }

    document.querySelector('.sky').style.top = '150%';
    document.querySelector('.room').style.top = '160%';
  }
  if (scroll <= getPositionHeight(scroll_vals[6].top, scroll_vals[6].height, 50) && scroll >= getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 10)) {
    let topPerScroll = 160 / ((340 / 100) * window.innerHeight);
    let scroll_val = scroll - getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 10);
    let top = topPerScroll * scroll_val;
    if (document.querySelector('.space_fixed')) {
      document.querySelector('.space_fixed').style.setProperty('top', '-' + String((Math.ceil(top))) + '%');
    }
    if (String(110 - (Math.ceil(top))) > -50) {
      document.querySelector('.sky').style.top = String(110 - (Math.ceil(top))) + '%';
    }
    if (String(160 - (Math.ceil(top))) > 0) {
      document.querySelector('.room').style.top = String(160 - (Math.ceil(top))) + '%';
    }

  }
  if (scroll >= getPositionHeight(scroll_vals[6].top, scroll_vals[6].height, 60)) {
    document.querySelector('.room').style.top = '0%';
    ground_div.style.top = '100%';
  }
}

//js for fitting room screen
let room_div = document.querySelector('.room');
let ground_div = document.querySelector('.ground');
let room_svg = document.querySelector('.room_bg');
if (room_div.clientWidth >= room_svg.clientWidth) {
  room_svg.style.width = room_div.clientWidth + 'px';
}

// for computers and laptops
function roomAnimate() {

  document.querySelector('.ground').style.opacity = '1';

  document.querySelector('.room').style.top = '0%';
  document.querySelector('.sky').style.top = '-50%';
  document.querySelector('.sky').style.top = '-120%';
  toggleGifScroll('unity_gif', 480);
  toggleGifScroll('maya_gif', 505);
  toggleGifScroll('website_gif', 530);
  toggleGifScroll('android_gif', 560);
  toggleGifScroll('p_t_gif', 590);
  toggleGifScroll('code_gif', 710);
  let room_bg = document.querySelector('.room_bg');

  //zooming out the room
  let height_room_per_width = room_bg.clientHeight / room_bg.clientWidth;
  let min_height = height_room_per_width * window.innerWidth;


  if (scroll < getPositionHeight(scroll_vals[7].top, scroll_vals[7].height, 70)) {
    room_bg.style.height = height_room_bg + 'px';
    room_bg.style.top = '-20%';
    room_bg.style.width = 'auto';
  }
  if (scroll > getPositionHeight(scroll_vals[7].top, scroll_vals[7].height, 70) && scroll <= getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 30)) {
    let height_per_scroll = (height_room_bg - window.innerHeight) / ((60 / 100) * window.innerHeight);
    let top_per_scroll = ((20 / 100) * (window.innerHeight)) / ((60 / 100) * window.innerHeight);
    let height_val = height_per_scroll * (scroll - getPositionHeight(scroll_vals[7].top, scroll_vals[7].height, 70));
    let top_val = top_per_scroll * (scroll - getPositionHeight(scroll_vals[7].top, scroll_vals[7].height, 70));
    if (height_room_bg - height_val > min_height) {
      room_bg.style.height = (height_room_bg - height_val) + 'px';
      room_bg.style.top = top_val - ((20 / 100) * (window.innerHeight));
    }

  }
  if (scroll > getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 30)) {
    if (window.innerHeight > window.innerWidth) {
      room_bg.style.top = '0px';
      room_bg.style.height = '100%';
    } else {
      let height_per_scroll = (height_room_bg - window.innerHeight) / ((60 / 100) * window.innerHeight);
      let top_per_scroll = ((20 / 100) * (window.innerHeight)) / ((60 / 100) * window.innerHeight);
      let height_val = height_room_bg - min_height;
      let scroll_value = height_val / height_per_scroll;
      let top_value = top_per_scroll * scroll_value;
      if (top_value - ((20 / 100) * (window.innerHeight)) < 0) {
        room_bg.style.top = top_value - ((20 / 100) * (window.innerHeight));
      } else if (top_value - ((20 / 100) * (window.innerHeight)) >= 0) {
        room_bg.style.top = '0px';
      }

      if (min_height < window.innerHeight) {
        room_bg.style.height = window.innerHeight;
      } else {
        room_bg.style.height = min_height;
      }
    }
  }

  if (scroll < getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 30)) {
    room_bg.style.right = right_room_bg_style;
  }
  if (scroll > getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 30) && scroll < getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 90)) {
    let remaining_width = room_bg.clientWidth - window.innerWidth + parseInt(right_room_bg_style);
    let right_per_scroll = remaining_width / ((60 / 100) * window.innerHeight);
    room_bg.style.right = parseInt(right_room_bg_style) - right_per_scroll * (scroll - getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 30)) + 'px';
  }
  if (scroll > getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 90)) {
    let remaining_width = room_bg.clientWidth - window.innerWidth + parseInt(right_room_bg_style);
    let right_per_scroll = remaining_width / ((60 / 100) * window.innerHeight);
    room_bg.style.right = parseInt(right_room_bg_style) - right_per_scroll * ((60 / 100) * window.innerHeight) + 'px';

  }
  if (scroll < getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 90)) {
    // room_div.style.top='0%';
    ground_div.style.top = '100%'
  }
  if (scroll < getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 90) && scroll > getPositionHeight(scroll_vals[4].top, scroll_vals[4].height, 60)) {
    room_div.style.top = '0%';
    // document.querySelector('.room_bg').style.top='0';
    ground_div.style.top = '100%';
  }
  if (scroll > getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 90) && scroll < getPositionHeight(scroll_vals[11].top, scroll_vals[11].height, 0)) {
    document.querySelector('.ground').style.opacity = '1';
    let top_per_scroll = 100 / ((210 / 100) * window.innerHeight);
    let top_val = top_per_scroll * (scroll - getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 90));
    room_div.style.top = '-' + top_val + '%';
    ground_div.style.top = (100 - top_val) + '%';

  }
  if (scroll > getPositionHeight(scroll_vals[11].top, scroll_vals[11].height, 0)) {
    room_div.style.top = '-100%';
    document.querySelector('.ground').style.opacity = '1';
    ground_div.style.top = '0%';
  }
  if (document.querySelector('.space')) {
    var space_div = document.querySelector('.space');
  } else {
    var space_div = document.querySelector('.space_fixed');
  }
  if (scroll >= getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 0)) {
    space_div.style.setProperty('top', '150%');
    space_div.style.left = '-50%';
  }

}

//for mobile and tabs
function roomAnimate_sc() {

  document.querySelector('.ground').style.opacity = '1';

  document.querySelector('.room').style.top = '0%';
  document.querySelector('.sky').style.top = '-50%';
  document.querySelector('.sky').style.top = '-120%';
  toggleGifScroll('unity_gif', 650);
  toggleGifScroll('maya_gif', 675);
  toggleGifScroll('website_gif', 700);
  toggleGifScroll('android_gif', 730);
  toggleGifScroll('p_t_gif', 760);
  toggleGifScroll('code_gif', 780);
  let room_bg = document.querySelector('.room_bg');

  //zooming out the room
  let height_room_per_width = room_bg.clientHeight / room_bg.clientWidth;
  let min_height = height_room_per_width * window.innerWidth;


  if (scroll < getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 40)) {
    room_bg.style.height = height_room_bg + 'px';
    room_bg.style.top = '-20%';
    room_bg.style.width = 'auto';
  }
  if (scroll > getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 40) && scroll <= getPositionHeight(scroll_vals[9].top, scroll_vals[9].height, 10)) {
    let height_per_scroll = (height_room_bg - window.innerHeight) / ((70 / 100) * window.innerHeight);
    let top_per_scroll = ((20 / 100) * (window.innerHeight)) / ((70 / 100) * window.innerHeight);
    let height_val = height_per_scroll * (scroll - getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 40));
    let top_val = top_per_scroll * (scroll - getPositionHeight(scroll_vals[8].top, scroll_vals[8].height, 40));
    if (height_room_bg - height_val > min_height) {
      room_bg.style.height = (height_room_bg - height_val) + 'px';
      room_bg.style.top = top_val - ((20 / 100) * (window.innerHeight));
    }

  }
  if (scroll > getPositionHeight(scroll_vals[9].top, scroll_vals[9].height, 10)) {
    if (window.innerHeight > window.innerWidth) {
      room_bg.style.top = '0px';
      room_bg.style.height = '100%';
    } else {
      let height_per_scroll = (height_room_bg - window.innerHeight) / ((70 / 100) * window.innerHeight);
      let top_per_scroll = ((20 / 100) * (window.innerHeight)) / ((70 / 100) * window.innerHeight);
      let height_val = height_room_bg - min_height;
      let scroll_value = height_val / height_per_scroll;
      let top_value = top_per_scroll * scroll_value;
      if (top_value - ((20 / 100) * (window.innerHeight)) < 0) {
        room_bg.style.top = top_value - ((20 / 100) * (window.innerHeight));
      } else if (top_value - ((20 / 100) * (window.innerHeight)) >= 0) {
        room_bg.style.top = '0px';
      }

      if (min_height < window.innerHeight) {
        room_bg.style.height = window.innerHeight;
      } else {
        room_bg.style.height = min_height;
      }
    }
  }

  if (scroll < getPositionHeight(scroll_vals[9].top, scroll_vals[9].height, 10)) {
    room_bg.style.right = right_room_bg_style;
  }
  if (scroll > getPositionHeight(scroll_vals[9].top, scroll_vals[9].height, 10) && scroll < getPositionHeight(scroll_vals[10].top, scroll_vals[10].height, 10)) {
    let remaining_width = room_bg.clientWidth - window.innerWidth + parseInt(right_room_bg_style);
    let right_per_scroll = remaining_width / ((100 / 100) * window.innerHeight);
    room_bg.style.right = parseInt(right_room_bg_style) - right_per_scroll * (scroll - getPositionHeight(scroll_vals[9].top, scroll_vals[9].height, 10)) + 'px';
  }
  if (scroll > getPositionHeight(scroll_vals[10].top, scroll_vals[10].height, 10)) {
    let remaining_width = room_bg.clientWidth - window.innerWidth + parseInt(right_room_bg_style);
    let right_per_scroll = remaining_width / ((100 / 100) * window.innerHeight);
    room_bg.style.right = parseInt(right_room_bg_style) - right_per_scroll * ((100 / 100) * window.innerHeight) + 'px';

  }
  if (scroll < getPositionHeight(scroll_vals[10].top, scroll_vals[10].height, 10)) {
    // room_div.style.top='0%';
    ground_div.style.top = '100%'
  }
  if (scroll < getPositionHeight(scroll_vals[10].top, scroll_vals[10].height, 10) && scroll > getPositionHeight(scroll_vals[6].top, scroll_vals[6].height, 50)) {
    room_div.style.top = '0%';
    // document.querySelector('.room_bg').style.top='0';
    ground_div.style.top = '100%';
  }
  if (scroll > getPositionHeight(scroll_vals[10].top, scroll_vals[10].height, 10) && scroll < getPositionHeight(scroll_vals[12].top, scroll_vals[12].height, 20)) {
    document.querySelector('.ground').style.opacity = '1';
    let top_per_scroll = 100 / ((210 / 100) * window.innerHeight);
    let top_val = top_per_scroll * (scroll - getPositionHeight(scroll_vals[10].top, scroll_vals[10].height, 10));
    room_div.style.top = '-' + top_val + '%';
    ground_div.style.top = (100 - top_val) + '%';

  }
  if (scroll > getPositionHeight(scroll_vals[12].top, scroll_vals[12].height, 20)) {
    room_div.style.top = '-100%';
    document.querySelector('.ground').style.opacity = '1';
    ground_div.style.top = '0%';
  }
  if (document.querySelector('.space')) {
    var space_div = document.querySelector('.space');
  } else {
    var space_div = document.querySelector('.space_fixed');
  }
  if (scroll >= getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 0)) {
    space_div.style.setProperty('top', '150%');
    space_div.style.left = '-50%';
  }
}

// //fixing screen to show laptop at any width
// right = (10/100)*room_svg.clientWidth;
// room_svg.style.right = right+'px';




//js for controlling text display on scroll
function text_display() {
  execute = true;
  if (scroll <= getPositionHeight(scroll_vals[1].top, scroll_vals[1].height, 79)) {
    clearActive_bAndb_b();
    clearActives();
    resizeDialogues();
  }
  //for mobile and tab
  if (window.innerHeight > window.innerWidth) {
    setTextEffect(0, 179, 230, 10);
    setTextEffect(1, 230, 300, 10);
    setTextEffect(2, 300, 440, 10);
    setTextEffect(3, 440, 500, 10);
    setTextEffect(4, 500, 650, 10);
    setTextEffect(5, 650, 710, 10);
    setTextEffect(6, 710, 770, 10);
    setTextEffect(7, 770, 830, 10);
    setTextEffect(8, 830, 890, 10);
    setTextEffect(9, 890, 950, 10);
    setTextEffect(10, 950, 1010, 10);
    setTextEffect(11, 1010, 1070, 10);
    setTextEffect(12, 1070, 1130, 10);
    setTextEffect(13, 1130, 1190, 10);
    setTextEffect(14, 1190, 1250, 10);
    setTextEffect(15, 1250, 1310, 10);
    setTextEffect(16, 1310, 1370, 10);
  }
  //for Computers and laptops
  else {
    setTextEffect(0, 179, 230, 10);
    setTextEffect(1, 230, 300, 10);
    setTextEffect(2, 300, 350, 10);
    setTextEffect(3, 350, 410, 10);
    setTextEffect(4, 410, 470, 10);
    setTextEffect(5, 470, 530, 10);
    setTextEffect(6, 530, 590, 10);
    setTextEffect(7, 590, 650, 10);
    setTextEffect(8, 650, 710, 10);
    setTextEffect(9, 710, 770, 10);
    setTextEffect(10, 770, 830, 10);
    setTextEffect(11, 830, 890, 10);
    setTextEffect(12, 890, 950, 10);
    setTextEffect(13, 950, 1049, 10);
    setTextEffect(14, 1100, 1160, 10);
    setTextEffect(15, 1160, 1220, 10);
    setTextEffect(16, 1220, 1300, 10);
  }
}

function scrolleffects() {
  scroll = window.scrollY;
  //for handling async scroll events by browsers
  if (scroll >= getPositionHeight(scroll_vals[1].top, scroll_vals[1].height, 0)) {
    document.getElementsByClassName('space_container_1')[0].style.position = 'fixed'
    document.getElementsByClassName('space_container_1')[0].style.top = '100%'
  }
  if (scroll <= getPositionHeight(scroll_vals[1].top, scroll_vals[1].height, 9)) {
    document.getElementsByClassName('space_container_1')[0].style.top = '179%'
  }
  if (scroll >= getPositionHeight(scroll_vals[1].top, scroll_vals[1].height, 90)) {
    document.getElementsByClassName('space_container_1')[0].style.top = '179%'
  }

  if (scroll <= getPositionHeight(scroll_vals[0].top, scroll_vals[0].height, 50)) {
    warning_div();
  }
  if (scroll >= getPositionHeight(scroll_vals[1].top, scroll_vals[1].height, 60) && scroll <= getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 10)) {
    space_div();
  }
  // for phones andtabs
  if (window.innerHeight > window.innerWidth) {
    if (scroll >= getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 10) && scroll <= getPositionHeight(scroll_vals[6].top, scroll_vals[6].height, 50)) {
      space_room_t_sc()
    }
    if (scroll >= getPositionHeight(scroll_vals[6].top, scroll_vals[6].height, 50)) {
      roomAnimate_sc();
    }
  }
  // for laptops and computers
  else {
    if (scroll >= getPositionHeight(scroll_vals[3].top, scroll_vals[3].height, 10) && scroll <= getPositionHeight(scroll_vals[4].top, scroll_vals[4].height, 70)) {
      space_room_t()
    }
    if (scroll >= getPositionHeight(scroll_vals[4].top, scroll_vals[4].height, 70)) {
      roomAnimate();
    }
  }

  text_display();
}
window.addEventListener('scroll', scrolleffects);