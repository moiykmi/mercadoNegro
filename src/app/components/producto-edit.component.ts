import {Component} from '@angular/core';
import {Router , ActivatedRoute , Params} from '@angular/router';
import {ProductoService} from '../services/producto.service';
import {Producto} from '../models/producto';
//import { HomeComponent} from './home.component';


@Component({
	selector:'producto-edit',
	templateUrl:'../views/producto-add.html',
	providers:[ProductoService]

	})

export class ProductoEditComponent{
	public titulo:string;
	public producto:Producto;
	//public filesToUpload;
	//public resultUpload;
	public is_edit;

	constructor(
		private _productoService:ProductoService,
		private _route:ActivatedRoute,
		private _router : Router,
		//private _home:HomeComponent
	){
		this.titulo = 'Editar producto';
		this.producto = new Producto(0,'','','','');
		this.is_edit= true;
	}

	ngOnInit(){
		console.log(this.titulo);
		this.getProducto();
		
		
		
	}

	getProducto(){
		this._route.params.forEach((params : Params)=>{
			let id = params['id'];
			this._productoService.getProducto(id).subscribe(
				response =>{
						if(response.code == 200){
							this.producto = response.producto[0];
							console.log(response.producto[0]._id);
							console.log(this.producto);
						
						}else{
							this._router.navigate(['/producto-list']);
						}
					},
					error =>{
						console.log(<any>error);
					}
			);
		});

	}

	onSubmit(){
		console.log(this.producto);

		//if(this.filesToUpload && this.filesToUpload.length >= 1){
		//	this._productoService.makeFileRequest(GLOBAL.url+'upload-file',[],this.filesToUpload).then((result)=>{
				
		//		this.resultUpload = result;
		//		this.producto.imagen = this.resultUpload.filename;
		//		console.log('paso 1');
				this.updateProducto();
		//	},(error) =>{
		//		console.log(error);
		//	});
		//}else{
		//	console.log('paso 2');
		
		//	this.updateProducto();
		//}
	
	}

	updateProducto(){
		this._route.params.forEach((params : Params)=>{
			let id = params['id'];
			console.log(this.producto);
			this._productoService.editProducto(id,this.producto).subscribe(
				response =>{
					if(response.code == 200){
						this._router.navigate(['/home']);
						console.log(response);
					
					}else{
						console.log(response);
					}
				},
				error=>{
					console.log(<any>error);
				}
			);
		});
	}

	

	/**
	aHome(){
		this._home.cambiar(false);
		this._router.navigate(['/home']);
	}

	**/
	/**
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}
	**/
}





