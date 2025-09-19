// smoothScroll.js
export function smoothScroll(el, to, duration = 300) {
  if (!el) return
  const start = el.scrollTop
  const change = to - start
  const startTime = performance.now()

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    el.scrollTop = start + change * easeInOutQuad(progress)
    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  requestAnimationFrame(animateScroll)
}
