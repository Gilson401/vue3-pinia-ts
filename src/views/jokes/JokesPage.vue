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

    <div class="w-3xl min-h-20">
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

    <div class="grid grid-cols-4 w-full mt-3 gap-2">
      <el-card v-for="item of jokesStore.getJokes" :key="item.id" class="box-card">
        <template #header>
          <div class="card-header flex justify-between">
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
  const id = jokesStore.getJokes.length;
  jokesStore.addJoke({ joke: jokeItem.value?.joke, id });
  ElNotification({
    title: 'Sucesso.',
    message: `Piada "${jokeItem.value?.joke}" foi armazenada na store.`,
    type: 'success',
  });
};
</script>
