import { createApp } from 'vue'
import App from './App.vue'

// Vuetify 스타일과 플러그인 임포트
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.use(vuetify)  // Vuetify 플러그인 등록
app.mount('#app')