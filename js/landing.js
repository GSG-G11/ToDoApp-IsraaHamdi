let inputName=document.getElementById('name')
let nextPage=document.getElementById('start')
let localName=document.getElementById('local-name')
let yourName

//go to the home page
nextPage.addEventListener('click',()=>{
    yourName=inputName.value
    if (yourName == '') return
    localStorage.setItem('name',yourName)
    window.location.href="/ToDoApp-IsraaHamdi/html/homePage.html"
})