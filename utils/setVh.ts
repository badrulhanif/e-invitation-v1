export function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Call on page load & resize
window.addEventListener("resize", setVh);
setVh();
