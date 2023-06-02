let baseUrl = "http://localhost:6969"
let container = document.querySelector('.container')
let form = document.forms.submit
let modal = document.querySelector('.modal')

const getAllData = async () => {
    const res = await fetch(baseUrl + '/users')

    if (res.status === 200 || res.status === 201) {
        const data = await res.json()

        reload(data, container)
    } else {
        alert('Connection error')
    }
}

getAllData()

function reload(arr, place) {
    place.innerHTML = ''
    let cont = document.createElement('div')
    cont.classList.add('cont')
    let h1 = document.createElement('h1')
    h1.innerHTML = 'Люди до 25'
    cont.append(h1)

    for (let item of arr) {
        let itemDiv = document.createElement('div')
        let name = document.createElement('p')
        let surname = document.createElement('p')
        let between = document.createElement('div')
        let ageText = document.createElement('p')
        let fullname = document.createElement('p')
        let age = document.createElement('p')
        let btw = document.createElement('div')
        let images = document.createElement('div')
        let del = document.createElement('img')
        let edit = document.createElement('img')

        name.innerHTML = item.name
        surname.innerHTML = item.surname
        ageText.innerHTML = 'Age'
        age.innerHTML = item.age
        fullname.innerHTML = `${name.innerHTML} ${surname.innerHTML}`
        del.src = './images/delete.svg'
        edit.src = './images/edit.svg'

        del.onclick = async () => {
            const res = await fetch(baseUrl + "/users/" + item.id, {
                method: "delete"
            })

            if (res.status === 200 || res.status === 201) {
                itemDiv.remove()
            }
        }

        edit.onclick = async () => {
            // let editText = prompt()

            // const res = await fetch(baseUrl + "/todos/" + item.id, {
            //     method: 'PATCH',
            //     body: JSON.stringify({
            //         task: editText,
            //     }),
            //     headers: {
            //         'Content-type': 'application/json; charset=UTF-8',
            //     }
            // })
            // getAllData()
            modal.style.display = 'flex'
        }

        itemDiv.classList.add('item')
        between.classList.add('between')
        btw.classList.add('btw')
        images.classList.add('flex')

        itemDiv.append(btw, between)
        images.append(del, edit)
        btw.append(fullname, images)
        between.append(ageText, age)
        cont.append(itemDiv)
        place.append(cont)
    }
}

form.onsubmit = (event) => {
    event.preventDefault();

    let task = {};

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        task[key] = value;
    });

    console.log(task);

    createNewTask(task)
};

const createNewTask = (body) => {
    fetch(baseUrl + '/users', {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                getAllData()
            }
        })
}
