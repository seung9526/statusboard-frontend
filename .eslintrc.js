module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'vue/valid-v-slot': 'off', // 임시로 끄기
  },
  settings: {
    'vue/setup-compiler-macros': true,
  },
}
