let inptbx = document.getElementById('inputbx');
let submitbtn = document.getElementById('submitbtn');
let left_container = document.getElementById('left-container')
submitbtn.addEventListener('click', addTask);
let count = 1;
let data;


getData()

//  Adding task To DOM
function addTask() {


    let task_value = inptbx.value;

    let taskObj = {
        task: task_value,
        task_id: count++,
        is_complete: false
    }

    createTask(taskObj)
    setData(taskObj)

}


// Deleting task
function deleteTask() {
    let element = event.currentTarget;
    // console.log(element)
  
    let parent_Element = element.parentElement;
    let taskid = parent_Element.id
    console.log(parent_Element)
    parent_Element.remove();
let idx;
    for (let index = 0; index < data.length; index++) {
       if(data[index].task_id==taskid)
        idx=index;
    }

    data.splice(idx,1)
    
    localStorage.setItem('tasks',JSON.stringify(data))


}


// Creating DOM for Task
function createTask(obj) {
    let todo_div = document.createElement('div');

    todo_div.id = obj.task_id;

    let li_itm = document.createElement('li');
    li_itm.classList.add('lists');
    let del_btn = document.createElement('button')
    del_btn.addEventListener('click', deleteTask)
    let chk_box = document.createElement('input');


    chk_box.setAttribute('type', 'checkbox');
    chk_box.checked = obj.is_complete;
    // add functionality for check box
     // update task status in local storage
// create and Add edit button 
   // update task value in local storage


    li_itm.innerText = obj.task;
    del_btn.innerText = "Delete"
    todo_div.append(li_itm)
    todo_div.append(del_btn)
    todo_div.append(chk_box)

    left_container.append(todo_div)
}


// Set Data

function setData(obj) {
    data.push(obj);
    localStorage.setItem('tasks', JSON.stringify(data))
}


// get Data
function getData(obj) {
    data = localStorage.getItem('tasks');
    if (data)
        data = JSON.parse(data);
    else
        data = [];

    data.forEach(element => {
        createTask(element)
    });




}
