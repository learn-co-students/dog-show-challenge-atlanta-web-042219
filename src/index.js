    document.addEventListener('DOMContentLoaded', () => {
        fetchDogs()
    })

    function fetchDogs(){
        fetch("http://localhost:3000/dogs")
      .then(res => res.json())
      .then(data => populateDogs(data))
    }

    function populateDogs(dogs){
        dogs.forEach(dog => {populateDog(dog)
        })
    }

    function populateDog(dog){
        const tr = document.createElement("tr")
        const tdName = document.createElement("td")
        tdName.innerText = dog.name
        const tdBreed = document.createElement("td")
        tdBreed.innerText = dog.breed
        const tdSex = document.createElement("td")
        tdSex.innerText = dog.sex
        const tdEditButton = document.createElement("td")
        const editButton = document.createElement("button")
        editButton.innerText = "Edit"
        
        const tableBody = document.getElementById("table-body")
                editButton.addEventListener("click", function(){
                    const editForm = document.getElementById("dog-form")
                    const nameInput = document.getElementById("name-input")
                    const breedInput = document.getElementById("breed-input")
                    const sexInput = document.getElementById("sex-input")

                    nameInput.placeholder = dog.name
                    breedInput.placeholder = dog.breed
                    sexInput.placeholder = dog.sex

                        editForm.addEventListener("submit", function(){
                            fetch(`http://localhost:3000/dogs/${dog.id}`, {
                                method: "PATCH",
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({"name": nameInput.value, "breed": breedInput.value, "sex": sexInput.value})
                            }).then(resp => resp.json())
                            .then(populateDog)                 
                        })
                })
        tdEditButton.append(editButton)
        tr.append(tdName, tdBreed, tdSex, tdEditButton)
        tableBody.append(tr)
    }