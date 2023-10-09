const addBtn = document.getElementById("add-btn")
const newInput = document.querySelector("#wrapper input")
const tasksContainer = document.getElementById("tasks")
const error = document.getElementById("error")
const count = document.querySelector(".count")
let taskCount = 0

const displayCount = (taskCount) => {
    count.textContent = taskCount
}

const addTask = () => {
    const taskName = newInput.value.trim()
    error.style.display = "none"
    if (!taskName){
        setTimeout(() =>{
            error.style.display = "block"
        }, 200)
        return
    }


    //tasks
    const task = `<div class="task">
        <input type="checkbox" class="task-check"/>
        <span class="taskname">${taskName}</span>
        <button class="edit">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete">
            <i class="fa-solid fa-trash"></i>
        </button>
  </div>`

    tasksContainer.insertAdjacentHTML ("beforeend", task)

    //delete button
    const deleteBtns = document.querySelectorAll(".delete")
    deleteBtns.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove()
            taskCount -= 1
            displayCount(taskCount)
        }
    })

    //edit button
    const editButtons = document.querySelectorAll(".edit")
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target
            if (!(e.target.className == "edit")) {
                targetElement = e.target.parentElement
            }
            newInput.value = targetElement.previousElementSibling.innerText
            targetElement.parentNode.remove()
            taskCount -= 1
            displayCount(taskCount)
        }
    })

    //checkbox
    const taskCheck = document.querySelectorAll(".task-check")
    taskCheck.forEach((checkBox) => {
        checkBox.onchange = () =>{
            checkBox.nextElementSibling.classList.toggle("completed")
            if (checkBox.checked){
                taskCount -= 1
            } else{
                taskCount += 1
            }
            displayCount(taskCount)
        }
    })

    taskCount += 1
    displayCount(taskCount)
    newInput.value = ""
}

addBtn.addEventListener("click", addTask)

window.onload = () => {
    taskCount = 0
    displayCount(taskCount)
    newInput.value = ""
}