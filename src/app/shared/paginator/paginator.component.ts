import { Component, Input, ViewChild, Output, EventEmitter, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { PagerService } from '../services/pager.service';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input('length') length: number;
  @Input('pageSize') pageSize: number;
  @Output('onPageChange') onChange = new EventEmitter<number>();
  public chevronRight = faChevronRight;
  public chevronLeft = faChevronLeft;
  public pages: number[];


  constructor(public pagerService: PagerService) {

  }
  ngOnChanges() {

    if (this.length) {
      this.getPages(0);
    }
  }
  ngAfterViewInit(): void {

    if (this.length) {
      this.getPages(0);
    }
  }

  public handlePage(page: number) {
    this.paginator.pageIndex = page;
    this.onChange.emit(page);
    this.getPages(page);
  }

  public getPages(page: number) {
    this.pages = this.pagerService.getPage(this.length, page, this.pageSize);
    console.log(this.pages)
  }

}
