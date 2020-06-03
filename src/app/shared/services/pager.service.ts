import { Injectable } from "@angular/core";

@Injectable()

export class PagerService {
  /**
   * @description calculates the pages to be displayed in the paginator
   * @param totalItems
   * @param currentPage
   * @param pageSize optional
   * @returns pages
   */
  public getPage(totalItems: number, currentPage: number, pageSize?: number): number[] {
    // calculate total pages
    let totalPages: number;
    let startPage: number, endPage: number;
    // create an array of pages to use in the pager component
    let pages: number[] = [];

    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    totalPages = Math.ceil(totalItems / pageSize);
    console.log(totalPages)

    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    for (var i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    // return pages array required by the view
    return pages;
  }
}