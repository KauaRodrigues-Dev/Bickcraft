// ============================================
// CONFIGURAÇÃO EMAILJS
// ============================================
const EMAILJS_CONFIG = {
  serviceID: "service_qxwyhgk",
  templateContato: "template_bpbeok4",
  templateOrcamento: "template_spyti5f",
  publicKey: "mjPQ1OVZMDUxGnmBa",
};

// ============================================
// INICIALIZAÇÃO
// ============================================
(function () {
  // Inicializa EmailJS quando a página carregar
  emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// ============================================
// FUNÇÃO PARA ENVIAR FORMULÁRIO DE CONTATO
// ============================================
function enviarFormularioContato(event) {
  event.preventDefault();

  const botao = event.target.querySelector("button");
  const form = event.target;

  // Desabilita botão e mostra "Enviando..."
  botao.disabled = true;
  botao.innerText = "Enviando...";

  // Pega os dados do formulário
  const templateParams = {
    from_name: document.getElementById("nome").value,
    from_email: document.getElementById("email").value,
    phone: document.getElementById("telefone")?.value || "Não informado",
    message: document.getElementById("mensagem").value,
    to_email: "seu-email@gmail.com", // Seu email que vai receber
  };

  // Envia email via EmailJS
  emailjs
    .send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateContato,
      templateParams,
    )
    .then(function (response) {
      console.log("SUCCESS!", response.status, response.text);

      // Mensagem de sucesso
      form.innerHTML = `
        <p class='font-2-l' style='grid-column: 1/-1; padding: 1rem; border-radius: 4px; background: #000000; color: #f7f7f7'>
          <span style='color: #317A00;'>✓ Mensagem enviada com sucesso!</span><br>
          Em breve entraremos em contato. Geralmente respondemos em 24 horas.
        </p>
      `;
    })
    .catch(function (error) {
      console.error("FAILED...", error);

      // Mensagem de erro
      form.innerHTML = `
        <p class='font-2-l' style='grid-column: 1/-1; padding: 1rem; border-radius: 4px; background: #000000; color: #f7f7f7'>
          <span style='color: #E00000;'>✗ Erro no envio</span><br>
          Você pode enviar diretamente para: contato@bikcraft.com
        </p>
      `;

      botao.disabled = false;
      botao.innerText = "Enviar Mensagem";
    });
}

// ============================================
// FUNÇÃO PARA ENVIAR FORMULÁRIO DE ORÇAMENTO
// ============================================
function enviarFormularioOrcamento(event) {
  event.preventDefault();

  const botao = event.target.querySelector("button");
  const form = event.target;

  // Desabilita botão e mostra "Enviando..."
  botao.disabled = true;
  botao.innerText = "Enviando...";

  // Pega qual tipo foi selecionado (Bikcraft ou Seguro)
  const tipo =
    document.querySelector('input[name="tipo"]:checked')?.value ||
    "Não selecionado";
  const produto = document.querySelector('input[name="produto"]:checked');
  const produtoLabel = produto
    ? document.querySelector(`label[for="${produto.id}"]`)?.textContent
    : "Não selecionado";

  // Pega os dados do formulário
  const templateParams = {
    tipo: tipo,
    produto: produtoLabel,
    from_name: `${document.getElementById("nome").value} ${document.getElementById("sobrenome")?.value || ""}`,
    cpf: document.getElementById("cpf").value,
    from_email: document.getElementById("email").value,
    cep: document.getElementById("cep").value,
    numero: document.getElementById("numero").value,
    logradouro: document.getElementById("logradouro").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
    to_email: "seu-email@gmail.com", // Seu email que vai receber
  };

  // Envia email via EmailJS
  emailjs
    .send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateOrcamento,
      templateParams,
    )
    .then(function (response) {
      console.log("SUCCESS!", response.status, response.text);

      // Mensagem de sucesso
      form.innerHTML = `
        <p class='font-2-l' style='grid-column: 1/-1; padding: 1rem; border-radius: 4px; background: #000000; color: #f7f7f7'>
          <span style='color: #317A00;'>✓ Orçamento enviado com sucesso!</span><br>
          Em breve entraremos em contato. Geralmente respondemos em 24 horas.
        </p>
      `;
    })
    .catch(function (error) {
      console.error("FAILED...", error);

      // Mensagem de erro
      form.innerHTML = `
        <p class='font-2-l' style='grid-column: 1/-1; padding: 1rem; border-radius: 4px; background: #000000; color: #f7f7f7'>
          <span style='color: #E00000;'>✗ Erro no envio</span><br>
          Você pode enviar diretamente para: contato@bikcraft.com
        </p>
      `;

      botao.disabled = false;
      botao.innerText = "Solicitar Orçamento";
    });
}

// ============================================
// DETECTA AUTOMATICAMENTE QUAL FORMULÁRIO USAR
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("form");

  if (!formulario) return;

  // Detecta se é página de contato ou orçamento
  const isContato = document.body.id === "contato";
  const isOrcamento = document.body.id === "orcamento";

  if (isContato) {
    formulario.addEventListener("submit", enviarFormularioContato);
  } else if (isOrcamento) {
    formulario.addEventListener("submit", enviarFormularioOrcamento);
  }
});
