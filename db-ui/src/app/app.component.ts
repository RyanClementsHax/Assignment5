import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputState: any;
  states = ["Florida", "Georgia"];

  constructor(private http: HttpClient) {}

  ngOnInit() { 
    this.http.get<Array<string>>('/list').subscribe(data => {
      this.states = data;
    });
  }

  addState() {
    this.states.push(this.inputState);
    this.inputState = '';

    this.http.post('/add', this.inputState);
  }
}
