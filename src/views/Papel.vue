<template>
	<v-container>
		<v-row class="mb-6" no-gutters align="center">
			<v-col cols="4">
				<h2 class="text-h4 mt-3 text-blue-grey-darken-4">Papel</h2>
			</v-col>
			<v-col cols="4" offset="4">
				<v-btn
				class="bg-primary mr-2"
				prepend-icon="mdi-plus"
				@click="abrirCriacao"
				>
					Papel
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
				<tr v-for="papel in app.papeis" :key="papel.id">
					<td>{{ papel.id }}</td>
					<td>{{ papel.nome }}</td>
					<td>
						<v-chip-group >
							<v-chip v-for="privilegio in papel.privilegios" :key="privilegio">{{ privilegio }}</v-chip>
						</v-chip-group>
					</td>
					<td>{{ papel.usuarios.length }}</td>
					<td>
						<v-btn
								size="small"
								class="bg-primary mr-2"
								prepend-icon="mdi-pencil"
								@click="abrirEdicao(papel)"
								>
									Editar
						</v-btn>
						<v-btn
								size="small"
								class="bg-red"
								prepend-icon="mdi-delete"
								@click="abrirExclusao(papel)">
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
				<v-card-title>Criar um novo papel</v-card-title>

				<v-card-text>
					<v-text-field v-model="nome" clearable label="Nome"></v-text-field>
					<v-select
						multiple
						clearable
						chips
						label="Privilégios"
						v-model="privilegios"
						:items="opcoesPrivilegios"
					></v-select>
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
					<v-select
						multiple
						clearable
						chips
						label="Privilégios"
						v-model="privilegios"
						:items="opcoesPrivilegios"
					></v-select>
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
import { IPapel, IPapelCriacao, useAppStore } from '@/store/app';
import { ref } from 'vue';

export default {
  setup() {
    const headers = ref([
      { title: 'ID' },
      { title: 'Nome' },
      { title: 'Privilégios' },
      { title: 'Qtd. de usuários' },
      { title: 'Ações' }
    ]);

    const app = useAppStore();
		app.obterPapeis();

    const editar = ref(false);
    const excluir = ref(false);
    const criar = ref(false);
    const id = ref(0);
    const nome = ref('');
		const privilegios = ref([] as string[]);
		const opcoesPrivilegios = ref(['LER', 'ESCREVER', 'IMPRIMIR', 'CANCELAR'])

		const abrirCriacao = () => {
			id.value = 0;
      nome.value = '';
			privilegios.value = [];
      criar.value = true;
    };

    const cancelarCriacao = () => {
      id.value = 0;
      nome.value = '';
			privilegios.value = [];
      criar.value = false;
    };

    const confirmarCriacao = () => {
			const novoPapel = {
				id: 0,
				nome: nome.value,
				privilegios: privilegios.value,
			}
      app.adicionarPapel(novoPapel);
			criar.value = false;
    };


    const abrirEdicao = (papel: IPapelCriacao) => {
      id.value = papel.id;
      nome.value = papel.nome;
			privilegios.value = papel.privilegios;
      editar.value = true;
    };

    const cancelarEdicao = () => {
      id.value = 0;
      nome.value = '';
			privilegios.value = [];
      editar.value = false;
    };

    const confirmarEdicao = () => {
      editar.value = false;
    };

    const abrirExclusao = (papel: IPapel) => {
      id.value = papel.id;
      nome.value = papel.nome;
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
			privilegios,
			opcoesPrivilegios,
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
