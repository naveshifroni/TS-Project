import { Utils } from "./../utils.js";
import { Status } from "./status.js";
export class Task {
    //props:
    description;
    status;
    endDate;
    timeStamp = Utils.currentDateString();
    //constructor:
    constructor(description, endDate, status = Status.Uncompleted) {
        this.description = description;
        this.status = status;
        this.endDate = endDate;
    }
    //methods
    toString() {
        return `description: ${this.description} status: ${this.status}`;
    }
}
