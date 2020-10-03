// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
  //DOM event listener
  document.addEventListener('DOMContentLoaded',getTasks);
  //add task event
  form.addEventListener('submit',addTask);
  //remove task event
  taskList.addEventListener('click',removeTask);
  //clear task event
  clearBtn.addEventListener('click',clearTasks);
  //filter task event
  filter.addEventListener('keyup',filterTasks);
  
}

//get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
  
}
//add Task
function addTask(e){
  if(taskInput.value === ''){
    alert('Please Enter Task');return;
  }
  //create li element
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement('a');
  //Add class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  //append link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);
  //store in LS
  storeTaskInLocalStorage(taskInput.value);
  //clear input
  taskInput.value = '';

  //Local Storage
  e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){
  
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('are you sure?')){
      e.target.parentElement.parentElement.remove();
      //remove from LS
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from LS
function removeFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  })
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//clear tasks
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //clear from LS
  clearFromLocalStorage();
}

function clearFromLocalStorage(){
  localStorage.clear();
}

//filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}
