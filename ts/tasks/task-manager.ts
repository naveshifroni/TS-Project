import { Task } from "./tasks.js";
export class TaskManager {
  //props:
  strArr = localStorage.getItem("tasks") ?? "[]";
  tasks: Task[] = JSON.parse(this.strArr);

  //methods:
  addTask(task: Task) {

    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  removeTask(timeStamp: string) {
    //this.tasks = this.tasks.filter((t) => t.timeStamp != id);
    let index = this.tasks.findIndex((t) => t.timeStamp === timeStamp);
    this.tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
 
  updateTask(task: Task) {
    //this.tasks = this.tasks.filter((t) => t.timeStamp != id);
    // remove one element (without deleting the entire array)
    let index = this.tasks.findIndex((t) => t.timeStamp === task.timeStamp);
    this.tasks.splice(index, 1, task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
 
}

export let tm = new TaskManager();
