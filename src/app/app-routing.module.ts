import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LugarComponent } from './pages/lugar/lugar.component';
import { PersonajeComponent } from './pages/personaje/personaje.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
  {
    path: '',
    component: ListadoComponent,
  },
  {
    path: 'character/:id',
    component: PersonajeComponent,
  },
  {
    path: 'location/:id',
    component: LugarComponent,
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
