import { App } from 'vue'
import focus from './focus';

const install = function (app: App<Element>) {
  // Register a global custom directive called `v-focus`
  app.directive('focus', focus)
}

export default install