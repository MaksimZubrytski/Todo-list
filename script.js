let data = {
    part0: [
      {
        firstName: 'Помыть пол',
        lastName: 'Помыть полы в доме',
        age: 'Высокий'
      }, {
        firstName: 'Помыть пол',
        lastName: 'Помыть полы в доме',
        age: 'Высокий'
      }, {
        firstName: 'Помыть пол',
        lastName: 'Помыть полы в доме',
        age: 'Высокий'
      }
    ],
    part1: [
      {
        firstName: 'Побриться',
        lastName: '---',
        age: 'Высокий'
      }, {
        firstName: 'Побриться',
        lastName: '---',
        age: 'Высокий'
      }, {
        firstName: 'Побриться',
        lastName: '---',
        age: 'Высокий'
      }
    ],
    part2: [
      {
        firstName: 'Помыться',
        lastName: '---',
        age: 'Высокий'
      }, {
        firstName: 'Помыться',
        lastName: '---',
        age: 'Высокий'
      }, {
        firstName: 'Помыться',
        lastName: '---',
        age: 'Высокий'
      }
    ]
  };

  function tableDraw(mass){
	let $table = document.querySelector('.table-content');
	$table.innerHTML = '';
  for(let el of mass){
    $table.innerHTML += `<tr>
        <td>${el.firstName}</td>
        <td>${el.lastName}</td>
        <td>${el.age}</td>
        <td><button class="redit">Редактировать</button>
                        <button>Выполнено</button>
                        <button>Удалить</button>
                        </td>
      </tr>`;
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
    tableDraw(data.part0);
})();

for(let i = 0; i < $btn.length; i++){
	$btn[i].addEventListener('click', function(){
    toggler('.tab', i, 'active');
    tableDraw(data['part' + i]);
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
    firstName: nameTask.value,
    lastName: taskDescription.value,
    age: taskSelect.value
  };
  data.part0.push(newTask)
  tableDraw(data.part0)
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

let $redit = document.querySelectorAll('.redit');

for (let el of $redit) {
    console.log('выведи в консоль ', el)
}