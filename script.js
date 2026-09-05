// Efecto sutil de movimiento al pasar el ratón sobre las tarjetas.
// No recoge datos ni envía información a ningún servidor.
document.querySelectorAll(".feature-card").forEach(card => {
  card.addEventListener("mousemove", (event) => {
    const r = card.getBoundingClientRect();
    const x = ((event.clientX - r.left) / r.width - .5) * 4;
    const y = ((event.clientY - r.top) / r.height - .5) * -4;
    card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
