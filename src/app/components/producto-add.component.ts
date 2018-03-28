import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService} from '../services/producto.service';
import { Producto} from '../models/producto';
import { HomeComponent} from './home.component';



@Component({
	selector : 'producto-add',
	templateUrl : '../views/producto-add.html',
	providers: [ProductoService]
})

export class ProductoAddComponent{
	public titulo:string;
	public producto:Producto;
	public agregar:boolean;
	public filesToUpload;
	public resultUpload;
	public url;

	
	
	constructor(
			private _productoService : ProductoService,
			private _route: ActivatedRoute,
			private _router: Router,
			private _home:HomeComponent
		){
		this.titulo='Crear un nuevo Producto';
		this.producto = new Producto (0,'','','','');
		this.url = 'http://localhost:3800/api/';
	
		
	}

	ngOnInit(){
		console.log('producto-add.component.ts. cargado');
	}


	onSubmit(){
		console.log(this.producto);
		if(this.filesToUpload && this.filesToUpload.length >=1){
			this._productoService.makeFileRequest(this.url+'upload-file',[],this.filesToUpload).then((result)=>{
				console.log(result);
				this.resultUpload = result;
				console.log(this.resultUpload);
				this.producto.imagen = this.resultUpload.filename;
				console.log(this.resultUpload.filename);
				this.agregarProducto();
			},(error) =>{
				console.log(error);
			});
		}else{
			this.agregarProducto();
		}
	}

	agregarProducto(){
		this._productoService.addProducto(this.producto).subscribe(
			response =>{
				if(response.code == 200){
					console.log(response.menssage);
					this._home.cambiar(false);
					this._router.navigate(['/home']);
				}else{
					console.log(response);
				}
			},
			error=>{
				console.log(<any>error);
			}
		);
	}

	aHome(){
		this._home.cambiar(false);
		this._router.navigate(['/home']);
	}


	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}
}