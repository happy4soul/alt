let array = readData() || []
// {
//     name: 'boruto',
//     description: 'lost everything',
//     strong: true
// },
// {
//     name: 'kawaki',
//     description: 'gained everything',
//     strong: true
// },
// {
//     name: 'momoshiki',
//     description: 'plotting something',
//     strong: false
// },
// {
//     name: 'amado',
//     description: 'madharchod',
//     strong: false
// },
// {
//     name: 'eida',
//     description: 'simp',
//     strong: false
// }


let searchThing = {
    searchChar: '',
    showStrong: ''
}





search(array, searchThing)

document.querySelector('.inp').addEventListener('input', function (e) {
    searchThing.searchChar = e.target.value
    search(array, searchThing)
})

document.querySelector('.form').addEventListener('submit', function (e) {
    e.preventDefault()
    const id = uuidv4()
    const timeStamp = moment().valueOf()
    array.push({
        id : id,
        name: '',
        createdAt : timeStamp,
        updatedAt : timeStamp,
        body : '',
        strong: false
    })
    console.log(array)
    
    saveData(array)
    search(array, searchThing)
    location.assign(`/other.html#${id}`)
    
})

document.querySelector('.checkbox').addEventListener('change', function (e) {
    console.log(e.target.checked)
    searchThing.showStrong = e.target.checked
    search(array, searchThing)
})

window.addEventListener('storage', function(e){
    if(e.key === 'array'){
        array = JSON.parse(e.newValue)
    }
    search(array, searchThing)
})

document.querySelector('.select').addEventListener('change', function(e){
    console.log(e.target.value)
})