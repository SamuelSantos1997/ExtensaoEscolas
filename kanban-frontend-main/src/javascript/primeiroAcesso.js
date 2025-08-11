document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-box");
  const nomeInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const senhaInput = form.querySelector('input[type="password"]');
  const dataInput = form.querySelector('input[type="date"]');

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();
    const dataNascimento = dataInput.value;

    // Validações
    if (!nome || !email || !senha || !dataNascimento) {
      alert("Preencha todos os campos.");
      return;
    }

    const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(nome);
    if (!nomeValido) {
      alert("O nome deve conter apenas letras.");
      nomeInput.focus();
      return;
    }

    // Aqui você pode simular envio, ou redirecionar:
    mostrarMensagemSucesso();
  });
});

function mostrarMensagemSucesso() {
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
        <h4 class="mb-3">Cadastro efetuado com sucesso!</h4>
        <button class="btn btn-primary">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("button").addEventListener("click", () => {
    modal.remove();
    window.location.href = "/src/front/login.html";
  });
}