import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AppointmentModel, AppointmentDisplayModel } from '../models/appointment.model';
import * as moment from 'moment';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input('appointments') appointments: AppointmentDisplayModel[];
  @Output('clickDay') clickDay = new EventEmitter<Date>();
  public weekdays: string[];
  public months: string[];
  public currentMonth: { index: number, name: string, firstDay: number };
  public month: { index: number, name: string, firstDay: number };
  public currentDay: number;
  public currentIndex: number;
  public currentDate: Date;
  public today: Date = new Date();
  public days: number;
  public calendarDays: { date: Date, nrOfAppointments: number }[] = [];
  public leftArrow = faChevronLeft;
  public rightArrow = faChevronRight;
  public clickedDay: Date;

  constructor() { }

  ngOnInit(): void {
    let date = new Date();
    this.weekdays = moment.weekdaysShort();
    this.months = moment.months();
    this.currentMonth = { index: date.getMonth(), name: this.months[date.getMonth()], firstDay: this.getFirstDay(date.getMonth(), date.getFullYear()) };
    this.currentIndex = date.getMonth();
    this.month = this.currentMonth;
    this.currentDay = date.getDate();
    console.log(this.currentDay + ' ' + this.currentMonth);
    this.currentDate = this.today;
    this.days = this.daysInMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());
    this.renderDays();

  }
  ngOnChanges(): void {
    if (this.currentMonth) {
      this.renderDays();
    }
  }
  public getCurrentMonth(date: Date) {
    this.currentMonth = { index: date.getMonth(), name: this.months[date.getMonth()], firstDay: this.getFirstDay(date.getMonth(), date.getFullYear()) };
  }
  onPrevious() {
    this.month = this.getMonth(--this.currentIndex);
    const day = 1;
    const month = this.currentDate.getMonth() - 1;
    const year = this.currentDate.getFullYear();
    this.currentDate = new Date(year, month, day);
    this.days = this.daysInMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());
    this.getCurrentMonth(this.currentDate);
    this.renderDays();

  }
  onNext() {
    this.month = this.getMonth(++this.currentIndex);
    const day = 1;
    const month = this.currentDate.getMonth() + 1;
    const year = this.currentDate.getFullYear();
    this.currentDate = new Date(year, month, day);
    this.days = this.daysInMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());
    this.getCurrentMonth(this.currentDate);
    this.renderDays();

  }
  renderDays() {
    this.calendarDays = [];
    for (let i = 0; i < this.currentMonth.firstDay; i++) {
      this.calendarDays.push(null);
    }
    for (let j = 1; j <= this.days; j++) {
      let date = new Date(this.currentDate.getFullYear(), this.currentMonth.index, j);
      let day = { date: date, nrOfAppointments: this.countAppointments(date, this.appointments) }
      this.calendarDays.push(day);
    }
    while (this.calendarDays.length % 7 != 0) {
      this.calendarDays.push(null);
    }

  }
  public getMonth(index: number) {
    return { index: index, name: this.months[index], firstDay: this.getFirstDay(this.currentDate.getMonth(), this.currentDate.getFullYear()) };
  }
  public daysInMonth(iMonth, iYear): number {
    console.log(new Date(iYear, iMonth, 32).getDate());
    return 32 - (new Date(iYear, iMonth, 32).getDate());
  }
  public getFirstDay(month, year) {
    return new Date(year, month).getDay();
  };
  public getDateWithoutTime(date: Date) {
    let dateWithoutTime = date.setHours(0, 0, 0, 0);
    return new Date(dateWithoutTime);
  }
  public compareDates(d1: Date, d2: Date): boolean {
    return d1 && d2 ? this.getDateWithoutTime(d1).valueOf() == this.getDateWithoutTime(d2).valueOf() : false;
  }
  public countAppointments(d1: Date, appointments: AppointmentDisplayModel[]): number {
    let counter = 0;
    appointments.forEach(app => {
      if (this.getDateWithoutTime(new Date(app.date)).valueOf() == this.getDateWithoutTime(d1).valueOf())
        counter++;
    });
    return counter;

  }

  public onClickDay(date: Date) {
    if (date) {
      this.clickedDay = date;
      this.clickDay.emit(date);
    }
  }
}
