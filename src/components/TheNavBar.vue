<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-menu-item index="0">
      <router-link class="icon-btn mx-2" to="/">
        <span>HOME</span>
      </router-link>
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">
      <router-link class="icon-btn mx-2" to="poke">
        <span>POKEMON</span>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link class="icon-btn mx-2" to="jokes">
        <span>JOKES </span>
      </router-link>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const route = useRoute();
const activeIndex = ref(route.path);
watch(
  route,
  (newValue) => {
    if (newValue) {
      const names = newValue.name;
      activeIndex.value = ['home', 'poke', 'jokes']
        .findIndex((name: string) => {
          return name === names;
        })
        .toString();
    }
  },
  { flush: 'pre', immediate: true, deep: true },
);
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
