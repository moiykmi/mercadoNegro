import {Component} from '@angular/core';
import {Router , ActivatedRoute , Params} from '@angular/router';
import {ValoresService} from '../services/valores.service';


@Component({
	selector : 'indicadores',
	templateUrl : '../views/indicadores.html',
	providers : [ValoresService]
})

export class IndicadoresComponent{
	public dolar : number;
	public uf:number;
	public tipo:string;
	public utm:number;
	public diferenciaDolar:number;
	public diferenciaUf:number;
	public diferenciaUtm:number;


	constructor(
		private _valoresService:ValoresService,
		private _route:ActivatedRoute,
		private _router : Router
		){
	}

	ngOnInit(){
		console.log('indicadores.component cargado');
		this.getDolar();
		this.getUF();
		this.getUTM();

	}


	getDolar(){
		this.tipo= "dolar";
			this._valoresService.obtenerValor(this.tipo).subscribe(
				response =>{
						
						this.dolar=response.serie[0].valor;

					},
					error =>{
						console.log(<any>error);
					}
			);
			this._valoresService.obtenerValorDiaAnterior(this.tipo).subscribe(
				response =>{
						
						var dolar2=response.serie[0].valor;						
						this.diferenciaDolar=Math.round10(this.dolar - dolar2,-2);
						
						
					},
					error =>{
						console.log(<any>error);
					}
			);
	}

	getUF(){
		this.tipo= "uf";
			this._valoresService.obtenerValor(this.tipo).subscribe(
				response =>{
						this.uf=response.serie[0].valor;
						
					},
					error =>{
						console.log(<any>error);
					}
			);
			this._valoresService.obtenerValorDiaAnterior(this.tipo).subscribe(
				response =>{
						
						var uf2=response.serie[0].valor;
						this.diferenciaUf= this.uf - uf2;
						
					},
					error =>{
						console.log(<any>error);
					}
			);
	}

	getUTM(){
		this.tipo= "utm";
			this._valoresService.obtenerValor(this.tipo).subscribe(
				response =>{
						
						this.utm=response.serie[0].valor;
						
					},
					error =>{
						console.log(<any>error);
					}
			);
			this._valoresService.obtenerValorDiaAnterior(this.tipo).subscribe(
				response =>{
						
						var utm2=response.serie[0].valor;
						this.diferenciaUtm= this.utm - utm2;
						
					},
					error =>{
						console.log(<any>error);
					}
			);
	}
}

// Conclusión
(function() {
  /**
   * Ajuste decimal de un número.
   *
   * @param {String}  tipo  El tipo de ajuste.
   * @param {Number}  valor El numero.
   * @param {Integer} exp   El exponente (el logaritmo 10 del ajuste base).
   * @returns {Number} El valor ajustado.
   */
  function decimalAdjust(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o el exp no es un entero...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();
