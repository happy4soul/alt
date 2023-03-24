// console.log(uuidv4())

//reading data from localStorage
let readData = function () {
    let arrayJSON = localStorage.getItem('array')
    if (arrayJSON !== null) {
        return JSON.parse(arrayJSON)
    }
    else {
        return []
    }
}

//saving data in localStorage

let saveData = function (array) {
    localStorage.setItem('array', JSON.stringify(array))
}

//removing a note
let removeNote = function (id) {
    let currentNote = array.findIndex(function (item) {
        return item.id === id
    })
    if (currentNote > -1) {
        array.splice(currentNote, 1)
    }
}

//toggleStrong value

let toggleStrongValue = function (id) {
    let item = array.find(function (item) {
        return item.id === id
    })
    if (item !== undefined) {
        item.strong = !item.strong
    }
}

//displaying note names
let displayNotes = function (item) {
    let newdiv = document.createElement('div')
    let p = document.createElement('a')
    p.setAttribute('href', `/other.html#${item.id}`)

    //creating remove button
    let button = document.createElement('button')
    button.textContent = 'x'
    button.addEventListener('click', function (e) {
        removeNote(item.id)
        saveData(array)
        search(array, searchThing)
    })

    //creating another checkbox
    let anotherCheckbox = document.createElement('input')
    anotherCheckbox.setAttribute('type', 'checkbox')
    anotherCheckbox.checked = item.strong
    anotherCheckbox.addEventListener('change',function(e){
        toggleStrongValue(item.id)
        saveData(array)
        search(array,searchThing)
    })

    if (item.name.length > 0) {
        p.textContent = item.name
    }
    else {
        p.textContent = 'unnamed note'
    }
    newdiv.appendChild(anotherCheckbox)
    newdiv.appendChild(p)
    newdiv.appendChild(button)
    return newdiv
}

//displaying number of strong characters
let numberOfStrongChars = function (isStrong) {
    let h2 = document.createElement('h2')
    h2.textContent = `there are ${isStrong.length} strong characters`
    return h2
}

let search = function (arr, searchThing) {
    let searching = arr.filter(function (item) {
        return item.name.toLowerCase().includes(searchThing.searchChar.toLowerCase())
    })

    searching = searching.filter(function (item) {
        if (searchThing.showStrong) {
            return item.strong
        }
        else {
            return true
        }
    })

    let isStrong = searching.filter(function (item) {
        return item.strong
    })

    document.querySelector('.division').innerHTML = ''

    let h2 = numberOfStrongChars(isStrong)
    document.querySelector('.division').appendChild(h2)

    searching.filter(function (item) {

        let p = displayNotes(item)

        document.querySelector('.division').appendChild(p)
    })
}