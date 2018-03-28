import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
//import { Producto } from '../models/producto';



@Injectable()
export class ValoresService{
	public url : string;
	

	constructor(
		public _http:Http
	){
		this.url = 'https://mindicador.cl/api/';
	}

	
	obtenerValor(tipo){
		var date = new Date();

		var dd = date.getDate();
		var mm = date.getMonth()+1; //hoy es 0!
		var yyyy = date.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 

		var hoy = dd+'-'+mm+'-'+yyyy;
		
		return this._http.get(this.url+tipo+'/'+hoy).map(res => res.json());
	}

	obtenerValorDiaAnterior(tipo){
		var date = new Date();
		var dd = date.getDate();
		var mm = date.getMonth()+1; //hoy es 0!
		var yyyy = date.getFullYear();

		 
		if(date.getDay()==1){
			dd = dd - 3 
		}else{
			dd = dd - 1

		}

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		}


		var ayer = dd+'-'+mm+'-'+yyyy;
		return this._http.get(this.url+tipo+'/'+ayer).map(res => res.json());
	}
		
}