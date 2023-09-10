<template>
	<v-navigation-drawer class="bg-blue-grey-darken-4"
	expand-on-hover
	rail
	app
>
	<v-list>
		<v-list-item
			prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
			title="Lucas Nogueira"
			subtitle="lucas.nogueira@nuplam.ufrn.br"
		></v-list-item>
	</v-list>

	<v-divider></v-divider>

	<v-list density="compact" nav>
			<v-list-item
					v-for="(item, index) in items"
					:key="index"
					:to="item.link"
					:prepend-icon="item.icon"
					:title="item.text"
					link
			>
			</v-list-item>
	</v-list>
</v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const items = ref([
      {
        icon: 'mdi-home',
        text: 'Home',
        link: '/',
      },
      {
        icon: 'mdi-account',
        text: 'Pessoa',
        link: '/pessoa',
      },
      {
        icon: 'mdi-account-multiple',
        text: 'Usuário',
        link: '/usuario',
      },
      {
        icon: 'mdi-badge-account',
        text: 'Papel',
        link: '/papel',
      }
    ]);
</script>
