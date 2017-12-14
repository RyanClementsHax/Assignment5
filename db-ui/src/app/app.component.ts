import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputSighting: any = { PERSON: '', LOCATION: '', SIGHTED: '' };
  selectedFlower: any = { COMNAME: '', SPECIES: '', GENUS: '', SIGHTINGS: [] };
  oldName: any;
  flowers: any;

  constructor(private http: HttpClient) {}

  ngOnInit() { 
    this.http.get<any>('http://localhost:3000/').subscribe(data => {
      this.flowers = data;
    });
  }

  addSighting() {
    this.selectedFlower.SIGHTINGS.push(this.inputSighting);
    this.inputSighting.NAME = this.selectedFlower.COMNAME;

    console.log(this.inputSighting);

    this.http.post('http://localhost:3000/sightings', this.inputSighting).subscribe(() => {});

    this.inputSighting = { NAME: '', PERSON: '', LOCATION: '', SIGHTED: '' };
  }

  updateFlower() {
    this.http.post('http://localhost:3000/flowers', { newFlower: this.selectedFlower, oldName: this.oldName }).subscribe(() => {});
  }

  selectFlower(flower: any) {
    this.selectedFlower = { ...flower };
    this.oldName = this.selectedFlower.COMNAME;
  }
}
