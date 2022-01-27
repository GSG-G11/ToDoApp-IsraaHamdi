let inputName=document.getElementById('name')
let nextPage=document.getElementById('start')
let localName=document.getElementById('local-name')
let yourName

//go to the home page
nextPage.addEventListener('submit',()=>{
    yourName=inputName.value
    if (yourName == '') return
    localStorage.setItem('name',yourName)
    location.href="html/homePage.html"
})