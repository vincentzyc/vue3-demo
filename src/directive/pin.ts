// const pin = {
//   mounted(el: HTMLInputElement, binding: any) {
//     el.style.position = 'fixed'
//     const s = binding.arg || 'top'
//     el.style[s] = binding.value + 'px'
//   },
//   updated(el: HTMLInputElement, binding: any) {
//     const s = binding.arg || 'top'
//     el.style[s] = binding.value + 'px'
//   }
// }

const pin = (el: HTMLInputElement, binding: any) => {
  el.style.position = 'fixed'
  const s = binding.arg || 'top'
  el.style[s] = binding.value + 'px'
}

export default pin