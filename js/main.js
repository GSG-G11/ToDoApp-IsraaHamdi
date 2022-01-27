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
 addForm[0].style.display ="block"
})
//close add form
closeForm.addEventListener('click',()=>{
    addForm[0].style.display ="none"
})

// add Task to local storage
const addToLocalStorage = function (taskTitle,taskTime,taskDesc, index) {
  storedTasks.push({ taskTitle: taskTitle,taskTime: taskTime,taskDesc: taskDesc,
                     check: false, numberOfTasks: index });
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}

  const addTask = function (taskTitle,taskTime,taskDesc, index) {
  myTask=`   <div class="task" id="task-${index}">
                <div class="head-task">
                        <span class='task-container'>
                        <button class="check" ><i class="fas fa-check-square"></i></button>
                        <span class="title-task"> ${taskTitle} </span>
                        <button class="edit" ><i class="fas fa-edit"></i></button>
                        <button class="delete"><i class="fas fa-trash-alt"></i></button>
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
    // clearing the input field
    titleValue = "";
    timeValue = "";
    descValue = "";
    //close the add form
    addForm[0].style.display ="none"
  });
