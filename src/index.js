"use strict"

import css from "./css/style.css"

import originalData from "./data.json"

console.log("original ", originalData)

//уменьшаем все индексы на 1, чтобы ардесоваться как в массиве 
// плюс сортируем friends
let matrixData = originalData.map(itm => {
  let newFriends = itm.friends.map((fr) => fr - 1).sort((a,b) => a-b)
  return {
    id: itm.id - 1,
    name: itm.name,
    friends: newFriends,
    followers: [],
    enemyes: [], 
  }
})


// для каждого юзера раскидываем его id по тем, у кого он в друзьях. Получется заполнен массив followers
matrixData.forEach(item => {
  item.friends.forEach(friend => {
    matrixData[friend].followers.push(item.id)
  })
})

// проходим по всем юзерам и массив enemyes записываем числа от 0 до matrixData.length, не совпадающие с friends
const matrixSize = matrixData.length
matrixData.forEach(item => {
  for (let i=0; i<matrixSize; i++) {
    if (!(i in item.followers)) {
      item.enemyes.push(i)
    }
  }
})
console.log("matrix before sort", matrixData)

//в свойстве user.followers.length лежит число фоловеров каждого пользователя.
//Надо как-то отбрать троих самых популярных.
//причем если есть конкуренты то по алфавиту
//первый путь - две сортировки - 1) по алфавиту на возрастание 2) по фоловерам на убывание

matrixData.sort((a,b) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  if (a.name == b.name) return 0;

})

matrixData.sort((a,b) => {return b.followers.length - a.followers.length})

let best = matrixData.slice(0, 3)

console.log("best ", best)