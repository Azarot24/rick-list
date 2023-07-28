import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

@Component({
  standalone: true,
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrls: ['./lugar.component.css']
})
export class LugarComponent {
  http = inject(HttpClient)
  location: Location = {
    id: 0,
    name: '',
    type: '',
    dimension: '',
    residents: [],
    url: '',
    created: '',
  }

  public id: any = '';

  constructor( private route: ActivatedRoute ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get('https://rickandmortyapi.com/api/location/'+this.id)
      .subscribe((data: any) => {
        // console.log(data)
        this.location = data
      })
  }
}
