<template>
  <PageHeader
    title="Piadas nerds"
    description="Esta página utiliza um serviço axios e consome a API de piadas nerds."
  />

  <div class="container">
    <el-form class="demo-form-inline">
      <el-form-item>
        <div class="text-2xl">Clique no botão. Uma piada nerd aleatória será exibida. Se gostar clique em salvar.</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">Buscar</el-button>
      </el-form-item>
    </el-form>

    <div class="w-3xl">
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

const search = async () => {
  try {
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
};

const saveJokeToStore = () => {
  jokesStore.addJoke(jokeItem as IJoke);
  ElNotification({
    title: 'Sucesso.',
    message: `Piada "${jokeItem.value?.joke}" foi armazenada na store.`,
    type: 'success',
  });
};
</script>
