import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mode = false;
  searchRequest: string;
  onChange() {
    this.mode = !this.mode;
  }

  search(line: string) {
    this.searchRequest = line;
  }
}
