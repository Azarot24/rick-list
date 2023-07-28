import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

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
type info = {
  count: number,
  pages: number,
  next: string|null,
  prev: string|null
}

@Component({
  standalone: true,
  imports: [ MatTableModule, MatIconModule, RouterModule, NgIf ],
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
  http = inject(HttpClient)
  displayedColumns: string[] = ['ID', 'image', 'name', 'status', 'species', 'location', 'episode', 'detail']
  dataSource: character[] = []
  actualPage = '1'
  pagination: info = {
    count: 0,
    pages: 0,
    next: null,
    prev: null
  }

  ngOnInit() {
    this.http.get('https://rickandmortyapi.com/api/character')
      .subscribe((data: any) => {
        // console.log(data)
        this.dataSource = data.results
        this.pagination = data.info
      })
  }

  changePage(next: boolean) {
    let url: any = ''
    if(next){
      url = this.pagination.next
    }else{
      url = this.pagination.prev
    }
    this.http.get(url)
      .subscribe((data: any) => {
        this.dataSource = data.results
        this.pagination = data.info
        this.actualPage = url.slice(47)
      })
  }
}
