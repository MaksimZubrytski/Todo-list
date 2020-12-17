import controlForm from './controlForm.js';

const form = controlForm();

if(localStorage.getItem('todo-list')){
  let ls = localStorage.getItem('todo-list');

  todo = JSON.parse(ls);
  tableDrawCurrentTask(todo.currentTask)
}

let todo = {
    currentTask: [],
    finishedTask: [],
    deleteTask: []
};

function tableDrawCurrentTask(mass){
    let $table = document.querySelector('.table-content');
    $table.innerHTML = '';
    for(let i = 0; i < mass.length; i++){
      $table.innerHTML += `<tr>
          <td>${mass[i].name}</td>
          <td>${mass[i].description}</td>
          <td>${mass[i].priority}</td>
          <td><button class="redit">Редактировать</button>
              <button class="finished">Выполнено</button>
              <button class="delete" >Удалить</button>
          </td>
        </tr>`;
    }
    deleteTask(mass, tableDrawCurrentTask)
    finishedTask()
    addFormRedit(mass)
    form.toggle('closeReditForm')
}



function addFormRedit(mass) {
    let $reditButton = document.querySelectorAll('.redit');
    for (let i = 0; i < $reditButton.length; i++) {
        $reditButton[i].addEventListener('click', function () {
            $reditTaskForm.classList.add('visible')
            $nameTaskRedit.value = mass[i].name;
            $taskDescriptionRedit.value = mass[i].description;
            $customSelectRedit.value = mass[i].priority;
            $nameTaskRedit.classList.remove('warning');
            $btnReditTask.setAttribute("data-number", i)
          })}
}

function deleteTask(mass, tableDrawFunction) {
  let $deleteTask = document.querySelectorAll('.delete');
  for (let i = 0; i < $deleteTask.length; i++) {
      $deleteTask[i].addEventListener('click', function() {
        let deleteTask = mass.splice(i, 1);
        todo.deleteTask.push(deleteTask[0])
        tableDrawFunction(mass)
      })
  }
  }

function finishedTask() {
    let $finishedTask = document.querySelectorAll('.finished');
    for (let i = 0; i < $finishedTask.length; i++) {
        $finishedTask[i].addEventListener('click', function() {
          
          let finishedTask = todo.currentTask.splice(i, 1);
          todo.finishedTask.push(finishedTask[0])
          tableDrawCurrentTask(todo.currentTask)
          
        })
    }
}

function tableDrawFinishedTask(mass){
    let $table = document.querySelector('.table-content');
    $table.innerHTML = '';
    for(let el of mass){
        $table.innerHTML += `<tr>
            <td>${el.name}</td>
            <td>${el.description}</td>
            <td>${el.priority}</td>
            <td><button class="redit">Редактировать</button>
                <button class="delete">Удалить</button>
            </td>
            </tr>`;
    }
    deleteTask(mass, tableDrawFinishedTask)
    addFormRedit(mass)
    form.toggle('closeForm');
    form.toggle('closeReditForm')
    $addTaskbutton.classList.add('unvisible')
}

function tableDrawDeleteTask(mass){
    let $table = document.querySelector('.table-content');
    $table.innerHTML = '';
    for(let el of mass){
        $table.innerHTML += `<tr>
        <td>${el.name}</td>
        <td>${el.description}</td>
        <td>${el.priority}</td>
        <td><button class="recover">Восстановить</button>
        </td>
        </tr>`;
    }
    recoverTask();
    form.toggle('closeForm');
    form.toggle('closeReditForm')
    $addTaskbutton.classList.add('unvisible')
}

function recoverTask() {
    let $recoverTask = document.querySelectorAll('.recover');
    for (let i = 0; i < $recoverTask.length; i++) {
        $recoverTask[i].addEventListener('click', function() {
          
        let recoverTask = todo.deleteTask.splice(i, 1);
        todo.currentTask.push(recoverTask[0])
        tableDrawDeleteTask(todo.deleteTask)
        })
    }
}


