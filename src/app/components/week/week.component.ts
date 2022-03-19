import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DayComponent } from '../day/day.component';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  @Input() title : string = "Week1";

  @ViewChild('days') daysDiv : any;

  constructor() { }

  ngOnInit(): void {
    this.LoadFromLocalStorage();
  }

  ngAfterViewInit()
  {
    this.daysDiv.nativeElement.addEventListener("scroll",this.UpdateDayPicker);
   
  }

  LoadFromLocalStorage()
  {
    if (localStorage.getItem("hasData") != null)
    {
      this.title = localStorage.getItem("weekTitle")!;
    }
  }

  SaveWeekToLocalStorage()
  {
    localStorage.setItem("weekTitle",this.title);
    if (!localStorage.getItem("hasData"))
    {
      localStorage.setItem("hasData","true");
    }
    console.log("updated local storage")
  }

  scroll(el :HTMLElement,  dayComponent : DayComponent)
  {
    let day_picker = document.getElementsByClassName('day-picker')[0];
    for (let i = 0; i < day_picker.children.length; i++)
    {
      let child = day_picker.children[i];
      if (child != el)
      {
        child.classList.remove("active");
      }
    }
    el.classList.add("active");
    
    dayComponent.dayContainer.nativeElement.scrollIntoView();
    let test = document.getElementsByClassName("days")[0];
    console.log("client width: " + test.clientWidth)
    console.log("scroll left: " + document.getElementsByClassName("days")[0].scrollLeft);
    console.log("scroll width: " + document.getElementsByClassName("days")[0].scrollWidth);
    let percent = document.getElementsByClassName("days")[0].scrollWidth / 4;
    console.log("Calculated percent: " + percent)
    
  }

  UpdateDayPicker()
  {
    let index = Math.floor((document.getElementsByClassName("days")[0].scrollLeft + (document.getElementsByClassName("days")[0].clientWidth/2)) / document.getElementsByClassName("days")[0].clientWidth);
    console.log(index)
    let day_picker = document.getElementsByClassName('day-picker')[0];
    for (let i = 0; i < day_picker.children.length; i++)
    {
      let child = day_picker.children[i];
      if (i == index)
      {
        child.classList.add("active");

      }
      else
      {
        child.classList.remove("active");
      }
    }
    
    console.log("client width: " + document.getElementsByClassName("days")[0].clientWidth)
    console.log("scroll left: " + document.getElementsByClassName("days")[0].scrollLeft);
    console.log("scroll width: " + document.getElementsByClassName("days")[0].scrollWidth);
    let percent = document.getElementsByClassName("days")[0].scrollWidth / 4;
    console.log("Calculated percent: " + percent)
  }

}
