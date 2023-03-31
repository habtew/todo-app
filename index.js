const todoContainer = document.querySelector('.todo-container')
const img = document.querySelector('.img')
let isDarkMode = true
let data = JSON.parse(localStorage.getItem('todos')) || []

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
    if(e.target.matches('.dark-mode')){
        handleDarkMode(e)
    }
    if(e.target.matches('.clear')){
        handleClearCompleted(e)
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
                id: `${e.target.value} ${data.length}`,
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

function handleClearCompleted(){
    const target = data.filter(item => !item.isComplete)
    let updatedData = JSON.stringify(target)
    localStorage.setItem('todos', updatedData)
    location.reload()

}


function handleDarkMode(e){
    const elements = document.querySelectorAll('.light-toggle')
    for(let i=0; i< elements.length; i++){
        elements[i].classList.toggle('light')
    }
}

function renderHtml(data){
    let html = ''
    html += data.map(item => {
        return `
        <div class="todo-items" >
            <div class="fav-icon ${item.isComplete?'fav-icon-toggle':''}" id="${item.id}">
            <img src="./images/icon-check.svg" class="${!item.isComplete && 'none'}"/>
            </div>
            <p id="${item.id}" class="${item.isComplete && 'strike'}">${item.todo}</p>
            <button >
                <img src="./images/icon-cross.svg" id="${item.id}" class="btn"/>
            </button>
        </div>
            `
    }).join('')

    todoContainer.innerHTML = html
}



renderHtml(data)

