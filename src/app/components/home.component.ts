import {Component} from '@angular/core';
import {Router , ActivatedRoute , Params} from '@angular/router';
import {ValoresService} from '../services/valores.service';


@Component({
	selector : 'home',
	templateUrl : '../views/home.html',
	providers : [ValoresService]
})

export class HomeComponent{
	public titulo:string;
	public agregar:boolean
	

	constructor(
		private _valoresService:ValoresService,
		private _route:ActivatedRoute,
		private _router : Router
		){
		this.titulo='Bienvenido a la tiendita de alexis';
		this.agregar= false;
	}

	ngOnInit(){
		console.log('home.component cargado');
		this.agregar=false;


	}

	cambiar(valor){
		this.agregar=valor;
	}
}