const menubtn = document.querySelector('.menu')
menu = document.querySelector('header ul')

menubtn.onclick = function() {
  if (!menu.classList.contains('open')) {
    menu.classList.add('open')
    menubtn.style.transform = 'rotate(180deg)'
    menubtn.classList.remove('uil-bars')
    menubtn.classList.add('uil-times')
  } else {
    menu.classList.remove('open')
    menubtn.style.transform = 'rotate(0deg)'
    menubtn.classList.add('uil-bars')
    menubtn.classList.remove('uil-times')
  }
}

window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    up.style.display = "block"
  } else {
    up.style.display = "none"
  }
  if (menu.classList.contains('open')) {
    menu.classList.remove('open')
    menubtn.style.transform = 'rotate(0deg)'
    menubtn.classList.add('uil-bars')
    menubtn.classList.remove('uil-times')
  }
})

const nav1 = document.getElementById('nav1')
nav2 = document.getElementById('nav2')
nav3 = document.getElementById('nav3')
nav4 = document.getElementById('nav4')



nav1.onclick = function() {
  menu.classList.remove('open')
  menubtn.style.transform = 'rotate(0deg)'
  menubtn.classList.add('uil-bars')
  menubtn.classList.remove('uil-times')
}
nav2.onclick = function() {
  menu.classList.remove('open')
  menubtn.style.transform = 'rotate(0deg)'
  menubtn.classList.add('uil-bars')
  menubtn.classList.remove('uil-times')
}
nav3.onclick = function() {
  menu.classList.remove('open')
  menubtn.style.transform = 'rotate(0deg)'
  menubtn.classList.add('uil-bars')
  menubtn.classList.remove('uil-times')
}
nav4.onclick = function() {
  menu.classList.remove('open')
  menubtn.style.transform = 'rotate(0deg)'
  menubtn.classList.add('uil-bars')
  menubtn.classList.remove('uil-times')
}
