import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';

type character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {name: string, url: string};
  location: {name: string, url: string};
  image: string;
  episode: string[];
  url: string;
  created: string;
}

@Component({
  standalone: true,
  imports: [ MatTableModule, RouterModule, NgIf ],
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css']
})

export class PersonajeComponent {
  http = inject(HttpClient)
  displayedColumns: string[] = ['episode'];
  dataSource = [];
  character: character = {
    id: 0,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {name: '', url: ''},
    location: {name: '', url: ''},
    image: '',
    episode: [],
    url: '',
    created: '',
  }

  public id: any = '';

  constructor( private route: ActivatedRoute ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get('https://rickandmortyapi.com/api/character/'+this.id)
      .subscribe((data: any) => {
        // console.log(data)
        this.character = data
        this.dataSource = data.episode
      })
  }
}
