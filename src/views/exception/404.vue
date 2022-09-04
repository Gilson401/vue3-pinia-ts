<template>
  <el-row>
    <el-col>
      <el-result icon="warning" :title="t('page not found')" :sub-title="t('404 message')">
        <template #extra>
          <el-button type="primary">
            <router-link to="/">
              <span>HOME</span>
            </router-link>
          </el-button>
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
