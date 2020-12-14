let data = {
    part0: [],
    part1: [],
    part2: []
  };
  
  function closeForm() {
    nameTask.value = '';
    taskDescription.value = '';
    $newTask.classList.remove('visible')
    }
  function addFormRedit(mass) {
    let $reditButton = document.querySelectorAll('.redit');
    for (let i = 0; i < $reditButton.length; i++) {
        $reditButton[i].addEventListener('click', function () {
            $reditTaskForm.classList.add('visible')
            $nameTaskRedit.value = mass[i].name;
            $taskDescriptionRedit.value = mass[i].description;
            $customSelectRedit.value = mass[i].priority;
            $btnReditTask.setAttribute("data-number", i)
          })}
  }

  function reditTask(mass, tableDrawFunction) {
      mass[$btnReditTask.dataset.number].name = $nameTaskRedit.value;
      mass[$btnReditTask.dataset.number].description = $taskDescriptionRedit.value;
      mass[$btnReditTask.dataset.number].priority = $customSelectRedit.value;
      tableDrawFunction(mass)
    }
  

  function deleteTask(mass, tableDrawFunction) {
    let $deleteTask = document.querySelectorAll('.delete');
    for (let i = 0; i < $deleteTask.length; i++) {
        $deleteTask[i].addEventListener('click', function() {
          let deleteTask = mass.splice(i, 1);
          data.part2.push(deleteTask[0])
          tableDrawFunction(mass)
        })
    }
    }

    function finishedTask() {
      let $finishedTask = document.querySelectorAll('.finished');
      for (let i = 0; i < $finishedTask.length; i++) {
          $finishedTask[i].addEventListener('click', function() {
            
            let finishedTask = data.part0.splice(i, 1);
            data.part1.push(finishedTask[0])
            tableDrawCurrentTask(data.part0)
           
          })
      }
      }


      function recoverTask() {
        let $recoverTask = document.querySelectorAll('.recover');
        for (let i = 0; i < $recoverTask.length; i++) {
            $recoverTask[i].addEventListener('click', function() {
              
              let recoverTask = data.part2.splice(i, 1);
              data.part0.push(recoverTask[0])
              tableDrawDeleteTask(data.part2)
             
            })
      }
      }


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
  closeForm();
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
  closeForm();
}

function closeReditForm() {
  $reditTaskForm.classList.remove('visible')
}


let $btnReditTask = document.querySelector('.btn-redit-task')




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
    tableDrawCurrentTask(data.part0);
})();

for(let i = 0; i < $btn.length; i++){
	$btn[i].addEventListener('click', function(){
    toggler('.tab', i, 'active');
    if(i === 0) {
      tableDrawCurrentTask(data['part' + i]);

      
    }
    else if(i === 1) {
      tableDrawFinishedTask(data['part' + i]);
    }
    else if(i === 2) {
      tableDrawDeleteTask(data['part' + i]);
    }
  })
}
// Переменные редактирования
let $nameTaskRedit = document.querySelector('.name-task-redit');
let $taskDescriptionRedit = document.querySelector('.task-description-redit');
let $customSelectRedit = document.querySelector(".custom-select-redit");


let $closeReditBtn = document.querySelector('.btn-close-redit')
let $reditTaskForm = document.querySelector('.redit-task');
//Функция закрытия
$closeReditBtn.addEventListener('click', function(event) {
  event.preventDefault();
  closeReditForm()
})



let $addTaskbutton = document.querySelector('.add-task')
let $newTask = document.querySelector('.new-task')
$addTaskbutton.addEventListener('click', function() {
    
    $newTask.classList.add('visible')
    
})

let $addNewTask = document.querySelector('.add-new-task')
let nameTask = document.querySelector('.name-task')
let taskDescription = document.querySelector('.task-description')
let taskSelect = document.querySelector('.custom-select')
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
  data.part0.push(newTask)
  tableDrawCurrentTask(data.part0)
  nameTask.value = '';
  taskDescription.value = '';
  closeForm()
}
}
)






let $closeForm = document.querySelector('.close-form')

$closeForm.addEventListener("click", function(event) {
  event.preventDefault();
  closeForm();
}
)

$btnReditTask.addEventListener("click", function(event) {
  event.preventDefault();
  let nubmerActiveTab = document.querySelector(".active");

  if(nubmerActiveTab.dataset.activeTab == 1) {
  reditTask(data.part0, tableDrawCurrentTask);
  }
  else if (nubmerActiveTab.dataset.activeTab == 2) {
    reditTask(data.part1, tableDrawFinishedTask);
  }
})

nameTask.addEventListener('input', function() {

  nameTask.classList.remove('warning');
});


    
    // Заблокируйте кнопку отправки здесь
