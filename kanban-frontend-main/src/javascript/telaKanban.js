document.addEventListener("DOMContentLoaded", () => {
  const colunaProfessores = document.getElementById("coluna-professores");

  function criarCard(professor) {
    const card = document.createElement("div");
    card.classList.add("kanban-card");
    card.setAttribute("draggable", "true");

    card.innerHTML = `
      <p class="card-title">${professor.nome}</p>
      <div class="card-infos">
        <div class="card-icons">
          <p><i class="fa-regular fa-comment"></i> 0</p>
          <p><i class="fa-solid fa-paperclip"></i> 0</p>
        </div>
        <div class="user">
          <img src="/src/images/avatar2.png" alt="Avatar">
        </div>
      </div>
    `;

    // Eventos de drag
    card.addEventListener("dragstart", e => {
      e.currentTarget.classList.add("dragging");
    });

    card.addEventListener("dragend", e => {
      e.currentTarget.classList.remove("dragging");
    });

    return card;
  }

  function carregarProfessores() {
    const professores = JSON.parse(localStorage.getItem("professores")) || [];
    professores.forEach(prof => {
      const card = criarCard(prof);
      colunaProfessores.appendChild(card);
    });
  }

// Seleciona todos os elementos com a classe '.kanban-cards' (as colunas) e adiciona eventos a cada um deles
document.querySelectorAll('.kanban-cards').forEach(column => {
    // Evento disparado quando um card arrastado passa sobre uma coluna (drag over)
    column.addEventListener('dragover', e => {
        // Previne o comportamento padrão para permitir o "drop" (soltar) do card
        e.preventDefault();
        // Adiciona a classe 'cards-hover'
        e.currentTarget.classList.add('cards-hover');
    });

    // Evento disparado quando o card sai da área da coluna (quando o card é arrastado para fora)
    column.addEventListener('dragleave', e => {
        // Remove a classe 'cards-hover' quando o card deixa de estar sobre a coluna
        e.currentTarget.classList.remove('cards-hover');
    });

    // Evento disparado quando o card é solto (drop) dentro da coluna
    column.addEventListener('drop', e => {
        // Remove a classe 'cards-hover', já que o card foi solto
        e.currentTarget.classList.remove('cards-hover');

        // Seleciona o card que está sendo arrastado (que tem a classe 'dragging')
        const dragCard = document.querySelector('.kanban-card.dragging');
        
        // Anexa (move) o card arrastado para a coluna onde foi solto
        e.currentTarget.appendChild(dragCard);
    });
});

carregarProfessores();
});
