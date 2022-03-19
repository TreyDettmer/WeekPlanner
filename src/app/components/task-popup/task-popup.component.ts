import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskInfo } from 'src/app/models/task-info';

@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.css']
})
export class TaskPopupComponent implements OnInit {

  taskInfo:TaskInfo = {
    name: "ExampleTask",
    start: "00:00",
    end: "23:30",
    color: 0xe66465,
    completed: false,
    notes: "",
    numberStart: 0,
    numberEnd: 2330
  }

  firstName:string = "";
  dayOfWeek:string = "";
  taskName:string = "";
  returnedData:object = {
    data : {
      dayOfWeek : this.dayOfWeek,
      taskName : this.taskName
    }
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    this.dayOfWeek = data.dayOfWeek;
    this.taskInfo.name = data.name;
    this.taskInfo.start = data.start;
    this.taskInfo.end = data.end;
    this.taskInfo.color = data.color;
    this.taskInfo.completed = data.completed;
    this.taskInfo.notes = data.notes;
    this.taskInfo.numberStart = data.numberStart;
    this.taskInfo.numberEnd = data.numberEnd;
   }

  ngOnInit(): void {
  }


}
