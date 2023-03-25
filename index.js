import data from './data.js'
const todoContainer = document.querySelector('.todo-container')
const img = document.querySelector('.img')

document.body.addEventListener('click', (e)=>{
    // console.log()
    if(e.target.matches('.btn')){
        handleDelete(e)
    }
    if(e.target.matches('input')){
        handleInput(e)
    }
})

function handleDelete(e){
    const target = data.findIndex(item => item.id == e.target.id)
    data.splice(target, 1)
    renderHtml(data)
}

function handleInput(e){
    e.target.addEventListener('keypress', (e)=>{
        if(e.key == 'Enter'){
            console.log(e.target.value)
        }
    })
}

function renderHtml(data){
    let html = ''
    html += data.map(item => {
        return `
        <div class="todo-items" >
            <div class="fav-icon fav-icon-toggle" id="${item.id}">       
            </div>
            <p id="${item.id}">${item.todo}</p>
            <button >
                <img src="./images/icon-cross.svg" id="${item.id}" class="btn"/>
            </button>
        </div>
            `
    })

    todoContainer.innerHTML = html
}

renderHtml(data)




// document.body.addEventListener('click', (e)=>{
//     if(e.target.closest('.fav-icon')){
//         console.log(e.target.classList)
//         e.target.classList.toggle = 'fav-icon-toggle'
//     }
// })


const todos = Array.from(document.querySelectorAll('.fav-icon'))


todos.map(item => {
    item.addEventListener('click', (e)=>{
        e.target.classList.toggle('fav-icon-toggle')
        // img.classList.toggle('none')
    })
})
