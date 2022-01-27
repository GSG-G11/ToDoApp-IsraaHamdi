let body=document.getElementsByTagName('body')
let localName=document.getElementById('local-name')
let addBtn=document.getElementsByClassName('add-btn')
let addForm=document.getElementsByClassName('add-form')
let editForm=document.getElementsByClassName('edit-form') 
let closeForm=document.getElementById('close')
let editCloseForm=document.getElementById('edit-close')
let titleTask=document.querySelector('.title-task-form')
let timeTask=document.querySelector('.time-task-form')
let descTask=document.querySelector('.desc-task-form')
let editTitleTask=document.querySelector('.title-edit')
let editTimeTask=document.querySelector('.time-edit')
let editDescTask=document.querySelector('.desc-edit')
let taskList = document.querySelector(".all-tasks"); 
let form = document.querySelector(".submit-form");
let editSubmitForm = document.querySelector(".edit-Submit-form");
let taskNumber= document.querySelector('.total-task')
let taskNumberCompleted= document.querySelector('.complete-task')
let completeTask=0
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
    let newStoredTask = storedTasks.filter((item) => item.numberOfTasks !== numberOfTasks);
    storedTasks = newStoredTask;
    localStorage.setItem("tasks", JSON.stringify(newStoredTask));
};

  const addTask = function (taskTitle,taskTime,taskDesc, index,checked) {
      myTask=`   <div class="task" id="task-${index}">
                <div class="head-task ${checked ? "checked" : ""}">
                    <span class='task-container'>
                      <button class="check" onclick="check(${index})"><i class="fas fa-check-square"></i></button>
                      <span class="title-task">${taskTitle}<small onclick="display(${index})"> more info</small> </span>
                      <button class="edit" onclick="edit(${index})" ><i class="fas fa-edit"></i></button>
                      <button class="delete" onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i></button>
                    </span>
                </div>
                <div class="info-task ${checked ? "checked" : ""}">
                    <span class="time-task">${taskTime}</span> 
                    <p class="desc-task">${taskDesc}</p>
                    <span class="hidden-info" onclick="hidden1(${index})">hidden info</span>
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
// DELETE FUNCTION for task that not needed
function deleteTask(numberOfTasks) {
    // Now we delete that task which we have slided out
    let deletedELment = document.getElementById(`task-${numberOfTasks}`);
    let newTasks = tasks.filter((item) => item.numberOfTasks !== numberOfTasks);
    tasks = newTasks;
    deletedELment.remove();
    removeFromLocalStorage(numberOfTasks);
    //define Task Number 
    taskNumber.innerText=tasks.length
  }
//Check Funtion for task when done or not
  function check(index) {
    let headTask = document.getElementById(`task-${index}`).childNodes[1]
    let infoTask = document.getElementById(`task-${index}`).childNodes[3]
    headTask.classList.add("checked");
    infoTask.classList.add("checked");
    let objectIndex = storedTasks.findIndex((i) => i.numberOfTasks == index);
    storedTasks[objectIndex].check = !storedTasks[objectIndex].check; // negation of previous value
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    let checkBtn = headTask.childNodes[1].childNodes[1];
    checkBtn.onclick = ""
    completeTask++
    taskNumberCompleted.textContent=completeTask
}
//Edit Funtion for task when done or not
function edit(index) {
  body[0].classList.add('added')
  editForm[0].style.display ="block"
  //close edit form
  editCloseForm.addEventListener('click',()=>{
    editForm[0].style.display ="none"
    body[0].classList.remove('added')
  })
  let task=tasks[index]
  console.log(task)
  editTitleTask.value=task.title
  editTimeTask.value=task.time
  editDescTask.value=task.desc
  editSubmitForm.addEventListener('submit',()=>{
     //find the object index within array using the numberOfTask
    let objectIndex = storedTasks.findIndex((i) => i.numberOfTasks == index);
    console.log(objectIndex)
    storedTasks[objectIndex].taskTitle = editTitleTask.value;
    storedTasks[objectIndex].taskTime = editTimeTask.value;
    storedTasks[objectIndex].taskDesc = editDescTask.value;
    localStorage.setItem("tasks", JSON.stringify(storedTasks))
    editForm[0].style.display ="none"
    body[0].classList.remove('added')
  })
}
window.onload = () => {   
     // Empty array in case there is no Tasks key in localStorage
    let printedtasks = JSON.parse(localStorage.getItem("tasks")) || []; 
    storedTasks = printedtasks;
    printedtasks.map((ele, index) => {
      if (ele.check == true) {
        addTask(ele.taskTitle,ele.taskTime,ele.taskDesc, ele.numberOfTasks, ele.check);
        let checkBtn = document.getElementById(`task-${index}`).childNodes[1].childNodes[1];
        checkBtn.onclick = ""
        completeTask++
        taskNumberCompleted.textContent=completeTask
      }else {
        addTask(ele.taskTitle,ele.taskTime,ele.taskDesc, ele.numberOfTasks, ele.check);
      }
    });
     //define Task Number 
     taskNumber.innerText=tasks.length
};
function display(index) {
  let moreInfo =document.querySelector(`#task-${index} .info-task`)
  moreInfo.style.display ='block'
}
function hidden1(index) {
  let moreInfo =document.querySelector(`#task-${index} .info-task`)
  // let moreInfo =document.querySelector(`#task-${index} .info-task .hidden-info`)
  moreInfo.style.display ='none'
}
