// import data from './data.js'
const todoContainer = document.querySelector('.todo-container')
const img = document.querySelector('.img')
let data = JSON.parse(localStorage.getItem('todos')) || []
console.log(data)
document.body.addEventListener('click', (e)=>{
    if(e.target.matches('.btn')){
        handleDelete(e)
    }
    if(e.target.matches('input')){
        handleInput(e)
    }
    if(e.target.matches('.fav-icon')){
        handleFavIcon(e)
    }
    if(e.target.matches('.active-todo')){
        handleActiveTodo(e)
    }
    if(e.target.matches('.complete-todo')){
        handleCompletedTodo(e)
    }
    if(e.target.matches('.all-todo')){
        renderHtml(data)
    }
})

function handleDelete(e){
    const target = data.findIndex(item => item.id == e.target.id)
    data.splice(target, 1)
    let updatedData = JSON.stringify(data)
    renderHtml(data)
    localStorage.setItem('todos', updatedData)
}

function handleInput(e){
    e.target.addEventListener('keypress', (e)=>{
        if(e.key == 'Enter' && e.target.value !== ''){
            const inpu = {
                todo: e.target.value,
                id: e.target.value.length + data.length + 1,
                isComplete: false
            }
            data.unshift(inpu)
            localStorage.setItem('todos', JSON.stringify(data))
            e.target.value = ''
            renderHtml(data)
        }
    })
}

function handleFavIcon(e){
    console.log(e.target.id)
    data.map(item => {
        if(item.id == e.target.id){
            item.isComplete = !item.isComplete
        }
    })
    let updatedData = JSON.stringify(data)
    localStorage.setItem('todos', updatedData)
    renderHtml(data)
}

function handleActiveTodo(e){
    const target = data.filter(item => !item.isComplete)
    renderHtml(target)
}

function handleCompletedTodo(e){
    const target = data.filter(item => item.isComplete)
    renderHtml(target)
}


function renderHtml(data){
    let html = ''
    html += data.map(item => {
        return `
        <div class="todo-items" >
            <div class="fav-icon ${item.isComplete?'fav-icon-toggle':''}" id=${item.id}>
            </div>
            <p id=${item.id} class="${item.isComplete && 'strike'}">${item.todo}</p>
            <button >
                <img src="./images/icon-cross.svg" id=${item.id} class="btn"/>
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


