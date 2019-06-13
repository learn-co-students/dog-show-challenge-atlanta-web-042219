document.addEventListener('DOMContentLoaded', () => {
  const baseURL = `http://localhost:3000/dogs`
  const form = document.getElementById('dog-form')
  const tableBody = document.getElementById('table-body')

  document.addEventListener('click', handleClicks)
  
  let tableRow // tableRow collects the dog row ID on line 67 and inserts the updated JSON on line 91

  fetchDogs()


// --- FETCH BASTARD DEVIL DUGS --- //

  function fetchDogs() {
    fetch(baseURL)
    .then(resp => resp.json())
    .then(json => json.forEach(showDogs))
  }


// --- SHOW BASTARD DEVIL DUGS --- //

  function showDogs(dog) {
    const tr = document.createElement('tr')
    tr.id = dog.id
    tr.dataset.id = dog.id

    const name = document.createElement('td')
    name.id = 'name'
    name.innerText = dog.name
    name.dataset.id = dog.id

    const breed = document.createElement('td')
    breed.id = 'breed'
    breed.innerText = dog.breed
    breed.dataset.id = dog.id

    const sex = document.createElement('td')
    sex.id = 'sex'
    sex.innerText = dog.sex
    sex.dataset.id = dog.id

    const editButton = document.createElement('button')
    editButton.innerText = 'Edit'
    editButton.id = 'edit'

    tableBody.append(tr)
    tr.append(name, breed, sex, editButton)
  }

  
// --- HANDLE EDIT AND DELETE BUTTONS --- //

  function handleClicks(e) {
    if (e.target.innerText === 'Edit') {   // Populates the form fields with the data to be edited
      form.name.value = e.target.parentElement.parentElement.querySelector('#name').innerText
      form.breed.value = e.target.parentElement.parentElement.querySelector('#breed').innerText
      form.sex.value = e.target.parentElement.parentElement.querySelector('#sex').innerText
      form.dataset.id = e.target.parentElement.parentElement.dataset.id

      const hidden = document.createElement('input')
      hidden.type = 'hidden'
      hidden.value = e.target.parentElement.id
      form.appendChild(hidden)

      dogRow = e.target.parentElement // dogRow collects the row ID here
    }
    
    if (e.target.name === 'submit') {
      e.preventDefault()
      const dogID = e.target.parentElement.children[4].value
      const dogName = e.target.parentElement.children[0].value
      const dogBreed = e.target.parentElement.children[1].value
      const dogSex = e.target.parentElement.children[2].value
      
      fetch(`${baseURL}/${dogID}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },  
        body: JSON.stringify({
          name: dogName,
          breed: dogBreed,
          sex: dogSex
        })  
      })  
      .then(resp => resp.json())
      .then(dog => {
        dogRow.innerHTML = 
          `<td id='name'>${dog.name}</td>
          <td id='breed'>${dog.breed}</td>
          <td id='sex'>${dog.sex}</td>
          <button id='edit'>Edit</button>`
      })
    }
  }
  

// --- END --- //

})