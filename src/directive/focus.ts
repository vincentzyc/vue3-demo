const focus = {
  mounted(el: HTMLInputElement, binding: any) {
    el.focus();
    el.style.width = binding.value + 'px'
  }
}

export default focus