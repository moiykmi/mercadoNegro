import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { LoginComponent } from './components/login.component';
import { ClienteAddComponent } from './components/cliente-add.component';
import { ProductoAddComponent} from './components/producto-add.component';
import { ProductoListComponent} from './components/producto-list.component';
import { ProductoDetailComponent} from './components/producto-detail.component';
import { ProductoEditComponent} from './components/producto-edit.component';


const appRoutes: Routes = [
	{path: '',component: LoginComponent},
	{path: 'home',component: HomeComponent},
	{path: 'producto-add',component:ProductoAddComponent},
	{path: 'producto-list',component:ProductoListComponent},
	{path: 'cliente-add',component: ClienteAddComponent},
	{path: 'login',component: LoginComponent},
	{path: 'producto-detail/:id',component: ProductoDetailComponent},
	{path: 'producto-edit/:id',component: ProductoEditComponent},
	{path: '**',component: ErrorComponent}


];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
