import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input('buttons') buttons: string[];
  @Output('active') active = new EventEmitter<boolean[]>();
  public activeButtons: boolean[];

  constructor() {
  }

  ngOnInit(): void {
    this.activeButtons = new Array(this.buttons.length).fill(false);
    this.activeButtons[0] = true;
    this.active.emit(this.activeButtons);

  }

  public changeActive(index: number) {
    this.activeButtons.fill(false);
    this.activeButtons[index] = true;
    this.active.emit(this.activeButtons);
  }

}
