<template>
  <div class="container max-w-3xl mx-auto mt-40">
    <div class="mb-8">
      <h1 class="font-serif font-bold text-5xl mb-8 text-center">{{ tUseI18n('hello') }} Vue3, Pinia and Tyescript</h1>
      <div class="mx-auto mb-4 grid grid-cols-3">
        <img src="@/assets/vue3.png" alt="vue3.png" />
        <img src="@/assets/typescript.png" alt="typescript.png" />
        <img src="@/assets/pinia.png" alt="pinia.png" />
      </div>
    </div>
    <div class="text-center text-md">
      <div class="text-left mb-6">
        <p class="mt-30 mb-3 font-semibold text-2xl">O que este projeto demonstra:</p>

        <ul class="text-lg">
          <li>Vue3 com Typescript e composition API;</li>
          <li>Consumo de duas APIS públicas com serviços dedicados com Axios;</li>
          <li>Armazenamento de dados na store Pinia, uma para cada serviço;</li>
          <li></li>
          <li></li>
        </ul>

        <p class="my-20 font-semibold text-2xl">Use o menu no topo da página para navegar.</p>
      </div>

      <p class="mb-10">
        <a class="icon-btn mx-2" href="https://github.com/nekobc1998923/vitecamp" target="_blank" title="GitHub">
          {{ tUseI18n('based') }}
        </a>
      </p>

      <p class="mb-10">
        <strong>Vitecamp</strong>
        {{ tUseI18n('includes features') }}
      </p>

      <p class="mb-10">
        <template v-for="(item, index) in featureList" :key="index">
          <a :href="item.href" target="_blank">{{ item.name }}</a>
          <template v-if="!item.isEnd"> | </template>
        </template>
      </p>
      <div>
        {{ tUseI18n('before coding') }} , {{ tUseI18n('setup ide') }} <strong>VSCode</strong> + <strong>Volar</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t: tUseI18n } = useI18n();

const featureList = [
  {
    name: 'Vite3',
    href: 'https://github.com/vitejs/vite',
  },
  {
    name: 'Vue3',
    href: 'https://github.com/vuejs/core',
  },
  {
    name: 'TypeScript',
    href: 'https://github.com/microsoft/TypeScript',
  },
  {
    name: 'Element Plus',
    href: 'https://element-plus.gitee.io/zh-CN/',
  },
  {
    name: 'Vue Router 4',
    href: 'https://router.vuejs.org/zh/',
  },
  {
    name: 'Pinia',
    href: 'https://pinia.vuejs.org/',
  },
  {
    name: 'icones',
    href: 'https://icones.netlify.app/',
  },
  {
    name: 'Windi CSS',
    href: 'https://github.com/windicss/windicss',
  },
  {
    name: 'Axios',
    href: 'https://axios-http.com/',
  },
  {
    name: 'I18n',
    href: 'https://github.com/intlify/vite-plugin-vue-i18n',
  },
  {
    name: 'Prettier',
    href: 'https://github.com/prettier/prettier',
  },
  {
    name: 'ESLint',
    href: 'https://github.com/eslint/eslint',
  },
  {
    name: 'Airbnb Style',
    href: 'https://github.com/airbnb/javascript',
  },
  {
    name: 'Husky',
    href: 'https://github.com/typicode/husky',
  },
  {
    name: 'VueUse',
    href: 'https://github.com/vueuse/vueuse',
  },
  {
    name: 'Markdown',
    href: 'https://github.com/antfu/vite-plugin-md',
  },
  {
    name: 'NProgress',
    href: 'https://github.com/rstacruz/nprogress',
    isEnd: true,
  },
];
</script>

<style lang="scss" scoped>
a {
  @apply text-sky-300 hover:(text-sky-600) transition-all ease-out duration-100;
}
img {
  @apply h-full w-auto;
}
</style>
