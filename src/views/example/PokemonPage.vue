<!-- eslint-disable no-debugger -->
<template>
  <PageHeader
    :title="pokemonComputed"
    description="Esta página utiliza um serviço axios que consome a API do Pokemon"
  />

  <div class="w-full">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Pokemon">
        <el-input v-model="formInline.pokemon" placeholder="Ex. ditto" :prefix-icon="Search" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">Buscar</el-button>
      </el-form-item>
    </el-form>

    <div v-if="pokemon?.name" class="p-5 border rounded-md border-gray-400 w-3xl">
      <div>
        <el-alert
          v-if="formInline.pokemon"
          :title="formInline.pokemon"
          type="info"
          effect="dark"
          center
          show-icon
          :closable="false"
        />
      </div>

      <el-container :v-loading="true">
        <el-row justify="center" class="w-full">
          <el-image class="w-1/2 h-auto" :src="pokemon?.imageSrc" fit="cover"> </el-image>
        </el-row>
      </el-container>

      <el-row class="mb-4" justify="center">
        <el-button type="primary" plain @click="savePokemonToStore">Guardar</el-button>
      </el-row>
    </div>

    <div class="el-container h-96 bg-green-300 w-full">
      <div class="el-row">
        <div v-for="(item, index) in pokemonStore.items" :key="index" class="el-col-3">
          <p>Object: {{ item }}</p>
          <img :src="item?.imageSrc" class="w-50 h-50" :alt="item?.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Search } from '@element-plus/icons-vue';
import servicePokemon from '@/api/httpPokemon';
import { IPokemon } from '@/types/pokemon';
import usePokemon from '@/store/pokemon';

const pokemonStore = usePokemon();

const { items } = storeToRefs(usePokemon());

const pokemon = ref<IPokemon | undefined>();

const pokemonComputed = computed(() => {
  return pokemon.value?.name ? `Pokemon atual: ${pokemon.value?.name}` : 'Busque um pokemon pelo formuário abaixo';
});

const pokemonStoreList = computed(() => {
  return items;
});

const formInline = reactive({
  pokemon: 'pikachu',
  region: '',
});

const search = async () => {
  console.log('submit!', { formInline });

  if (!formInline.pokemon) {
    ElNotification({
      title: 'Aviso.',
      message: `Preencha o formulário`,
      type: 'error',
    });
    return;
  }

  try {
    const res = await servicePokemon.getPokemonByName(`${formInline.pokemon}`);

    pokemon.value = {
      imageSrc: res.sprites.other['official-artwork'].front_default,
      name: res.name,
    };
  } catch (err) {
    ElNotification({
      title: 'Erro na busca.',
      message: `Não foi possível localizar ${formInline.pokemon}`,
      type: 'error',
    });
  }
};

const savePokemonToStore = (): void => {
  console.log(items.value);

  pokemonStore.addPokemon(pokemon as IPokemon);
  ElNotification({
    title: 'Sucesso.',
    message: `O Pokemom ${pokemon.value?.name} foi salvo na store.`,
    type: 'success',
  });
};

onMounted(async () => {
  const route = useRoute();

  if (route.params.id) {
    const { id } = route.params;
    const res = await servicePokemon.getPokemonByName(`${id}`);

    pokemon.value = {
      imageSrc: res.sprites.other['official-artwork'].front_default,
      name: res.name,
    };
  }
});
</script>