let $btn = document.querySelectorAll('.tab');

function toggler (selector, id, modify) {
    let $elem = document.querySelectorAll(selector);
    for(let $el of $elem){
        $el.classList.remove(modify);
    }
    $elem[id].classList.add(modify);
}

(function init(){
    toggler('.tab', 0, 'active');
    tableDrawCurrentTask(todo.currentTask);
})();

for(let i = 0; i < $btn.length; i++){
    $btn[i].addEventListener('click', function(){
    toggler('.tab', i, 'active');
    if(i === 0) {
        tableDrawCurrentTask(todo.currentTask);
        $addTaskbutton.classList.remove('unvisible')
    }
    else if(i === 1) {
        tableDrawFinishedTask(todo.finishedTask);
    }
    else if(i === 2) {
        tableDrawDeleteTask(todo.deleteTask);
    }
    })
}
//Переменные для нового задания
let $addTaskbutton = document.querySelector('.add-task-button')
let $newTaskForm = document.querySelector('.new-task')
let $addNewTask = document.querySelector('.add-new-task')
let nameTask = document.querySelector('.name-task')
let taskDescription = document.querySelector('.task-description')
let taskSelect = document.querySelector('.custom-select')
//Переменные для редактируемого задания
let $btnReditTask = document.querySelector('.btn-redit-task');
let $nameTaskRedit = document.querySelector('.name-task-redit');
let $taskDescriptionRedit = document.querySelector('.task-description-redit');
let $customSelectRedit = document.querySelector(".custom-select-redit");
let $closeReditBtn = document.querySelector('.btn-close-redit')
let $reditTaskForm = document.querySelector('.redit-task');


//Открытие формы нового задания
$addTaskbutton.addEventListener('click', function() {
  $newTaskForm.classList.add('visible')
})

//Добавление нового задания
$addNewTask.addEventListener("click", function(event) {
  event.preventDefault();
  if(nameTask.value === '') {
      nameTask.classList.add('warning');
  }
  else {
      nameTask.classList.remove('warning');
      let newTask = {
          name: nameTask.value,
          description: taskDescription.value,
          priority: taskSelect.value
      };
  todo.currentTask.push(newTask)
  localStorage.setItem('todo-list', JSON.stringify(todo));
  tableDrawCurrentTask(todo.currentTask)
  nameTask.value = '';
  taskDescription.value = '';
  form.toggle('closeForm');
}})

nameTask.addEventListener('input', function() {
  nameTask.classList.remove('warning');
});

//Кнопка закрытия формы
let $closeFormButton = document.querySelector('.close-form')

$closeFormButton.addEventListener("click", function(event) {
    event.preventDefault();
    form.toggle('closeForm');
  })

//Редактирование задания
function reditTask(mass, tableDrawFunction) {
    mass[$btnReditTask.dataset.number].name = $nameTaskRedit.value;
    mass[$btnReditTask.dataset.number].description = $taskDescriptionRedit.value;
    mass[$btnReditTask.dataset.number].priority = $customSelectRedit.value;
    tableDrawFunction(mass)
}

$btnReditTask.addEventListener("click", function(event) {
  event.preventDefault();
  let nubmerActiveTab = document.querySelector(".active");
  if(!$nameTaskRedit.value) {
    $nameTaskRedit.classList.add('warning');
  }
  else {
      if(nubmerActiveTab.dataset.activeTab == 1) {
          reditTask(todo.currentTask, tableDrawCurrentTask);
          form.toggle('closeReditForm')
      }
      else if (nubmerActiveTab.dataset.activeTab == 2) {
          reditTask(todo.finishedTask, tableDrawFinishedTask);
          form.toggle('closeReditForm')
      }
  }
})
//Закрытие формы редактирования задания
$closeReditBtn.addEventListener('click', function(event) {
    event.preventDefault();
    form.toggle('closeReditForm')
})

$nameTaskRedit.addEventListener('input', function() {
    $nameTaskRedit.classList.remove('warning');
});



