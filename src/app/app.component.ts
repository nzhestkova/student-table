import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  mode = true;
  searchRequest: string;
  removingMode: boolean;
  dateFiltrationInterval: string[];
  markFiltrationInterval: number[];
  onChange(): void {
    this.mode = !this.mode;
  }
  search(line: string): void {
    this.searchRequest = line;
  }
  isRemoving(mode: boolean): void {
    this.removingMode = mode;
  }
  set_FiltrationInterval(interval: string[]): void {
    this.dateFiltrationInterval = interval;
  }
  set_MarkFiltrationInterval(interval: number[]): void {
    console.log(interval);
    this.markFiltrationInterval = [+interval[0], +interval[1]];
  }
}
