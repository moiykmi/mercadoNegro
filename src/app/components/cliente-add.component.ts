import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { UsuarioService} from '../services/usuario.service';
import { Cliente } from '../models/cliente';



@Component({
	selector:'cliente-add',
	templateUrl: '../views/cliente-add.html',
	providers:[UsuarioService]
	})
export class ClienteAddComponent{
	public titulo:string;
	public cliente:Cliente;
	
	constructor(
			private _usuarioService : UsuarioService,
			private _route: ActivatedRoute,
			private _router: Router
		){
		this.titulo='Crear un nuevo cliente';
		this.cliente = new Cliente ('','','','',false);
		
	}

	ngOnInit(){
		console.log('usuario-add.component.ts. cargado');
	}


	onSubmit(){
		console.log(this.cliente);
		this.agregarCliente();
	}

	agregarCliente(){
		this._usuarioService.addCliente(this.cliente).subscribe(
			response =>{
				if(response.code == 200){
					console.log(response.menssage);
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

}