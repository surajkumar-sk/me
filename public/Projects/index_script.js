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

var imgList = ['/public/Projects/assets/arrow.svg',
  '/public/Projects/assets/default.svg',
  '/public/Projects/assets/sarvh.png',
  '/public/Projects/assets/homepage1.png',
  '/public/Projects/assets/about.png',
  '/public/Projects/assets/Project.png',
  '/public/Projects/assets/homepage2.png',
  '/public/Projects/assets/sarvh.jpg',
  '/public/Projects/assets/admission.jpg',
  '/public/Projects/assets/instabot.jpg',
  '/public/Projects/assets/forms.jpg',
  '/public/Projects/assets/sorting.png',
  '/public/Projects/assets/search.png'
]
for (let i = 0; i < imgList.length; i++) {
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


var data = {
  "frontend": {
    "id": "frontend",
    "name": "Front End",
    "color_1": "#2193b0",
    "color_2": "#6dd5ed",
    "def_image": "/public/Projects/assets/default.svg",
    "data": [{
        "image": "/public/Projects/assets/sarvh.png",
        "heading": "Sarvh",
        "paragraph": "I am not allowed to share the code for the page but you can vist the beta version of the website which is an old version made public in november 2021 ",
        "demo": 1,
        "demo_link": "https://sarvh.herokuapp.com",
        "code_link": "https://github.com/surajkumar-sk/Projects/tree/main/sarvh"
      }, {
        "image": "/public/Projects/assets/homepage1.png",
        "heading": "Hompage - 1",
        "paragraph": "This was the first homepage that i designed and coded as intro formyself. I named the website theme as Mysterious Land because it looks like a blue land emerging from dark blue and white gradient space displaying my details and links.",
        "demo": 1,
        "demo_link": "https://surajkumarsk.me/demo/homepage1",
        "code_link": "https://github.com/surajkumar-sk/Projects/tree/main/Homepage1"
      },
      {
        "image": "/public/Projects/assets/about.png",
        "heading": "About Me",
        "paragraph": "I was just browsing for some inspiration for displaying a small story on a website. Then I came across this concept of hijacking the scroll and make the browser scroll divs as per my story. So I implemented the concept to design my about me page. Keep scrolling **slowly** and you are in for a fun Ride.",
        "demo": 1,
        "demo_link": "https://surajkumarsk.me/about",
        "code_link": "https://github.com/surajkumar-sk/Projects/tree/main/Aboutme"
      },
      {
        "image": "/public/Projects/assets/Project.png",
        "heading": "Projects Page",
        "paragraph": "This page displays all the projects mentioned in this repo with a more appealing UI. Visit this site and you are up for some cool slides and swipes.(Open the menu from top menu Icon).",
        "demo": 1,
        "demo_link": "https://surajkumarsk.me/projects",
        "code_link": "https://github.com/surajkumar-sk/Projects/tree/main/ProjectPage"
      },
      {
        "image": "/public/Projects/assets/homepage2.png",
        "heading": "Homepage - 2",
        "paragraph": "This was my next Homepage after Homepage-1 (I know design degraded a bit). It's a page that contains minimum components and direct Links. I name the Theme for the website as Lights On (you'll know why when you visit the page ;-)",
        "demo": 1,
        "demo_link": "https://surajkumarsk.me/demo/homepage2",
        "code_link": "https://github.com/surajkumar-sk/Projects/tree/main/Homepage2"
      }
    ]
  },
  "backend": {
    "id": "backend",
    "name": "Back End",
    "color_1": "#4f54da",
    "color_2": "#7420b9",
    "def_image": "/public/Projects/assets/default.svg",
    "data": [{
        "image": "/public/Projects/assets/sarvh.jpg",
        "heading": "Sarvh",
        "paragraph": "While I worked as an intern and then Web Development Team lead I implemented a lot of backend logic, implemented ElasticSearch, managed team code and guided them towards writing efficient and readable code(my personal projects would reflect those :-), Managed DataBase and hosted their site on Heroku then Netlify and then AWS.",
        "demo": 1,
        "demo_link": "https://sarvh.herokuapp.com",
        "code_link": "https://github.com/surajkumar-sk/Projects/tree/main/sarvh"
      },
      {
        "image": "/public/Projects/assets/admission.jpg",
        "heading": "Admission Form Server",
        "paragraph": "A school did admissions on paper and it became very hard to print copies of forms and finding a student details, so I implemented a server for them. This server return a HTML form to be filled with students details and then after submit server processes the data and generates a pdf file with the details and send them to the user and also save the copy of the data into an excel file, which can be downloaded to search for students details on later date. ",
        "demo": 1,
        "demo_link": "https://admission-form-zphs.herokuapp.com/",
        "code_link": "https://github.com/surajkumar-sk/Projects/tree/main/Admission"
      }

    ]
  },
  "Mini_Projects": {
    "id": "Mini_Projects",
    "name": "Mini_Projects",
    "color_1": "#000428",
    "color_2": "#004e92",
    "def_image": "/public/Projects/assets/default.svg",
    "data": [{
        "image": "/public/Projects/assets/instabot.jpg",
        "heading": "Instagram Bot",
        "paragraph": "When i was learning about servers and data bases, I realized every action that we do on instagram is basically an api calls. So , why not read the api calls and make a bot(I heard it helps a lot in marketing). So i made this project around that time. This bot can easily be configured and used by anyone. It can like posts , comment on posts, get a users follower list, get top 5 posts of a user and more...",
        "demo": 0,
        "demo_link": "",
        "code_link": "https://github.com/surajkumar-sk/Projects/tree/main/Instabot"
      },
      {
        "image": "/public/Projects/assets/forms.jpg",
        "heading": "Form Data to Certificates",
        "paragraph": " I implemented a Project to take the data in an excel file and make certificates as PDf and store them for later distribution. I didn't have much time otherwise i would have made a way to configure details that needs to be on certificate.",
        "demo": 0,
        "demo_link": "",
        "code_link": "https://github.com/surajkumar-sk/Projects/tree/main/Certificates"
      },
      {
        "image": "/public/Projects/assets/sorting.png",
        "heading": "Sorting Excel Data",
        "paragraph": " There was a need for sorting Telangana Teachers data depending on a list of factors, I implemented a server to take an excel file as an input and had the logic and parameters for sorting data hard coded in js. The actual sorting was done manually by some officers my sorting server was used just to check for any possible mistakes that might have occured while sorting the data.",
        "demo": 0,
        "demo_link": "",
        "code_link": "https://github.com/surajkumar-sk/Projects/tree/main/Sortingserver"
      },
      {
        "image": "/public/Projects/assets/search.png",
        "heading": "Teachers Info",
        "paragraph": " This website takes district name and designation as a form data and returns all the teachers details who work in that district under that designation. Behind the scene the server just has a Search algorithm that takes form data does the search in excel file and returns all the matching entries.",
        "demo": 0,
        "demo_link": "",
        "code_link": "https://github.com/surajkumar-sk/Projects/tree/main/Teachersinfo"
      }
    ]
  }
}

console.log(data)
// GLobal variables

var index = 0;
var section = 'frontend';
//counter for resizebgs()
let i = 1;


//-----------------------------------------Defining some utils-------------------------------------------------

//resizing background elements if the width of the image is 
// less than window width along with maintaining the aspect ratio
function resizeBgs() {
  let full_bg = document.querySelectorAll('.bg_svg');
  full_bg.forEach(ele => {
    while (ele.clientWidth < window.innerWidth) {
      ele.style.height = 100 + i + '%';
      i = i + 1;
    }
  });

  console.log('here')
}


// /**
//  * @public
//  * @param {string} category - Name of the category for which the image is to b displayed 
//  * @description - checks which category is to be displayed and writes the image or svg to img div
//  */
// function insertImg(){
//   let img_div = document.querySelector('.center_container_img_container');
//   if(category == 'frontend'){
//     img_div.innerHTML=comp_raw_svg;
//   }
// }


//function for manupulatin the menu
function togglemenu() {
  document.querySelector('.menu_icon_cont').classList.toggle('on');
  document.querySelector('.menu').classList.toggle('menu_on');
  if (document.querySelector('.menu').classList.contains('menu_on')) {
    document.querySelector('.menu').style.transition = "none";
    document.querySelector('.menu').style.transform = "translateX(0px)";
    document.querySelector('.menu').style.transition = "none";
    document.querySelector('.menu').style.transform = "translateX(-100px)";
    document.querySelector('.menu').style.transition = "all 0.5s ease-out";
    document.querySelector('.menu').style.transform = "translateX(0px)";

    document.querySelector('#menu_hide_show_cir1').style.transition = "none";
    document.querySelector('#menu_hide_show_cir1').style.r = 0;
    document.querySelector('#menu_hide_show_cir1').style.transition = "all 1s ease-in";
    document.querySelector('#menu_hide_show_cir1').style.r = 3 / 2 * window.innerHeight;
  } else {
    document.querySelector('.menu').style.transition = "all 0.5s ease-out";
    document.querySelector('.menu').style.transform = "translateX(-240px)";
    document.querySelector('#menu_hide_show_cir1').style.transition = "all 0.5s ease-out";
    document.querySelector('#menu_hide_show_cir1').style.r = 0;
  }

}

function changeSector(item) {
  togglemenu()
  index = 0;
  section = item;

  document.querySelector('.menu').style.pointerEvents = 'none';

  setTimeout(() => {
    let active_div = document.querySelectorAll('.front');
    active_div.forEach(ele => {

      if (!(ele.classList.contains('active'))) {
        changingvalues(ele, item)
      }
    })
    document.querySelector('#rect-clipPath-rect').style.transition = "all 1.2s ease-in-out";
    document.querySelector('#rect-clipPath-rect').style.width = 0;
    setTimeout(() => {
      let inside = false;
      active_div.forEach(ele => {
        if (!(ele.classList.contains('active')) && !inside) {
          active_div.forEach(eleIn => {
            eleIn.querySelector('.center_div_cont').style.transform = `none`;
            if (eleIn.classList.contains('active')) {
              eleIn.classList.remove('active');
            }
          });

          document.querySelector('#rect-clipPath-rect').style.transition = "none";
          document.querySelector('#rect-clipPath-rect').style.width = window.innerWidth;


          ele.classList.add('active');
          document.querySelector('.menu').style.pointerEvents = 'auto';
          inside = true;

        }

      });
    }, 1550)
  }, 505)

}


function changingvalues(ele, id) {
  //changing gradient
  console.log(ele, id);
  ele.querySelector('.cls-1-bg-svg').style.fill = `url(#linear-gradient-${id})`;
  let info_text = ele.querySelector('.info_text')
  let center_div_content = '';
  data[id].data.forEach(e => {
    center_div_content += `<div class="center_div_cont_c">
    <div class="center_div">
      <div class="info_cont">
        <div class="info_text">
          <h2>${data[id].name}</h2>
          <div class="info_p">
            <h3>${e.heading}</h3>
            <p>${e.paragraph}</p>
          </div>
          <div class="info_button">
            <button onclick="location.href = '${e.code_link}';">View Code</button>
            ${e.demo ? `<button onclick="location.href = '${e.demo_link}';">View Project</button>` : ''}
          </div>
        </div>
        <div class="info_image">
          ${id=='frontend' ? `<img class="info_image_screens" src="${e.image}" alt="image of project" />` : `<img class="info_image_img" src="${e.image}" alt="image of project" />`}
        </div>
      </div>
    </div>
  </div>`
  });
  ele.querySelector('.center_div_cont').innerHTML = center_div_content;

}

function previous() {
  if (index > 0 && index < data[section].data.length) {
    index = index - 1;
    document.querySelector('.active').querySelector('.center_div_cont').style.transform = `translateX(-${index*100}%)`;
  }
}

function next() {
  if (index >= 0 && index < data[section].data.length - 1) {
    index = index + 1;
    document.querySelector('.active').querySelector('.center_div_cont').style.transform = `translateX(-${index*100}%)`;
  }
}

function adding_gradient() {
  let bg_svgs = document.querySelectorAll('.bg_svg')
  let gradient = '';
  for (let i in data) {
    gradient += `<linearGradient id="linear-gradient-${data[i].id}" y1="384.25" x2="1366.5" y2="384.25" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="${data[i].color_1}" class="linear-gradient-bg-svg-1"/>
    <stop offset="1" stop-color="${data[i].color_2}" class="linear-gradient-bg-svg-2"/>
  </linearGradient>`
  }

  bg_svgs.forEach(ele => {
    defs = ele.querySelector('defs');
    defs.innerHTML += gradient;
  })
}

function adding_menuItems() {
  let menu_cont = document.querySelector('.menu').querySelector('ul');
  let items = '';
  for (let i in data) {
    items += `<li onclick="changeSector('${data[i].id}')">${data[i].name}</li>`
  }
  menu_cont.innerHTML += items;
}

function addSwipe() {
  swipe_div = document.querySelectorAll('.center_div_cont');
  swipe_div.forEach(ele => {
    ele.addEventListener('touchmove', function (event) {
      handleTouchMove(event, ele);
    }, false);
    ele.addEventListener('touchstart', function (event) {
      handleTouchStart(event);
    }, false);
  });

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
        //next
        next();
      } else {
        //previous
        previous();
      }
    } else if (Math.abs(xDiff) < Math.abs(yDiff)) {
      // evt.preventDefault();
    }

    /* reset values */
    xDown = null;
    yDown = null;
  }
}

//----------------------------------------Code that controls the page----------------------------------------------
adding_gradient();
adding_menuItems();
resizeBgs();
addSwipe();
// insertImg('frontend');  
changingvalues(document.querySelector('.front'), 'frontend')

window.addEventListener('resize', () => {
  location.reload();
})