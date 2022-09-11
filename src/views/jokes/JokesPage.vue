<template>
  <PageHeader
    title="Piadas nerds"
    description="Esta página utiliza um serviço axios e consome a API de piadas nerds."
  />

  <div class="">
    <el-form class="demo-form-inline">
      <el-form-item>
        <div class="text-2xl">Clique no botão. Uma piada nerd aleatória será exibida. Se gostar clique em salvar.</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">Buscar</el-button>
      </el-form-item>
    </el-form>

    <div class="w-full md:w-2/3 lg:w-1/3 min-h-20">
      <el-container v-loading="loading">
        <el-card v-if="jokeItem?.joke" class="box-card">
          <template #header>
            <div class="card-header">
              <span>Piada encontrada</span>
            </div>
          </template>

          <p class="text-xl">
            {{ jokeItem?.joke }}
          </p>
          <el-row justify="center" class="pt-6">
            <el-button c type="primary" @click="saveJokeToStore">Guardar</el-button>
          </el-row>
        </el-card>
      </el-container>
    </div>

    <p class="bg-blue-400 rounded-lg text-white text-2xl mt-3 p-5">Piadas salvas:</p>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 mt-3 gap-2">
      <div v-for="item of jokesStore.getJokes" :key="item.id">
        <el-card class="box-card h-full">
          <template #header>
            <div class="card-header flex justify-between w-full">
              <span>Piada id: {{ item.id }}</span>
              <el-button type="warning" @click="remove(item?.id)">Remove </el-button>
            </div>
          </template>

          <p class="text-xl">
            {{ item.joke }}
          </p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useJokes from '@/store/jokes';
import serviceJokes from '@/api/httpJokes';
import { IJoke } from '@/types/jokes';

const jokesStore = useJokes();

const jokeItem = ref<IJoke>();
const loading = ref(false);

const remove = (id: number | undefined) => {
  jokesStore.removeJoke(id);
  ElNotification({
    title: 'Sucesso.',
    message: `Piada "${id}" foi remvida da store.`,
    type: 'success',
  });
};

const search = async () => {
  try {
    loading.value = true;
    const res = await serviceJokes.getjokes();
    jokeItem.value = {
      joke: res,
    };
  } catch (err) {
    ElNotification({
      title: 'Erro na busca.',
      message: `Não foi possível obter uma piada`,
      type: 'error',
    });
  }
  loading.value = false;
};

const saveJokeToStore = () => {
  const ids = jokesStore.getJokes.map((item) => {
    return item.id || 0;
  });

  const id = ids.length ? Math.max(...ids) + 1 : 0;

  jokesStore.addJoke({ joke: jokeItem.value?.joke, id });
  ElNotification({
    title: 'Sucesso.',
    message: `Piada "${jokeItem.value?.joke}" foi armazenada na store.`,
    type: 'success',
  });
};
</script>
