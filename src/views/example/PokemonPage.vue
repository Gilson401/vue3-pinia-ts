<!-- eslint-disable no-debugger -->
<template>
  <PageHeader
    :title="pokemonComputed"
    description="Esta página utiliza um serviço axios que consome a API do Pokemon"
  />

  <div class="pb-5 text-base">
    <p>
      Digite um nome de um pokemon no input e clique em buscar. Quando opokemon for exibido será possível salvar o mesmo
      na store.
    </p>

    <p class="mt-2">Os Pokemons armazenados na store serão exibidos na div flex abaixo</p>
  </div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="Pokemon">
      <el-input v-model="formInline.pokemon" placeholder="Ex. ditto" :prefix-icon="Search" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">Buscar</el-button>
    </el-form-item>
  </el-form>

  <div class="mb-3">
    <p class="my-3 font-bold">Sugestões:</p>

    <div class="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-2 justify-between">
      <div
        v-for="suggest in suggestedPokemons"
        :key="suggest"
        class="bg-green-600 rounded-md px-2 cursor-pointer text-white"
        @click="onClickSuggest(suggest)"
      >
        {{ suggest }}
      </div>
    </div>
  </div>

  <div>
    <div class="w-full justify-center flex flex-wrap lg:flex-nowrap">
      <div v-if="pokemon?.name" class="w-full lg:w-1/2 p-5 border rounded-md border-gray-400 w-3xl">
        <el-alert
          v-if="formInline.pokemon"
          :title="formInline.pokemon"
          type="info"
          effect="dark"
          center
          show-icon
          :closable="false"
        />

        <el-container :v-loading="true">
          <el-row justify="center" class="w-full flex">
            <el-image class="h-auto" :src="pokemon?.imageSrc" fit="cover"> </el-image>
          </el-row>
        </el-container>

        <el-row class="mb-4" justify="center">
          <el-button type="primary" plain @click="savePokemonToStore">Guardar</el-button>
        </el-row>
      </div>
    </div>
  </div>
  <div class="p-3 mt-3 h-96 bg-gray-100 w-full">
    <h3 class="text-2xl mb-3">Pokemons in Store Pinia</h3>
    <div class="grid grid-cols-4 lg:grid-cols-6 w-full mt-3 gap-2">
      <div
        v-for="item of pokemonStore.getItems"
        :key="item.id"
        class="border rounded-lg justify-center flex bg-light-50 p-3"
      >
        <div class="truncate">
          <div class="text-center truncate first-letter:uppercase font-bold">
            {{ item?.name }}
          </div>
          <img :src="item?.imageSrc" class="w-20 h-20 mx-auto" :alt="item?.name" />
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

const { items } = storeToRefs(pokemonStore);

const pokemon = ref<IPokemon | undefined>();

const pokemonComputed = computed(() => {
  return pokemon.value?.name ? `Pokemon atual: ${pokemon.value?.name}` : 'Busque um pokemon pelo formuário abaixo';
});

const formInline = reactive({
  pokemon: '',
});

const suggestedPokemons = [
  'Dedenne',
  'Cincinno',
  'Sableye',
  'Snivy',
  'Magnemite',
  'Swadloon',
  'Pikachu',
  'Buzzwole',
  'Oshawott',
  'Flygon',
  'Whismur',
  'Piplup',
  'Chandelure',
  'Empoleon',
  'Luxray',
  'Greninja',
  'Jirachi',
  'Charizard',
  'Mimikyu',
  'Inteleon',
  'Eevee',
  'Barbaracle',
  'Glaceon',
  'Spheal',
  'Scolipede',
  'Lilligant',
  'Bulbasaur',
  'Sliggoo',
  'Lucario',
  'Gardevoir',
].sort();

const search = async () => {
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

const onClickSuggest = async (suggest: string) => {
  formInline.pokemon = suggest.toLowerCase();
  await search();
};

const savePokemonToStore = (): void => {
  pokemonStore.addPokemon({
    imageSrc: pokemon.value?.imageSrc,
    name: pokemon.value?.name,
  });
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
