import { Task } from "./tasks.js";
import { tm } from "./task-manager.js";
import { Status } from "./status.js";
import { Utils } from "../utils.js";
const tasksDiv = document.getElementById("tasks") as HTMLDivElement;
const todoDescription = document.getElementById(
  "todo-description"
) as HTMLInputElement;
const btnAddTodo = document.getElementById("btn-add-todo") as HTMLButtonElement;
const endDateInput = document.getElementById('add-date') as HTMLInputElement;// אינפוט לתאריך סיום- בונוס
const clearButton = document.getElementById('clear-button') as HTMLDivElement;
const validate = document.getElementById('validate') as HTMLDivElement;





btnAddTodo.addEventListener("click", () => {
    if(endDateInput.value === ''){
     validate.classList.remove('d-none');
    }
    else{
      
     validate.classList.add('d-none');
    let dateString = endDateInput.value;
    let text = todoDescription.value;
    let task = new Task(text, dateString);
   
    tm.addTask(task); // מבצעים שמירה בלוקאל סטורג' באמצעות המתודה אד טאסק- בונוס
    console.log(task);
     //add the task to tasksDiv
    addTaskToHTML(task);
    }
  });
  

function addTaskToHTML(task: Task) {
  let row = document.createElement("div");
  row.classList.add("task", "row", "bg-primary","d-flex","flex-wrap", "row-list-check-box");
  row.id = task.timeStamp;
  let input = document.createElement("input");
  input.classList.add("col-8");
  input.placeholder = "description";
  input.disabled = true; //when edit is clicked => disable = false
  input.value = task.description;

  input.addEventListener("input", () => {
    task.description = input.value;
    tm.updateTask(task);
    
  });

  let btnEdit = document.createElement("button");// כפתור עריכה
  btnEdit.classList.add("btn", "btn-warning", "col", "text-light");
  btnEdit.innerHTML = 'Edit: <i class="bi bi-pencil-square"></i>';
  btnEdit.addEventListener("click", () => {
    input.disabled = !input.disabled;
    
  });

  let btnDelete = document.createElement("button");// כפתור מחיקה
  btnDelete.classList.add("btn", "btn-danger", "col");
  btnDelete.innerHTML = 'Delete: <i class="bi bi-trash3-fill"></i>';
  btnDelete.addEventListener("click", () => {
    tm.removeTask(task.timeStamp);
    deleteTaskFromHTML(task);
  });

  let completeTaskCheck = document.createElement('button');// כפתור לסימון אם השלמנו את המשימה
  completeTaskCheck.classList.add("btn", "btn-primary", "col");
  completeTaskCheck.innerHTML = 'Completed:';
  let checked = document.createElement('input');
 
  checked.type = 'checkbox';
  completeTaskCheck.appendChild(checked);

   if(task.status === Status.Uncompleted){
  checked.checked= false;  
  }
else if( task.status === Status.Completed ){
   completeTaskCheck.classList.remove('btn-primary');
    completeTaskCheck.classList.add('btn-secondary');
    
  checked.checked= true;  
}


  checked.addEventListener('click',()=>{
  

    if(task.status === Status.Uncompleted){
    completeTaskCheck.classList.remove('btn-primary');
    completeTaskCheck.classList.add('btn-secondary');
     checked.checked = true;
   
    task.status = Status.Completed;
    tm.updateTask(task);
    return;
    }
    else{

       completeTaskCheck.classList.remove('btn-secondary');
    completeTaskCheck.classList.add('btn-primary');
   checked.checked = false;
  
    task.status = Status.Uncompleted;
     tm.updateTask(task);
    }

 
  }); 
  
  
 let dateDate = new Date(task.endDate); 
 let current = new Date();
 let dateDisplay = dateDate.toLocaleDateString();

  let endDateDiv = document.createElement('div');
  endDateDiv.classList.add('col','btn','btn-success');
  endDateDiv.innerHTML=  `Dead line: ${dateDisplay}`;


 if( dateDate<current ){  // אם עבר התאריך נצבע אותיות באדום -בונוס
  input.style.color='red';
 }

  row.appendChild(input);
  row.appendChild(btnEdit);
  row.appendChild(btnDelete);
  row.appendChild(completeTaskCheck);
  row.appendChild(endDateDiv) ;
  tasksDiv.appendChild(row);
}

function deleteTaskFromHTML(task: Task) {
  document.getElementById(task.timeStamp)?.remove();
}

clearButton.addEventListener('click',()=>{// נאפשר סינון ומחיקה מתצוגה של משימות שהושלמו-בונוס
  tasksDiv.innerHTML="";
  const strArr = localStorage.getItem("tasks") ?? "[]";
  
  const tasksFromDisk: Task[]= JSON.parse(strArr);

  const uncompletedArr = tasksFromDisk.filter((task) => task.status===Status.Uncompleted);
  console.log(uncompletedArr);

for (const o of uncompletedArr){
  addTaskToHTML(o);
}
 
const backToDisk = JSON.stringify(uncompletedArr);
localStorage.setItem('tasks', backToDisk)

})



function init (){// אתחול של העמוד שטוען את המטלות השמורות בלוקאל סטורג'- בונוס
  const strArray = localStorage.getItem("tasks") ?? "[]";

  const tasksFromDisk: Task[]= JSON.parse(strArray);

 
  for (const o of tasksFromDisk){
    addTaskToHTML(o);
  };

}

init();