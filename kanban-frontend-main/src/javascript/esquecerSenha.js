document.addEventListener("DOMContentLoaded", () => {
  // Botão "Voltar"
  document.querySelector(".voltar").addEventListener("click", () => {
    window.location.href = "/src/front/login.html";
  });

  // Enviar código
  document.querySelector(".form-box").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value.trim();

    if (!email) {
      alert("Digite um e-mail válido.");
      return;
    }

    mostrarMensagemCodigoEnviado();
  });

  function mostrarMensagemCodigoEnviado() {
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div style="
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.5); display: flex;
        align-items: center; justify-content: center; z-index: 9999;">
        <div style="
          background: white; padding: 30px 40px;
          border-radius: 12px; text-align: center;
          box-shadow: 0 0 15px rgba(0,0,0,0.2); max-width: 400px;">
          <h4 class="mb-3">Código de recuperação enviado!</h4>
          <p class="mb-3">Verifique sua caixa de entrada do e-mail e siga as instruções.</p>
          <button class="btn btn-primary">OK</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("button").addEventListener("click", () => {
      modal.remove();
      // Você pode redirecionar ou deixar o usuário na mesma tela
       window.location.href = "/src/front/login.html";
    });
  }
});
