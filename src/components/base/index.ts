import { App } from 'vue'
import Button from './Button.vue';
import Select from './Select.vue';

const install = function (app: App<Element>): void {
  app.component('YuiButton', Button)
  app.component('YuiSelect', Select)
}

export default install