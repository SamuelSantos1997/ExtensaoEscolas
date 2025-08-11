document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault(); // Impede envio real

  // Aqui você poderia validar usuário/senha se quiser

  // Redireciona para o Kanban
  window.location.href = "/src/front/telaKanban.html";
});

document.querySelector(".cadastrar").addEventListener("click", () => {
  window.location.href = "/src/front/primeiroAcesso.html";
});
