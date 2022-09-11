<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

const locale = zhCn;
</script>

<template>
  <TheNavBar />
  <div class="container mx-auto">
    <el-config-provider :locale="locale">
      <div class="m-1">
        <router-view />
      </div>
    </el-config-provider>
  </div>
  <TheFooter />
</template>
