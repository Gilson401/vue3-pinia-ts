<!-- eslint-disable no-debugger -->
<template>
  <PageHeader
    :title="pokemonComputed"
    description="esta pagina utiliza um serviço axios que consome a a-p-i do Pokemon"
  />

  <div class="container">
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Search } from '@element-plus/icons-vue';
import servicePokemon from '@/api/httpPokemon';

interface PokeDisplay {
  name: string;
  imageSrc: string;
}

const pokemon = ref<PokeDisplay>();

const pokemonComputed = computed(() => {
  return pokemon.value?.name ? `Pokemon atual: ${pokemon.value?.name}` : 'Busque um pokemon pelo formuário abaixo';
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

const savePokemonToStore = () => {};

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

<style scoped>
.demo-image__error .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image__error .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.demo-image__error .el-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
  width: 100%;
  height: 200px;
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
</style>
