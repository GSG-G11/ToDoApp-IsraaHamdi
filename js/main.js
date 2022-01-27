let body=document.getElementsByTagName('body')
let localName=document.getElementById('local-name')
let addBtn=document.getElementsByClassName('add-btn')
let addForm=document.getElementsByClassName('add-form')
let addTaskBtn = document.querySelector(".add-task-btn"); 
let closeForm=document.getElementById('close')
let titleTask=document.querySelector('.title-task-form')
let timeTask=document.querySelector('.time-task-form')
let descTask=document.querySelector('.desc-task-form')
let formBtn = document.querySelector(".form-btn"); 
let taskList = document.querySelector(".all-tasks"); 
let form = document.querySelector(".submit-form");
let taskNumber= document.querySelector('.total-task')
let myTask; 
let tasks = []; 
let storedTasks = []; //for local storage

//add name to homePage
localName.textContent=localStorage.getItem('name')
//open add form 
addBtn[0].addEventListener('click',()=>{
    body[0].classList.add('added')
    addForm[0].style.display ="block"
})
//close add form
closeForm.addEventListener('click',()=>{
    addForm[0].style.display ="none"
    body[0].classList.remove('added')
})

// add Task to local storage
const addToLocalStorage = function (taskTitle,taskTime,taskDesc, index) {
  storedTasks.push({ taskTitle: taskTitle,taskTime: taskTime,taskDesc: taskDesc,
                     check: false, numberOfTasks: index });
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}
// remove function from local storage
const removeFromLocalStorage = function (numberOfTasks) {
    let newStoredTask = storedTasks.filter(
      (item) => item.numberOfTasks !== numberOfTasks
    );
    storedTasks = newStoredTask;
    localStorage.setItem("tasks", JSON.stringify(newStoredTask));
  };

  const addTask = function (taskTitle,taskTime,taskDesc, index) {
  myTask=`   <div class="task" id="task-${index}">
                <div class="head-task">
                        <span class='task-container'>
                        <button class="check" onclick="check(${index})"><i class="fas fa-check-square"></i></button>
                        <span class="title-task"> ${taskTitle} </span>
                        <button class="edit" ><i class="fas fa-edit"></i></button>
                        <button class="delete" onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i></button>
                        </span>
                </div>
                <div class="info-task">
                    <span class="time-task">${taskTime}</span>
                    <p class="desc-task">${taskDesc}</p>
                </div>
            </div>`
    taskList.insertAdjacentHTML("afterbegin", myTask);
    tasks.push({ title: taskTitle,time:taskTime,desc: taskDesc, check: false, numberOfTasks: index });
  };
  
  form.addEventListener("submit", (e) => {
    e.preventDefault(); //to prevent the page from reloading
    let titleValue=titleTask.value
    let timeValue=timeTask.value
    let descValue=descTask.value
    if (titleValue === "" || timeValue === ""|| descValue === "") return; // to prevent addding empty tasks
    let index = tasks.length;
      //add task to whole list
    addTask(titleValue,timeValue,descValue, index);
    // local storage function place
    addToLocalStorage(titleValue,timeValue,descValue, index);
     //define Task Number 
     taskNumber.innerText=tasks.length
    //close the add form
    addForm[0].style.display ="none"
    body[0].classList.remove('added')
    // clearing the input field
    titleValue = " ";
    timeValue = " ";
    descValue = " ";
  });
// DELETE FUNCTION
function deleteTask(numberOfTasks) {
    // Now we delete that tast which we have slided out
    let deletedELment = document.getElementById(`task-${numberOfTasks}`);
    let newTasks = tasks.filter((item) => item.numberOfTasks !== numberOfTasks);
    tasks = newTasks;
    deletedELment.remove();
    removeFromLocalStorage(numberOfTasks);
    //define Task Number 
    taskNumber.innerText=tasks.length
  }

  function check(index) {
    //add checked class to task
    let headTask = document.getElementById(`task-${index}`).childNodes[1]
    let infoTask = document.getElementById(`task-${index}`).childNodes[3]
    headTask.classList.add("checked");
    infoTask.classList.add("checked");
    let objectIndex = storedTasks.findIndex((i) => i.numberOfTasks == index);
    storedTasks[objectIndex].check = !storedTasks[objectIndex].check; // negation of previous value
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    let checkBtn = headTask.childNodes[1].childNodes[1];
    console.log(checkBtn)
    checkBtn.onclick = ""
  }