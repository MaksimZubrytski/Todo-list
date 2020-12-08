let data = {
    part0: [
      {
        name: 'Помыть пол',
        description: 'Помыть полы в доме',
        priority: 'Высокий'
      }, {
        name: 'Помыться',
        description: 'Помыться',
        priority: 'Высокий'
      }, {
        name: 'Побриться',
        description: 'Побриться',
        priority: 'Высокий'
      }
    ],
    part1: [
      {
        name: 'Побриться',
        description: '---',
        priority: 'Высокий'
      }
    ],
    part2: [
      {
        name: 'Помыться',
        description: '---',
        priority: 'Высокий'
      }
    ]
  };
  

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
  for(let el of mass){
    $table.innerHTML += `<tr>
        <td>${el.name}</td>
        <td>${el.description}</td>
        <td>${el.priority}</td>
        <td><button class="redit">Редактировать</button>
            <button class="finished">Выполнено</button>
            <button class="delete">Удалить</button>
        </td>
      </tr>`;
  }
  deleteTask(data.part0, tableDrawCurrentTask)
  finishedTask()
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
  deleteTask(data.part1, tableDrawFinishedTask)
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

  let newTask = {
    name: nameTask.value,
    description: taskDescription.value,
    priority: taskSelect.value
  };
  data.part0.push(newTask)
  tableDrawCurrentTask(data.part0)
  nameTask.value = '';
  taskDescription.value = '';
}
)

let $closeForm = document.querySelector('.close-form')

$closeForm.addEventListener("click", function(event) {
  event.preventDefault();
  nameTask.value = '';
  taskDescription.value = '';
  $newTask.classList.remove('visible')
}
)

let $reditButton = document.querySelectorAll('.redit');
let $reditTaskForm = document.querySelectorAll('.redit-task');
for (let i = 0; i < $reditButton.length; i++) {
    $reditButton[i].addEventListener('click', function () {
      $reditTaskForm.classList.add('add-task')
        console.log(data.part0[i].name)
        console.log(data.part0[i].description)
        console.log(data.part0[i].priority)
    })
}