<!-- eslint-disable no-debugger -->
<template>
  <PageHeader
    title="Piadas nerds"
    description="Esta página utiliza um serviço axios e consome a API de piadas nerds."
  />

  <div class="container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <div class="text-2xl">Clique no botão. Uma piada nerd aleatória será exibida. Se gostar clique em salvar</div>
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

import serviceJokes from '@/api/httpJokes';

interface IJoke {
  joke: string;
}

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
  ElNotification({
    title: 'Salvou.',
    message: `Não foi possível localizar`,
    type: 'success',
  });
};
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
