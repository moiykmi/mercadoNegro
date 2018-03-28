import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Cliente } from '../models/cliente';



@Injectable()
export class UsuarioService{
	public url : string;
	

	constructor(
		public _http:Http
	){
		this.url = 'http://localhost:3800/api/';
	}

	prueba(){
		return this._http.get(this.url+'pruebas').map(res => res.json());
	}


	
	addCliente(cliente: Cliente){
		console.log(cliente);
		let json =JSON.stringify(cliente);
		let params = 'json='+json;
		console.log(params);
		let headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'usuario',params, {headers: headers})
				.map(res => res.json());
	}
	

	getUsuario(usuario){
		return this._http.get(this.url+'usuario/'+usuario).map(res => res.json());
	}

		
}