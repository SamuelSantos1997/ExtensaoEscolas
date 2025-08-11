document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-box");
  const nomeInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const senhaInput = form.querySelector('input[type="password"]');
  const dataInput = form.querySelector('input[type="date"]');
  const tabela = document.querySelector("tbody");

  let editIndex = null;

  function formatarDataBR(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  function carregarProfessores() {
    const lista = JSON.parse(localStorage.getItem("professores")) || [];
    tabela.innerHTML = "";

    lista.forEach((prof, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${prof.nome}</td>
        <td>${prof.email}</td>
        <td>${formatarDataBR(prof.dataNascimento)}</td>
        <td>${"*".repeat(prof.senha.length)}</td>
        <td>
          <i class="fas fa-pen text-primary me-2" data-index="${index}" style="cursor:pointer;"></i>
          <i class="fas fa-trash text-danger" data-index="${index}" style="cursor:pointer;"></i>
        </td>
      `;

      tabela.appendChild(tr);
    });
  }

  function salvarProfessor(e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();
    const dataNascimento = dataInput.value;

    if (!nome || !email || !senha || !dataNascimento) {
      alert("Preencha todos os campos.");
      return;
    }

    const lista = JSON.parse(localStorage.getItem("professores")) || [];
    const novo = { nome, email, senha, dataNascimento };

    if (editIndex !== null) {
      lista[editIndex] = novo;
      editIndex = null;
    } else {
      lista.push(novo);
    }

    localStorage.setItem("professores", JSON.stringify(lista));
    form.reset();
    carregarProfessores();
  }

  function editarProfessor(index) {
    const lista = JSON.parse(localStorage.getItem("professores")) || [];
    const prof = lista[index];

    nomeInput.value = prof.nome;
    emailInput.value = prof.email;
    senhaInput.value = prof.senha;
    dataInput.value = prof.dataNascimento;

    editIndex = index;
  }

  function excluirProfessor(index) {
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div style="
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.5); display: flex;
        align-items: center; justify-content: center; z-index: 9999;">
        <div style="background: white; padding: 30px; border-radius: 8px; text-align: center;">
          <p>Deseja excluir este professor?</p>
          <button id="confirmarExcluir" class="btn btn-danger me-2">Confirmar</button>
          <button id="cancelarExcluir" class="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector("#confirmarExcluir").addEventListener("click", () => {
      const lista = JSON.parse(localStorage.getItem("professores")) || [];
      lista.splice(index, 1);
      localStorage.setItem("professores", JSON.stringify(lista));
      modal.remove();
      carregarProfessores();
    });

    modal.querySelector("#cancelarExcluir").addEventListener("click", () => {
      modal.remove();
    });
  }

  tabela.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("fa-pen")) {
      editarProfessor(index);
    }

    if (e.target.classList.contains("fa-trash")) {
      excluirProfessor(index);
    }
  });

  form.addEventListener("submit", salvarProfessor);

  carregarProfessores();
});
