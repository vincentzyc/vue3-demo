import { App } from 'vue'
import Button from './Button.vue';
import Select from './Select.vue';

const version = '1.0';

const install = function (app: App<Element>) {
  app.component('YuiButton', Button)
  app.component('YuiSelect', Select)
}

export default {
  install,
  version
};