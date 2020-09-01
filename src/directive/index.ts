import { App } from 'vue'
import focus from './focus'
import pin from './pin'

const install = function (app: App<Element>) {
  app.directive('focus', focus)
  app.directive('pin', pin)
}

export default install