import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Producto } from '../models/producto';



@Injectable()
export class ProductoService{
	public url : string;
	

	constructor(
		public _http:Http
	){
		this.url = 'http://localhost:3800/api/';
	}

	prueba(){
		return this._http.get(this.url+'pruebas').map(res => res.json());
	}


	
	addProducto(producto: Producto){
		console.log(producto);
		let json =JSON.stringify(producto);
		let params = 'json='+json;
		console.log(params);
		let headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'producto',params, {headers: headers})
				.map(res => res.json());
	}
	

	getProducto(producto){
		console.log(producto);
		return this._http.get(this.url+'producto/'+producto).map(res => res.json());
	}



	getProductos(){
		return this._http.get(this.url+'productos').map(res => res.json());
	}


	deleteProducto(producto: Producto){
		console.log(producto);
		return this._http.delete(this.url+'producto/'+producto)
						.map(res => res.json());
	}

	editProducto(id, producto : Producto){

		console.log('en el servicio editar');
		console.log(producto);
		let json =JSON.stringify(producto);
		let params = "json="+json;
		
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.put(this.url+'producto/'+id, params , {headers: headers})
						.map(res => res.json());
	}

	makeFileRequest(url : string, params: Array<string>, files: Array<File>){
	return new Promise((resolve, reject)=>{
		var formData: any = new FormData();
		var xhr = new XMLHttpRequest();

		for(var i = 0;i<files.length; i++){
			formData.append('imagen',files[i],files[i].name);
		}

		xhr.onreadystatechange = function(){
			if(xhr.readyState ==4){
				if(xhr.status==200){
					resolve(JSON.parse(xhr.response));
				}else{
					reject(xhr.response);
				}
			}
		};

		xhr.open("POST",url,true);
		xhr.send(formData);
	});
	}
}