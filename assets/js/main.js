
function getUsers() {
    document.getElementById("displayUsers").innerHTML = ""
    let listUsers = fetch(`http://146.59.242.125:3001/users`).then(data => {
        data.json().then(res => {
            res.forEach(elem => {

                console.log(elem);
                let parent = document.getElementById("displayUsers");

                let cardContainer = document.createElement('div')
                cardContainer.classList.add("col-3", "mb-2")
                parent.appendChild(cardContainer)

                let container = document.createElement('div')
                container.classList.add('card', 'text-center', 'bg-light', 'shadow', 'border-0')
                cardContainer.appendChild(container)

                let picture = document.createElement('img')
                picture.classList.add('card-img-top', 'img-responsive', 'p-5')
                picture.src = './assets/img/user.png'
                container.appendChild(picture)

                let cardBody = document.createElement('div');
                container.appendChild(cardBody)

                let name = document.createElement('h4')
                name.classList.add('card-title', 'text-capitalize')
                name.innerHTML = elem.name
                cardBody.appendChild(name)

                let firstName = document.createElement('h5')
                firstName.classList.add('card-title', 'text-capitalize')
                firstName.innerHTML = elem.firstname
                cardBody.appendChild(firstName)

                let mail = document.createElement('h5')
                mail.classList.add('card-title', 'text-capitalize') 
                mail.innerHTML = elem.mail
                cardBody.appendChild(mail)

                let btnContainer = document.createElement('div');
                btnContainer.classList.add('card-footer', 'gap-5')
                container.appendChild(btnContainer)



                let btnUpdate = document.createElement('button')
                btnUpdate.innerHTML = "Mettre à jour"
                btnUpdate.classList.add('btn', 'btn-warning', 'shadow','me-2')
                btnUpdate.setAttribute("data-bs-target", "#modal")
                btnUpdate.setAttribute("data-bs-toggle", "modal")
                btnContainer.appendChild(btnUpdate)

                let btnDelete = document.createElement('button')
                btnDelete.innerHTML = "Effacer"
                btnDelete.classList.add('btn', 'btn-danger', 'shadow', 'ms-2')
                btnContainer.appendChild(btnDelete)

                btnUpdate.addEventListener('click', () => {
                    this.displayUpdate(elem)
                })
                btnDelete.addEventListener('click', () => {
                    this.deleteUser(elem)
                })
            });
        })
    })
};
getUsers()

async function createUser() {

    // creation de l'objet, on peut recuperer la valeur des elements input pour le creer
    let obj = {
        name: document.getElementById('name').value,
        firstname: document.getElementById('firstname').value,
        mail: document.getElementById('mail').value,
        password: document.getElementById('password').value,
    }
    let user = await fetch("http://146.59.242.125:3001/user", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj) //creation d'un json a partir d'un objet javascript
    })
    getUsers()
}

async function deleteUser(elem) {
    let user = await fetch(`http://146.59.242.125:3001/user/${elem._id}`, {
        method: "DELETE",
    })
    getUsers()
}

async function updateUser(elem) {
    let objModal = {
        name: document.getElementById('nameModal').value,
        firstname: document.getElementById('firstnameModal').value,
        mail: document.getElementById('mailModal').value,
        password: document.getElementById('passwordModal').value,
    }

    let user = await fetch(`http://146.59.242.125:3001/user/${elem}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objModal) //creation d'un json a partir d'un objet javascript
        
    })
    getUsers()
}


async function displayUpdate(item) {
    let userModif = await fetch(`http://146.59.242.125:3001/user/${item._id}`)
    userModif = await userModif.json();
    
    document.getElementById('nameModal').value = userModif.name
    document.getElementById('firstnameModal').value = userModif.firstname
    document.getElementById('mailModal').value = userModif.mail
    document.getElementById('passwordModal').value = userModif.password

   document.getElementById('btnModal').addEventListener('click', ()=> {
    updateUser(userModif._id)
   })
}

