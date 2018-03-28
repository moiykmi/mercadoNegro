import { Component,Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService} from '../services/producto.service';
import { Producto} from '../models/producto';
import { LoginComponent } from './login.component';



@Component({
	selector: 'producto-list',
	templateUrl: '../views/producto-list.html',
	providers: [ProductoService]
})

export class ProductoListComponent{
	public titulo: string;
	public producto : Producto[];
	public confirmado;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _productoService: ProductoService
		

	){
		this.titulo = 'Listado de productos';
		this.confirmado = null;
	}

	ngOnInit(){
		console.log('productos-list.component.ts cargado');

		this.getProductos();
	}

	getProductos(){
		this._productoService.getProductos().subscribe(
			result => {
					

					if(result.code!=200){
						console.log(1);
						console.log(result);
					}else{
						this.producto = result.data;
						console.log(2);
						console.log(this.producto);
					}
				},
				error => {
					console.log(3);
					console.log(<any>error);
				}
		);
	}

	
	borrarConfirm(_id){
		this.confirmado = _id;
	}

	cancelarConfirm(){
		this.confirmado = null;
	}

	onDeleteProducto(producto){
		console.log(producto);
		this._productoService.deleteProducto(producto).subscribe(
			response =>{
					console.log(response);
					if(response.code == 200){
							this.getProductos();
						}else{
							alert('Error al borrar producto');
						}
				},
				error=>{
					console.log(<any>error);
				}
		);
	}
}