import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';



//importacion de componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { ClienteAddComponent }  from './components/cliente-add.component';
import { ProductoAddComponent} from './components/producto-add.component';
import { ProductoListComponent} from './components/producto-list.component';
import { ProductoDetailComponent} from './components/producto-detail.component';
import { ProductoEditComponent} from './components/producto-edit.component';
import { IndicadoresComponent} from './components/indicadores.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ClienteAddComponent,
    ErrorComponent,
    ProductoAddComponent,
    ProductoListComponent,
    ProductoEditComponent,
    ProductoDetailComponent,
    IndicadoresComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule

  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
