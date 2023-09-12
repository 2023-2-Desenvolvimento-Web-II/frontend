<template>
	<v-container>
		<v-row class="mb-6" no-gutters align="center">
			<v-col cols="4">
				<h2 class="text-h4 mt-3 text-blue-grey-darken-4">Usuário</h2>
			</v-col>
			<v-col cols="4" offset="4">
				<v-btn
				class="bg-primary mr-2"
				prepend-icon="mdi-plus"
				@click="abrirCriacao"
				>
					Usuário
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
				<tr v-for="usuario in app.usuarios" :key="usuario.id">
					<td>{{ usuario.id }}</td>
					<td>{{ usuario.nome }}</td>
					<td>{{ usuario.pessoa.nome }}</td>
					<td>
						<v-chip-group >
							<v-chip v-for="papel in usuario.papeis" :key="papel.id">{{ papel.nome }}</v-chip>
						</v-chip-group>
					</td>
					<td>
						<v-btn
								size="small"
								class="bg-primary mr-2"
								prepend-icon="mdi-pencil"
								@click="abrirEdicao(usuario)"
								>
									Editar
						</v-btn>
						<v-btn
								size="small"
								class="bg-red"
								prepend-icon="mdi-delete"
								@click="abrirExclusao(usuario)">
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
				<v-card-title>Criar um novo usuário</v-card-title>

				<v-card-text>
					<v-text-field v-model="nome" clearable label="Nome"></v-text-field>
					<v-text-field v-model="senha" clearable label="Senha" type="password"></v-text-field>
					<v-select
						multiple
						clearable
						chips
						label="Papéis"
						v-model="papeis"
						:items="app.papeis"
						item-title="nome"
						return-object
					></v-select>
					<v-autocomplete
						clearable
						label="Pessoa responsável"
						v-model="pessoa"
						:items="app.pessoas"
						item-title="nome"
						return-object
					></v-autocomplete>
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
					<v-text-field v-model="nome" clearable label="Nome"></v-text-field>
					<v-text-field v-model="senha" clearable label="Senha" type="password"></v-text-field>
					<v-select
						multiple
						clearable
						chips
						label="Papéis"
						v-model="papeis"
						:items="app.papeis"
						item-title="nome"
						return-object
					></v-select>
					<v-autocomplete
						clearable
						label="Pessoa responsável"
						v-model="pessoa"
						:items="app.pessoas"
						item-title="nome"
						return-object
					></v-autocomplete>
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
import { IPapel, IPessoa, IUsuario, useAppStore } from '@/store/app';
import { ref } from 'vue';

export default {
  setup() {
    const headers = ref([
      { title: 'ID' },
      { title: 'Nome do perfil' },
      { title: 'Pessoa responsável' },
      { title: 'Papeis' },
      { title: 'Ações' }
    ]);

    const app = useAppStore();
		app.obterPessoas();
		app.obterUsuarios();
		app.obterPapeis();

    const editar = ref(false);
    const excluir = ref(false);
    const criar = ref(false);
    const id = ref(0);
    const nome = ref('');
		const senha = ref('');
    const pessoa = ref({} as IPessoa);
    const papeis = ref([] as IPapel[]);

		const abrirCriacao = () => {
			id.value = 0;
      nome.value = '';
			senha.value = '';
      pessoa.value = { nome: 'Selecione uma pessoa' } as IPessoa;
      papeis.value = [];
      criar.value = true;
    };

    const cancelarCriacao = () => {
      id.value = 0;
      nome.value = '';
			senha.value = '';
      pessoa.value = { nome: 'Selecione uma pessoa' } as IPessoa;
      papeis.value = [];
      criar.value = false;
    };

    const confirmarCriacao = () => {
			const novoUsuario = {
				id: 0,
				nome: nome.value,
				senha: senha.value,
				pessoa: pessoa.value,
				papeis: papeis.value
			}
      app.adicionarUsuario(novoUsuario);
			criar.value = false;
    };


    const abrirEdicao = (usuario: IUsuario) => {
      id.value = usuario.id;
      nome.value = usuario.nome;
			senha.value = usuario.senha;
      pessoa.value = usuario.pessoa;
      papeis.value = usuario.papeis;
      editar.value = true;
    };

    const cancelarEdicao = () => {
      id.value = 0;
      nome.value = '';
			senha.value = '';
      pessoa.value = { nome: 'Selecione uma pessoa' } as IPessoa;
      papeis.value = [];
      editar.value = false;
    };

    const confirmarEdicao = () => {
      editar.value = false;
    };

    const abrirExclusao = (usuario: IUsuario) => {
      id.value = usuario.id;
      nome.value = usuario.nome;
      excluir.value = true;
    };

    const cancelarExclusao = () => {
      id.value = 0;
      nome.value = '';
      excluir.value = false;
    };

    const confirmarExclusao = () => {
      app.removerUsuario(id.value);
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
			senha,
      pessoa,
      papeis,
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
