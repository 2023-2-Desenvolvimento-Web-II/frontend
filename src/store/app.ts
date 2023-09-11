// Utilities
import { defineStore } from 'pinia';

export interface IPessoa {
	id: number;
	cpf: string;
	nome: string;
	dataDeNascimento: string;
}

export const useAppStore = defineStore('app', {
  state: () => ({
    pessoas: [] as IPessoa[]
  }),
	actions: {
		async obterPessoas() {
			const URL = "http://localhost:8080/pessoa";
			console.log('Entrei aqui')
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
			console.log(this.pessoas);
		}
	}
})
