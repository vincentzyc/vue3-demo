import { getCurrentInstance } from 'vue';

// expose public api
export function useExpose(apis: Record<string, any>): void {
  const instance = getCurrentInstance();
  if (instance) {
    Object.assign(instance.proxy, apis);
  }
}
