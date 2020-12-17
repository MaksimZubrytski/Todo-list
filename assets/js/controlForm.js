export default function controlForm() {
  let $newTask = document.querySelector('.new-task');
  let nameTask = document.querySelector('.name-task');
  let taskDescription = document.querySelector('.task-description');


let $reditTaskForm = document.querySelector('.redit-task');

      function closeForm() {
        nameTask.value = '';
        taskDescription.value = '';
        $newTask.classList.remove('visible')
        }

      function closeReditForm() {
        $reditTaskForm.classList.remove('visible')
      }

      function toggle(event){
        
        if(event === 'closeForm'){
          closeForm()
      }
        if(event === 'closeReditForm'){
            closeReditForm()
        }
        }
        return {
            toggle: toggle
        }

}