<template>
	<h2 class="text-h4 mt-3 mb-5 text-blue-grey-darken-4">Pessoa</h2>
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
				<tr v-for="pessoa in pessoas" :key="pessoa.id">
					<td>{{ pessoa.id }}</td>
					<td>{{ pessoa.cpf }}</td>
					<td>{{ pessoa.nome }}</td>
					<td>{{ pessoa.dataDeNascimento }}</td>
					<td>
						<v-dialog v-model="dialog" width="auto">
							<template v-slot:activator="{ props }">
								<v-btn
								size="small"
								class="bg-primary mr-2"
								prepend-icon="mdi-pencil"
								v-bind="props"
								@click="id = pessoa.id; nome = pessoa.nome; cpf = pessoa.cpf; dataDeNascimento = pessoa.dataDeNascimento"
								>
									Editar
								</v-btn>
							</template>
							<v-form>
							<v-card>
								<v-card-title>Editando informações de {{ pessoa.nome }}</v-card-title>

								<v-card-text>
									<v-text-field v-model="cpf" clearable label="CPF"></v-text-field>
									<v-text-field v-model="nome" clearable label="Nome"></v-text-field>
									<v-text-field v-model="dataDeNascimento" clearable label="Data de nascimento"></v-text-field>
								</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn class="bg-green" @click="dialog = false">Confirmar</v-btn>
										<v-btn class="bg-primary" @click="dialog = false">Cancelar</v-btn>
									</v-card-actions>
							</v-card>
						</v-form>
						</v-dialog>
						<v-dialog v-model="dialog2" width="auto">
							<template v-slot:activator="{ props }">
								<v-btn
								size="small"
								class="bg-red"
								prepend-icon="mdi-delete"
								v-bind="props"
								@click="id = pessoa.id">
									Excluir
								</v-btn>
							</template>
							<v-card>
								<v-card-title>Excluindo {{ pessoa.nome }}</v-card-title>
								<v-card-text>
									Você tem certeza que deseja excluir?
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn class="bg-green" @click="dialog2 = false">Confirmar</v-btn>
									<v-btn class="bg-primary" @click="dialog2 = false">Cancelar</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</td>
				</tr>
			</tbody>
		</v-table>
	</v-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { ref } from 'vue';
const headers = ref([
	{ title: 'ID' },
	{ title: 'CPF' },
	{ title: 'Nome' },
	{ title: 'Data de Nascimento' },
	{ title: 'Ações' }
])

const pessoas = reactive([
	{
		id: 1,
		cpf: '12345678910',
		nome: 'Lucas',
		dataDeNascimento: '31/05/2000'
	}
]);
</script>
<script lang="ts">

export default {
	data() {
		return {
			dialog: false,
			dialog2: false,
			id: 0,
			nome: '',
			cpf: '',
			dataDeNascimento: ''
		}
	},
}
</script>
