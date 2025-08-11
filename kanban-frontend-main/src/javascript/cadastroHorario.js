document.addEventListener("DOMContentLoaded", () => {
  const selectProfessor = document.querySelector("select");

  let professoresCarregados = false;

  function carregarProfessores() {
    if (professoresCarregados) return; // evita carregar novamente

    const lista = JSON.parse(localStorage.getItem("professores")) || [];

    // Remove todas as opções exceto a primeira
    while (selectProfessor.options.length > 1) {
      selectProfessor.remove(1);
    }

    lista.forEach(prof => {
      const option = document.createElement("option");
      option.value = prof.id || prof.nome;
      option.textContent = prof.nome;
      selectProfessor.appendChild(option);
    });

    professoresCarregados = true;
  }

  // Quando o select recebe foco ou é clicado
  selectProfessor.addEventListener("focus", carregarProfessores);
  selectProfessor.addEventListener("mousedown", carregarProfessores);
});
