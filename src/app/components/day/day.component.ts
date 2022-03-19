import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskPopupComponent } from 'src/app/components/task-popup/task-popup.component';
import { EditTaskPopupComponent } from '../edit-task-popup/edit-task-popup.component';
import { TaskInfo } from 'src/app/models/task-info';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() dayOfWeek:string = "test";

  @ViewChild('day') dayContainer : any;

  currentTaskIndex:number = 0;

  titleColor:string = "#BBCDE5";
  tasks:TaskInfo[] = [];


  constructor(private dialogRef : MatDialog) {

  }

  ngOnInit(): void {
    this.LoadFromLocalStorage();
  }

  ngAfterViewInit() : void {
  }

  LoadFromLocalStorage()
  {
    if (localStorage.getItem("hasData") != null)
    {
      if (localStorage.getItem(this.dayOfWeek) != null)
      {  
        let tasksJson = JSON.parse(localStorage.getItem(this.dayOfWeek) || "[]");
        for (let i = 0; i < tasksJson.length; i++)
        {
          let task = tasksJson[i];
          this.tasks.push({
            name: task.name,
            start: task.start,
            end: task.end,
            color: task.color,
            completed: false,
            notes: task.notes,
            numberStart: task.numberStart,
            numberEnd: task.numberEnd
          });
          this.titleColor = "#91a2b8";
        }
      }
    }
  }

  SaveToLocalStorage()
  {
    let taskArray = [];
    for (let i = 0; i < this.tasks.length; i++)
    {
      taskArray.push({
        name: this.tasks[i].name,
        start: this.tasks[i].start,
        end: this.tasks[i].end,
        color: this.tasks[i].color,
        completed: false,
        notes: this.tasks[i].notes,
        numberStart: this.tasks[i].numberStart,
        numberEnd: this.tasks[i].numberEnd
      });
      this.titleColor = "#91a2b8";
    }
    localStorage.setItem(this.dayOfWeek,JSON.stringify(taskArray));
    if (!localStorage.getItem("hasData"))
    {
      localStorage.setItem("hasData","true");
    }
  }

  openDialog() {
    let temp = this.dialogRef.open(TaskPopupComponent,{
      data : {
        dayOfWeek: this.dayOfWeek,
        name: "ExampleTask",
        start: "00:00",
        end: "23:00",
        color: 0xe66465,
        completed: false,
        notes: "",
        numberStart: 0,
        numberEnd: 2300
      }     
    });

    temp.afterClosed().subscribe(result => {
      if (result != null)
      {
        try
        {
          if (result.name != null && result.start != "" && result.end != "" && result.color != null)
          {

            let start = parseInt(result.start.replace(":",""));
            let end = parseInt(result.end.replace(":",""));
            if (end <= start)
            {
              alert("End time must be later than start time.")
              return;
            }
            else if (result.name == "")
            {
              alert("Task must have a name.")
              return;
            }

            for (let i = 0; i < this.tasks.length; i++)
            {
              if (this.tasks[i].name == result.name && this.tasks[i].color == result.color)
              {
                alert("Can't have task with same name and color as other task");
                return;
              }
            }

            this.tasks.push({
              name: result.name,
              start: result.start,
              end: result.end,
              color: result.color,
              completed: false,
              notes: result.notes,
              numberStart: start,
              numberEnd: end
            });
            this.titleColor = "#91a2b8";
            this.SaveToLocalStorage();
          }
        }
        catch
        {
          console.log("result was null")
        }

        
      }
      else
      {
        console.log("result was null");
      }
      
    });
  }

  EditTask(id:number)
  {
    this.currentTaskIndex = id;
    let temp = this.dialogRef.open(EditTaskPopupComponent,{
      data : {
        dayOfWeek: this.dayOfWeek,
        name: this.tasks[id].name,
        start: this.tasks[id].start,
        end: this.tasks[id].end,
        color: this.tasks[id].color,
        completed: this.tasks[id].completed,
        notes: this.tasks[id].notes,
        numberStart: this.tasks[id].numberStart,
        numberEnd: this.tasks[id].numberEnd

      }     
    });

    temp.afterClosed().subscribe(result => {
      if (result != null)
      {
        try {
          if (result.completed == true)
          {
            
            if (this.currentTaskIndex > -1) {
              this.tasks.splice(this.currentTaskIndex, 1);
              if (this.tasks.length == 0)
              {
                this.titleColor = "#BBCDE5";
              }
              this.SaveToLocalStorage();
              
            }
            return;
          }
        }
        catch
        {

        }
        try
        {
          if (result.name != null && result.start != "" && result.end != "" && result.color != null)
          {

            let start = parseInt(result.start.replace(":",""));
            let end = parseInt(result.end.replace(":",""));
            if (end <= start)
            {
              alert("End time must be later than start time.")
              return;
            }
            else if (result.name == "")
            {
              alert("Task must have a name.")
              return;
            }

            this.tasks[this.currentTaskIndex] = {
              name: result.name,
              start: result.start,
              end: result.end,
              color: result.color,
              completed: false,
              notes: result.notes,
              numberStart: start,
              numberEnd: end
            };

            this.SaveToLocalStorage();
          }
        }
        catch
        {
          console.log("result was null3")
        }

        
      }
      else
      {
        console.log("result was null2");
      }
      
    });
  }

}
