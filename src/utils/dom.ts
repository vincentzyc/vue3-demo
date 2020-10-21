/**
 * 滑动到底部
 */
export function easeBottom() {
  let position = window.pageYOffset
  const destination = document.documentElement.offsetHeight - document.documentElement.clientHeight
  // 不存在原生`requestAnimationFrame`，用`setTimeout`模拟替代
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (fn) {
      return setTimeout(fn, 17);
    };
  }
  function step() {
    position = position + (destination - position) / 8;
    if (Math.abs(destination - position) < 2) {
      //动画结束
      window.scrollTo(0, destination)
      return;
    }
    window.scrollTo(0, position)
    requestAnimationFrame(step);
  }
  step();
}