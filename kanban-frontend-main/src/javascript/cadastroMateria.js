document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nomeInput = document.querySelector('input[placeholder*="nome"]');
  const cargaInput = document.querySelector('input[placeholder*="horário"]');
  const assuntosInput = document.querySelector("textarea");
  const tabela = document.querySelector("tbody");

  let editIndex = null;

  function carregarDisciplinas() {
    const lista = JSON.parse(localStorage.getItem("disciplinas")) || [];
    tabela.innerHTML = "";

    lista.forEach((disciplina, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${disciplina.nome}</td>
        <td>${disciplina.carga}${disciplina.carga.includes("hora") ? "" : " horas"}</td>
        <td>${disciplina.assuntos}</td>
        <td>
          <i class="fas fa-pen me-2 text-primary" data-index="${index}" style="cursor:pointer;"></i>
          <i class="fas fa-trash text-danger" data-index="${index}" style="cursor:pointer;"></i>
        </td>
      `;

      tabela.appendChild(tr);
    });
  }

  function salvarDisciplina(e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const carga = cargaInput.value.trim();
    const assuntos = assuntosInput.value.trim();

    const cargaValida = /^\d+$/.test(carga);
    if (!cargaValida) {
      alert("A carga horária deve conter apenas números.");
      cargaInput.focus();
      return;
    }

    const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(nome);
    if (!nomeValido) {
      alert("O nome deve conter apenas letras.");
      nomeInput.focus();
      return;
    }

    if (!nome || !carga || !assuntos) {
      alert("Preencha todos os campos.");
      return;
    }

    const lista = JSON.parse(localStorage.getItem("disciplinas")) || [];

    const nova = { nome, carga, assuntos };

    if (editIndex !== null) {
      lista[editIndex] = nova;
      editIndex = null;
    } else {
      lista.push(nova);
    }

    localStorage.setItem("disciplinas", JSON.stringify(lista));
    form.reset();
    carregarDisciplinas();
  }

  function editarDisciplina(index) {
    const lista = JSON.parse(localStorage.getItem("disciplinas")) || [];
    const item = lista[index];

    nomeInput.value = item.nome;
    cargaInput.value = item.carga;
    assuntosInput.value = item.assuntos;

    editIndex = index;
  }

  function excluirDisciplina(index) {
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div style="
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.5); display: flex;
        align-items: center; justify-content: center; z-index: 9999;">
        <div style="background: white; padding: 30px; border-radius: 8px; text-align: center;">
          <p>Tem certeza que deseja excluir esta disciplina?</p>
          <button id="confirmarExcluir" class="btn btn-danger me-2">Confirmar</button>
          <button id="cancelarExcluir" class="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector("#confirmarExcluir").addEventListener("click", () => {
      const lista = JSON.parse(localStorage.getItem("disciplinas")) || [];
      lista.splice(index, 1);
      localStorage.setItem("disciplinas", JSON.stringify(lista));
      modal.remove();
      carregarDisciplinas();
    });

    modal.querySelector("#cancelarExcluir").addEventListener("click", () => {
      modal.remove();
    });
  }

  tabela.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("fa-pen")) {
      editarDisciplina(index);
    }

    if (e.target.classList.contains("fa-trash")) {
      excluirDisciplina(index);
    }
  });

  form.addEventListener("submit", salvarDisciplina);

  carregarDisciplinas();
});
