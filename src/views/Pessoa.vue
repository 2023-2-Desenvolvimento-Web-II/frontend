<template>
	<v-container>
		<v-row class="mb-6" no-gutters align="center">
			<v-col cols="4">
				<h2 class="text-h4 mt-3 text-blue-grey-darken-4">Pessoa</h2>
			</v-col>
			<v-col cols="4" offset="4">
				<v-btn
				class="bg-primary mr-2"
				prepend-icon="mdi-plus"
				@click="abrirCriacao"
				>
					Pessoa
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
	<v-card>
		<v-table>
			<thead>
				<tr>
					<th class="text-left" v-for="(header) in headers" :key="header.title">
						{{ header.title }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="pessoa in app.pessoas" :key="pessoa.id">
					<td>{{ pessoa.id }}</td>
					<td>{{ pessoa.cpf }}</td>
					<td>{{ pessoa.nome }}</td>
					<td>{{ pessoa.dataDeNascimento }}</td>
					<td>
						<v-btn
								size="small"
								class="bg-primary mr-2"
								prepend-icon="mdi-pencil"
								@click="abrirEdicao(pessoa)"
								>
									Editar
						</v-btn>
						<v-btn
								size="small"
								class="bg-red"
								prepend-icon="mdi-delete"
								@click="abrirExclusao(pessoa)">
									Excluir
						</v-btn>
					</td>
				</tr>
			</tbody>
		</v-table>
	</v-card>

	<!--Modal de criação-->
	<v-dialog v-model="criar" minWidth="450" width="auto">
		<v-form>
			<v-card>
				<v-card-title>Criar nova pessoa</v-card-title>

				<v-card-text>
					<v-text-field v-model="cpf" clearable label="CPF" maxLength="11"></v-text-field>
					<v-text-field v-model="nome" clearable label="Nome"></v-text-field>
					<v-text-field v-model="dataDeNascimento" clearable label="Data de nascimento"></v-text-field>
				</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn class="bg-green" @click="confirmarCriacao">Confirmar</v-btn>
						<v-btn class="bg-primary" @click="cancelarCriacao">Cancelar</v-btn>
					</v-card-actions>
			</v-card>
		</v-form>
	</v-dialog>

	<!--Modal de edição-->
	<v-dialog v-model="editar" minWidth="450" width="auto">
		<v-form>
			<v-card>
				<v-card-title>Editando informações de {{ nome }}</v-card-title>

				<v-card-text>
					<v-text-field v-model="cpf" clearable label="CPF"></v-text-field>
					<v-text-field v-model="nome" clearable label="Nome"></v-text-field>
					<v-text-field v-model="dataDeNascimento" clearable label="Data de nascimento"></v-text-field>
				</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn class="bg-green" @click="confirmarEdicao">Confirmar</v-btn>
						<v-btn class="bg-primary" @click="cancelarEdicao">Cancelar</v-btn>
					</v-card-actions>
			</v-card>
		</v-form>
	</v-dialog>

	<!--Modal de exclusão-->
	<v-dialog v-model="excluir" width="auto">
		<v-card>
			<v-card-title>Excluindo {{ nome }}</v-card-title>
			<v-card-text>
				Você tem certeza que deseja excluir?
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn class="bg-green" @click="confirmarExclusao">Confirmar</v-btn>
				<v-btn class="bg-primary" @click="cancelarExclusao">Cancelar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { IPessoa, useAppStore } from '@/store/app';
import { ref } from 'vue';

export default {
  setup() {
    const headers = ref([
      { title: 'ID' },
      { title: 'CPF' },
      { title: 'Nome' },
      { title: 'Data de Nascimento' },
      { title: 'Ações' }
    ]);

    const app = useAppStore();
		app.obterPessoas();

    const editar = ref(false);
    const excluir = ref(false);
    const criar = ref(false);
    const id = ref(0);
    const nome = ref('');
    const cpf = ref('');
    const dataDeNascimento = ref('');

		const abrirCriacao = () => {
      criar.value = true;
    };

    const cancelarCriacao = () => {
      id.value = 0;
      nome.value = '';
      cpf.value = '';
      dataDeNascimento.value = '';
      criar.value = false;
    };

    const confirmarCriacao = () => {
			const novaPessoa = {
				id: 0,
				nome: nome.value,
				cpf: cpf.value,
				dataDeNascimento: dataDeNascimento.value
			}
      app.adicionarPessoa(novaPessoa);
			criar.value = false;
    };


    const abrirEdicao = (pessoa: IPessoa) => {
      id.value = pessoa.id;
      nome.value = pessoa.nome;
      cpf.value = pessoa.cpf;
      dataDeNascimento.value = pessoa.dataDeNascimento;
      editar.value = true;
    };

    const cancelarEdicao = () => {
      id.value = 0;
      nome.value = '';
      cpf.value = '';
      dataDeNascimento.value = '';
      editar.value = false;
    };

    const confirmarEdicao = () => {
      editar.value = false;
    };

    const abrirExclusao = (pessoa: IPessoa) => {
      id.value = pessoa.id;
      nome.value = pessoa.nome;
      excluir.value = true;
    };

    const cancelarExclusao = () => {
      id.value = 0;
      nome.value = '';
      excluir.value = false;
    };

    const confirmarExclusao = () => {
      app.removerPessoa(id.value);
      excluir.value = false;
    };

    return {
      headers,
      app,
			criar,
      editar,
      excluir,
      id,
      nome,
      cpf,
      dataDeNascimento,
			abrirCriacao,
      cancelarCriacao,
      confirmarCriacao,
      abrirEdicao,
      cancelarEdicao,
      confirmarEdicao,
      abrirExclusao,
      cancelarExclusao,
      confirmarExclusao
    };
  }
}
</script>
