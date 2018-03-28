import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';


import { Cliente} from '../models/cliente';

@Component({
	selector : 'login',
	templateUrl : '../views/login.html',
	providers: [UsuarioService]
})

export class LoginComponent{
	public titulo:string;
	public cliente:Cliente;
	public isValidUser: boolean;
	public isValidPass: boolean;




	constructor(
			private _router : Router,
			private _route:ActivatedRoute,
			private _usuarioService:UsuarioService
		){
		this.titulo='Login de Usaurios';
		this.cliente = new Cliente ('','','','',true);
		this.isValidPass=true;
		this.isValidUser=true;
	}

	ngOnInit(){
		console.log('login.component.ts. cargado');
	}

	
	onSubmit(){
		console.log(this.cliente.usuario);
		this.getUsuario();
	}

	getUsuario(){
		this._route.params.forEach((params : Params)=>{
			let usuario = this.cliente.usuario;
			

			this.isValidUser=true;
			this.isValidPass=true;
			this._usuarioService.getUsuario(usuario).subscribe(
				response =>{
						if(response.code == 200 ){
							
							let params = response.usuario[0].password;
							let password = this.cliente.password;
							if(params != password){
								//alert("password invalido");
								this.isValidPass = false;
							}else{
								this._router.navigate(['/home']);	
							}
							
						}else{
							console.log(2);
							//alert("usuario y/o password invalidas");
							this.isValidUser = false; 
							//this._router.navigate(['/login']);
							
						}
					},
					error =>{
						this.isValidUser = false; 
						console.log(<any>error);
					}
			);
		});
	}

}