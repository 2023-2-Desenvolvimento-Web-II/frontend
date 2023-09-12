// Utilities
import { defineStore } from 'pinia';

export interface IPessoa {
	id: number;
	cpf: string;
	nome: string;
	dataDeNascimento: string;
}

export interface IUsuario {
	id: number;
	nome: string;
	senha: string;
	pessoa: IPessoa;
	papeis: IPapel[];
}

export interface IPapel {
	id: number;
	nome: string;
	privilegios: string[];
	usuarios: IUsuario[];
}

export interface IPapelCriacao {
	id: number;
	nome: string;
	privilegios: string[];
}

export const useAppStore = defineStore('app', {
  state: () => ({
    pessoas: [] as IPessoa[],
		usuarios: [] as IUsuario[],
		papeis: [] as IPapel[]
  }),
	actions: {
		async obterPessoas() {
			const URL = "http://localhost:8080/pessoa";
			const pessoasPromise = await fetch(URL);
			const pessoas : IPessoa[] = await pessoasPromise.json();
			console.log('pessoas', pessoas);
			this.pessoas = pessoas;
		},
		async adicionarPessoa(pessoa: IPessoa) {
			const URL = "http://localhost:8080/pessoa";
			const pessoaPromise = await fetch(URL, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(pessoa)
			});
			const pessoaNova = await pessoaPromise.json();
			this.pessoas.push(pessoaNova);
		},
		async removerPessoa(id: number) {
			const URL = "http://localhost:8080/pessoa/" + id;
			const pessoaPromise = await fetch(URL, {
				method: 'DELETE'
			});
			if(pessoaPromise.ok) {
				this.pessoas = this.pessoas.filter(pessoa => pessoa.id !== id);
			}
		},
		async editarPessoa(pessoa: IPessoa) {
			const URL = "http://localhost:8080/pessoa";
			const pessoaEditadaPromise = await fetch(URL, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(pessoa)
			});
			const pessoaEditada = await pessoaEditadaPromise.json();
			const pessoaEditadaIndex = this.pessoas.findIndex(pessoa => pessoa.id === pessoaEditada.id);
			this.pessoas[pessoaEditadaIndex] = pessoaEditada;
		},
		async obterUsuarios() {
			const URL = "http://localhost:8080/usuario";
			const usuariosPromise = await fetch(URL);
			const usuarios : IUsuario[] = await usuariosPromise.json();
			console.log('usuarios', usuarios);
			this.usuarios = usuarios;
		},
		async adicionarUsuario(usuario: IUsuario) {
			const URL = "http://localhost:8080/usuario";
			const usuarioPromise = await fetch(URL, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(usuario)
			});
			const usuarioNovo = await usuarioPromise.json();
			this.usuarios.push(usuarioNovo);
		},
		async removerUsuario(id: number) {
			const URL = "http://localhost:8080/usuario/" + id;
			const usuarioPromise = await fetch(URL, {
				method: 'DELETE'
			});
			if(usuarioPromise.ok) {
				this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
			}
		},
		async editarUsuario(usuario: IUsuario) {
			const URL = "http://localhost:8080/usuario";
			const usuarioEditadoPromise = await fetch(URL, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(usuario)
			});
			const usuarioEditado = await usuarioEditadoPromise.json();
			const usuarioEditadoIndex = this.usuarios.findIndex(usuario => usuario.id === usuarioEditado.id);
			this.usuarios[usuarioEditadoIndex] = usuarioEditado;
		},
		async obterPapeis() {
			const URL = "http://localhost:8080/papel";
			const papeisPromise = await fetch(URL);
			const papeis : IPapel[] = await papeisPromise.json();
			console.log('papeis', papeis);
			this.papeis = papeis;
		},
		async adicionarPapel(papel: IPapelCriacao) {
			const URL = "http://localhost:8080/papel";
			const papelPromise = await fetch(URL, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(papel)
			});
			const papelNovo = await papelPromise.json();
			this.papeis.push(papelNovo);
		},
		async removerPapel(id: number) {
			const URL = "http://localhost:8080/papel/" + id;
			const papelPromise = await fetch(URL, {
				method: 'DELETE'
			});
			if(papelPromise.ok) {
				this.papeis = this.papeis.filter(papel => papel.id !== id);
			}
		},
		async editarPapel(papel: IPapelCriacao) {
			const URL = "http://localhost:8080/papel";
			const papelEditadoPromise = await fetch(URL, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(papel)
			});
			const papelEditado = await papelEditadoPromise.json();
			const papelEditadoIndex = this.papeis.findIndex(papel => papel.id === papelEditado.id);
			this.papeis[papelEditadoIndex] = papelEditado;
		}
	}
})
