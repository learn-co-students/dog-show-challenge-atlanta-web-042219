const tableBody = document.querySelector('#table-body')
const URL_DOGS = `http://localhost:3000/dogs`
const form = document.querySelector('#dog-form')
let HOLDER

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', handleClick)
  form.addEventListener('submit', handleUpdate)
  fetchDogs()
})

function fetchDogs() {
  fetch(URL_DOGS)
    .then(res => res.json())
    .then(dogs => dogs.forEach(show))
}

function show(dog) {
  tableBody.innerHTML += `
  <tr><td class="name">${dog.name}</td> <td class="breed">${dog.breed}</td> <td class="sex">${dog.sex}</td> <td><button data-id="${dog.id}">Edit</button></td></tr>`
}

function handleClick(e) {
  if (e.target.innerText === "Edit") edit(e.target.parentElement.parentElement, e.target)
}

function edit(row, target) {
  HOLDER = target.parentElement.parentElement
  form.name.value = row.querySelector('.name').innerText
  form.breed.value = row.querySelector('.breed').innerText
  form.sex.value = row.querySelector('.sex').innerText
  form.dataset.id = target.dataset.id
}

function handleUpdate(e) {
  e.preventDefault()
  const dog = {
    name: form.name.value,
    breed: form.breed.value,
    sex: form.sex.value,
  }
  fetch(URL_DOGS + `/${form.dataset.id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(dog)
  }).then(() => {
    tableBody.innerHTML = ''
    fetchDogs()
  })
  // .then(res => res.json())
  //   .then(dog => HOLDER.innerHTML = `<td class="name">${dog.name}</td> <td class="breed">${dog.breed}</td> <td class="sex">${dog.sex}</td> <td><button data-id="${dog.id}">Edit</button></td>`)
}