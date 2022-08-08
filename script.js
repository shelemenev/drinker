const mast = [0, 140, 280, 420]
const value = [0, 100, 200, 300, 400, 500, 600, 700, 800]
const cards = []

function init() {
  for (let i = 0; i < mast.length; ++i) {
    for (let j = 0; j < value.length; ++j) {
      cards.push({
        top: mast[i],
        left: value[j]
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
    div.style.backgroundPosition = cards[index].left + 'px ' + cards[index].top + 'px'
    div.setAttribute('data-value', cards[index].left)
    cards.splice(index, 1)
    document.querySelector(className).appendChild(div)
  }
}  

function checkCards(event) {
  const div = event.target
  document.querySelector('.my').removeChild(div)
  document.querySelector('.field').appendChild(div)
  div.className = 'card'
  div.removeEventListener('click', checkCards)
  setTimeout(() => checkCardsEnemy(), 500)
}

function checkCardsEnemy() {
  const div = document.querySelector('.enemy div')
  document.querySelector('.enemy').removeChild(div)
  document.querySelector('.field').appendChild(div)
  div.className = 'card'
  checkStep()
}

function checkStep() {
  const divs = document.querySelectorAll('.field div')
  const enemyValue = divs[divs.length - 1].getAttribute('data-value')
  const myValue = divs[divs.length - 2].getAttribute('data-value')

  if (myValue > enemyValue) {

  } else if (enemyValue > myValue){

  }
}