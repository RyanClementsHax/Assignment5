import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputSighting: any = { person: '', location: '', sighted: '' };
  selectedFlower: any = { comname: '', species: '', genus: '', sightings: [] };
  flowers = [
    { 
      comname: "Lily",
      genus: "hello",
      species: "world",
      sightings: [
        {
          person: "mary",
          location: "garden",
          sighted: "12/06/1996"
        },
        {
          person: "joseph",
          location: "eden",
          sighted: "12/06/1998"
        }
      ]
    }, 
    {
      comname: "Rose",
      genus: "what",
      species: "jesus",
      sightings: [
        {
          person: "adam",
          location: "nazarath",
          sighted: "2/09/1986"
        },
        {
          person: "eve",
          location: "eve",
          sighted: "11/07/1998"
        }
      ]
    }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() { 
    this.http.get<any>('/list').subscribe(data => {
      this.flowers = data;
    });
  }

  addSighting() {
    this.selectedFlower.sightings.push(this.inputSighting);
    this.inputSighting = { person: '', location: '', sighted: '' };

    this.http.post('/update', this.selectedFlower);
  }

  updateFlower() {
    this.http.post('/update', this.selectedFlower);
  }

  selectFlower(flower: any) {
    this.selectedFlower = flower;
  }
}
