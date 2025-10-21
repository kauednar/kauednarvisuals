document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const submitButton = form.querySelector(".submit");
    const messageBox = document.createElement("div");
    messageBox.id = "formMessage";

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    try {
      const response = await fetch("https://formspree.io/f/xgvnbdzp", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const existingMsg = document.getElementById("formMessage");
      if (existingMsg) existingMsg.remove();

      if (response.ok) {
        messageBox.style.color = "lightgreen";
        messageBox.textContent = "✅ Pedido enviado com sucesso! Entrarei em contato em breve.";
        form.reset();
      } else {
        messageBox.style.color = "tomato";
        messageBox.textContent = "❌ Ocorreu um erro ao enviar. Tente novamente.";
      }

      form.appendChild(messageBox);
    } catch (error) {
      messageBox.style.color = "tomato";
      messageBox.textContent = "❌ Falha de conexão. Verifique sua internet.";
      form.appendChild(messageBox);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar pedido";
    }
  });
});
