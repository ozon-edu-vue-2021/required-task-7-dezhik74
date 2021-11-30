"use strict"

import css from "./css/style.css"

import {matrixData, best} from "./store/store"

// console.log("matrix ", matrixData)
// console.log("best ", best)

const listView = document.querySelector(".list-view")
const contactList = document.querySelector(".contacts-list")
const userComponent = document.querySelector(".details-view")

let backButton = null

function showUser (user, best) {
  // вот здесь режутся друзья и враги до 3 элементов
  const followers = user.followers.slice(0, 3).map(itm => {
    return `<li><i class="fa fa-male"></i><span >${matrixData[itm].name}</span></li>`
  }).join(' ')
  const enemyes = user.enemyes.slice(0, 3).map(itm => {
    return `<li><i class="fa fa-male"></i><span >${matrixData[itm].name}</span></li>`
  }).join(' ')
  const theBests = best.map(itm => {
    return `<li><i class="fa fa-male"></i><span >${itm.name}</span></li>`
  }).join(' ')
  const userHTML = `
    <div class="user-animation">
      <div class="background">
        <div class="back"></div>
        <div class="user-img"></div>
        <div class="user-name">${user.name}</div>
      </div>
      <ul>
        <li class="people-title">Фоловеры</li>
        ${followers}
        <li class="people-title">Не в друзьях</li>
        ${enemyes}
        <li class="people-title">Популярные люди</li>
        ${theBests}
      </ul>
    </div>
  `
  window.scrollTo(0, 0)
  listView.classList.add("hidden")
  userComponent.classList.remove("hidden")
  const elem = document.createElement('div')
  elem.innerHTML = userHTML
  userComponent.append(elem)
  //стилизуем дополнительно
  const arrayOfLi = userComponent.getElementsByTagName("li")
  for (let idx = 0; idx < arrayOfLi.length; idx++) {
    arrayOfLi[idx].style.transform = `translate3d(0, ${30 + idx * 5}px, 0)`
    arrayOfLi[idx].style.WebkitTransform = `translate3d(0, ${30 + idx * 5}px, 0)`
  }
  //настраиваем кнопку
  backButton = userComponent.querySelector(".back")
  backButton.addEventListener("click", showClassList)
}

function createContactListItem (user, idx) {
  let elem = document.createElement('li')
  elem.className = "contact-list__item"
  elem.innerHTML=`<strong class="item-userame">${user.name}</strong>`
  elem.onclick = () => {showUser(user, best)}
  contactList.append(elem)
}
    
function createContactList (){
  matrixData.forEach((item, idx) => {createContactListItem(item, idx)})
}

function showClassList() {
  userComponent.innerHTML=""
  listView.classList.remove("hidden")
  backButton.removeEventListener("click", showClassList)
  
}

function init () {
  createContactList()
}

init ()
