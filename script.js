const mast = [0, 140, 280, 420]
const value = [0, 100, 200, 300, 400, 500, 600, 700, 800]
const cards = []
let isMyMove = true

function init() {
  for (let i = 0; i < mast.length; ++i) {
    for (let j = 0; j < value.length; ++j) {
      cards.push({
        mast: mast[i],
        value: value[j]
      })
    }
  }

  showCards('.my', 18)
  showCards('.enemy', 18)

  const divs = document.querySelectorAll('.my div')

  for (let i = 0; i < divs.length; ++i) {
    divs[i].addEventListener('click', checkCards)
  }
}

function showCards(className, count) {
  for (let i = 0; i < count; ++i) {
    const div = document.createElement('div')
    div.className = 'card_unknown'
    let index = parseInt(Math.random() * cards.length)
    div.style.backgroundPosition = cards[index].value + 'px ' + cards[index].mast + 'px'
    div.setAttribute('data-value', cards[index].value)
    cards.splice(index, 1)
    document.querySelector(className).appendChild(div)
  }
}  

function checkCards(event) {
  if (isMyMove === true) {
    const div = document.querySelector('.my div')
    document.querySelector('.my').removeChild(div)
    document.querySelector('.field').appendChild(div)
    div.className = 'card'
    div.removeEventListener('click', checkCards)
    setTimeout(() => checkCardsEnemy(), 500)
    isMyMove = false
  }
}

function checkCardsEnemy() {
  const div = document.querySelector('.enemy div')
  document.querySelector('.enemy').removeChild(div)
  document.querySelector('.field').appendChild(div)
  div.className = 'card'
  setTimeout(() => checkStep(), 500)
}

function checkStep() {
  const divs = document.querySelectorAll('.field div')
  const enemyValue = divs[divs.length - 1].getAttribute('data-value')
  const myValue = divs[divs.length - 2].getAttribute('data-value')

  if ((myValue < enemyValue && !(myValue === '0' && enemyValue === '800')) || (myValue === '800' && enemyValue === '0')) {
    for (let i = 0; i < divs.length; ++i) {
      document.querySelector('.field').removeChild(divs[i])
      document.querySelector('.my').appendChild(divs[i])
      divs[i].className = 'card_unknown'
      divs[i].addEventListener('click', checkCards)
    }
   
  } else if (enemyValue < myValue || (myValue === '0' && enemyValue === '800')) {
    for (let i = 0; i < divs.length; ++i) {
      document.querySelector('.field').removeChild(divs[i])
      document.querySelector('.enemy').appendChild(divs[i])
      divs[i].className = 'card_unknown'
    }
  }

  if (enemyValue == myValue) {
    const myDivs = document.querySelectorAll('.my div')
    const enemyDivs = document.querySelectorAll('.enemy div')

    if (myDivs.length > 1 && enemyDivs.length > 1) {
      const myDiv = document.querySelector('.my div')
      document.querySelector('.my').removeChild(myDiv)
      document.querySelector('.field').appendChild(myDiv)
      myDiv.className = 'card_unknown'
      myDiv.removeEventListener('click', checkCards)
      const enemyDiv = document.querySelector('.enemy div')
      document.querySelector('.enemy').removeChild(enemyDiv)
      document.querySelector('.field').appendChild(enemyDiv)
      enemyDiv.className = 'card_unknown'
    }
  }

  isMyMove = true
  checkWin()
}

function checkWin() {
  const mydivs = document.querySelectorAll('.my div')
  const enemydivs = document.querySelectorAll('.enemy div')

  if (mydivs.length === 0) {
    alert('Вы проиграли!')
    location.reload()  
  } else if (enemydivs.length === 0) {
    alert('Вы выиграли!')
    location.reload()
  }
  
}