document.addEventListener('DOMContentLoaded', () => {

	// VARIABLES
	const DOGS_URL = 'http://localhost:3000/dogs'
	const dogForm  = document.getElementById('dog-form')
	const dogTable = document.getElementById('dog-table')

	// MAIN
	document.addEventListener('click', handleClickEvents)
	dogForm.addEventListener('submit', new_dog)
	fetch_dogs()

	//											//
	// FUNCTION DEFINITIONS //
	//											//
	function handleClickEvents(e) {
		if(e.target.className === 'edit-btn')
			populate_form(e.target.parentElement.parentElement)
		if(e.target.className === 'delete-btn')
			delete_dog(e.target.parentElement.parentElement)
	}

	function fetch_dogs() {
		fetch(DOGS_URL)
		.then(resp => resp.json())
		.then(dogs => dogs.forEach(add_dog_div))
	}

	function add_dog_div(dog) {
		dogTable.innerHTML += `
		<tr id=${dog.id}>
			<td>${dog.name}</td>
			<td>${dog.breed}</td>
			<td>${dog.sex}</td>
			<td align="center"><button class="edit-btn"> ✎ </button></td>
			<td align="center"><button class="delete-btn"> x </button></td>
		</tr>`
	}

	function populate_form(row) {
		dogForm.id.value = row.id
		dogForm.name.value = row.children[0].innerText
		dogForm.breed.value = row.children[1].innerText
		dogForm.sex.value = row.children[2].innerText
	}

	function new_dog(e) {
		e.preventDefault()
		if(dogForm.id.value)
			edit_dog()
		else {
			let new_dog = {
				'name': dogForm.name.value,
		    'breed': dogForm.breed.value,
		    'sex': dogForm.sex.value
			}
		  fetch(DOGS_URL,{
		    method: 'POST',
		    headers: { 'Content-Type':'application/json' },
		    body: JSON.stringify(new_dog)
		  })
		  .then(resp => resp.json())
		  .then(add_dog_div)
		}
	}

	function edit_dog() {
		let row = document.getElementById(dogForm.id.value)
		row.children[0].innerText = dogForm.name.value
		row.children[1].innerText = dogForm.breed.value
		row.children[2].innerText = dogForm.sex.value

	  fetch(DOGS_URL+'/'+dogForm.id.value,{
	    method: 'PATCH',
	    headers: { 'Content-Type':'application/json' },
	    body: JSON.stringify({
	    	'name': dogForm.name.value,
	    	'breed': dogForm.breed.value,
	    	'sex': dogForm.sex.value
	    })
	  })
	  .then(dogForm.reset())
	}

	function delete_dog(row) {
	  fetch(DOGS_URL+'/'+row.id,{ method: 'DELETE' })
	  .then(row.remove())
	}

	// END //
});
