let itemId = location.hash.substring(1)
let array = readData()
let noteTitle = document.querySelector('.addNote')
let bodyText = document.querySelector('.bodyText')
let remove = document.querySelector('.remove')
let item = array.find(function (item) {
    return item.id === itemId
})
if (item === undefined) {
    location.assign('/index.html')
}

noteTitle.value = item.name
bodyText.value = item.body

noteTitle.addEventListener('input',function(e){
    item.name = e.target.value
    item.updatedAt = moment().valueOf()
    saveData(array)
})

bodyText.addEventListener('input',function(e){
    item.body = e.target.value
    item.updatedAt = moment().valueOf()
    saveData(array)
})

remove.addEventListener('click', function(e){
    removeNote(item.id)
    saveData(array)
    location.assign('/index.html')
})

window.addEventListener('storage', function(e){
    if(e.key === 'array'){
        array = JSON.parse(e.newValue)
    }
    item = array.find(function (item) {
        return item.id === itemId
    })
    if (item === undefined) {
        location.assign('/index.html')
    }
    
    noteTitle.value = item.name
    bodyText.value = item.body
})