document.addEventListener('DOMContentLoaded', () => {
    getDogs()
})

function getDogs() {
    fetch("http://localhost:3000/dogs")
    .then (res => res.json())
    .then (res => {
        res.forEach(dog => displayDog(dog))
    })
}

function displayDog(dog) {
    const table = document.getElementById("table-body")
    const tr = document.createElement("tr")
    tr.id = dog.id

    const nameTd = document.createElement("td")
    nameTd.innerText = dog.name 

    const breedTd = document.createElement("td")
    breedTd.innerText = dog.breed

    const sexTd = document.createElement("td")
    sexTd.innerText = dog.sex

    const btnTd = document.createElement("td")

    const editBtn = document.createElement("button")
    editBtn.innerText = "Edit"

    table.append(tr)
    tr.append(nameTd, breedTd, sexTd, btnTd)
    btnTd.append(editBtn)

    editBtn.addEventListener("click", () => {
        const inputName = document.getElementById("inputName")
        const inputBreed = document.getElementById("inputBreed")
        const inputSex = document.getElementById("inputSex")
        console.log(inputName)

        inputName.value = dog.name
        inputBreed.value = dog.breed
        inputSex.value = dog.sex
            const form = document.getElementById("dog-form")
            form.addEventListener("submit", (e) => {
                fetch(`http://localhost:3000/dogs/${dog.id}`, {
                    method: "PATCH",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name: inputName.value, breed: inputBreed.value, sex: inputSex.value})
                    }).then(resp => resp.json())
                    .then(displayDog)
                })
        })  
}