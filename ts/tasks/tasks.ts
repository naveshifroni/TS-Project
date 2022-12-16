import { Utils } from "./../utils.js";
import { Status } from "./status.js";

interface taskType {
  description: string;
  status: Status;
  endDate: string;// נוסיף לטיפוס המשימה תאריך סיום- בונוס
  timeStamp: string;

}



export class Task implements taskType {
  //props:
  description: string;
  status: Status;
  endDate: string; 
  timeStamp = Utils.currentDateString();
  
  //constructor:
  constructor(description: string, endDate: string, status: Status = Status.Uncompleted) {
    this.description = description;
    this.status = status;
    this.endDate = endDate;
  }
  //methods
  toString() {
    return `description: ${this.description} status: ${this.status}`;
  }
}
