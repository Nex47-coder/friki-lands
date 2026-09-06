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

// Contador de miembros en vivo, usando el endpoint público de invitaciones de Discord.
// No requiere activar el "Server Widget"; solo el código de invitación.
// Nota: esto sí hace una petición externa a discord.com para leer el contador (no envía nada del usuario).
(async function loadDiscordStats() {
  const targets = document.querySelectorAll(".discord-stats");
  if (!targets.length) return;

  try {
    const res = await fetch("https://discord.com/api/v10/invites/bZRkCKvanz?with_counts=true");
    if (!res.ok) throw new Error("respuesta no válida");
    const data = await res.json();
    const text = `🟢 ${data.approximate_presence_count} online · ${data.approximate_member_count} miembros`;
    console.log("Contador de Discord cargado:", text);
    targets.forEach(el => { el.textContent = text; });
  } catch (err) {
    // Si falla (invitación caducada, sin conexión, etc.) lo mostramos en consola para poder depurarlo.
    console.error("Error al cargar el contador de Discord:", err);
    targets.forEach(el => { el.style.display = "none"; });
  }
})();
