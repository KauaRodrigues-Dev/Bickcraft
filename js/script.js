//todo Método para deixar o link do menu ativo

const links = document.querySelectorAll(".header-menu a");

function ativarLink(link) {
  const url = location.href;
  const href = link.href;

  if (url.includes(href)) {
    link.classList.add("ativo");
  }
}

links.forEach(ativarLink);

//? ////////////////////////////////////////////////////////////////////////////////////////////

//todo ativar itens do Orçamento

const parametros = new URLSearchParams(location.search);

function ativarProduto(parametro) {
  const elemento = document.getElementById(parametro);
  if (elemento) {
    elemento.checked = true;
  }
  console.log(parametro);
}

parametros.forEach(ativarProduto);

//? ////////////////////////////////////////////////////////////////////////////////////////////

//todo Perguntas frequentes

const perguntas = document.querySelectorAll(".perguntas button");

function ativarpergunta(event) {
  const pergunta = event.currentTarget;
  const controls = pergunta.getAttribute("aria-controls");
  const resposta = document.getElementById(controls);

  resposta.classList.toggle("ativa");
  const ativa = resposta.classList.contains("ativa");
  pergunta.setAttribute("aria-expanded", ativa);
}

function eventosPerguntas(pergunta) {
  pergunta.addEventListener("click", ativarpergunta);
}

perguntas.forEach(eventosPerguntas);

//? ////////////////////////////////////////////////////////////////////////////////////////////

//todo Galeria de Bicicletas

const galeria = document.querySelectorAll(".bicicleta-imagens img");
const galeriaContainer = document.querySelector(".bicicleta-imagens");

function trocarImagem(event) {
  const img = event.currentTarget;
  const media = matchMedia("(min-width: 1000px)").matches;
  if (media) {
    galeriaContainer.prepend(img);
  }
}

function eventosGaleria(img) {
  img.addEventListener("click", trocarImagem);
}

galeria.forEach(eventosGaleria);

//? ////////////////////////////////////////////////////////////////////////////////////////////

//todo Animção Simples

if (window.SimpleAnime) {
  new SimpleAnime();
}

//? ////////////////////////////////////////////////////////////////////////////////////////////

//todo Máscara para CEP
function aplicarMascaraCEP() {
  const campoCEP = document.getElementById("cep");

  if (campoCEP) {
    campoCEP.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
      e.target.value = value;
    });
  }
}

// Aplica a máscara quando a página carrega
document.addEventListener("DOMContentLoaded", aplicarMascaraCEP);

//? ////////////////////////////////////////////////////////////////////////////////////////////

//todo API para buscar CEP e completar endereço

// Função para buscar endereço pelo CEP usando ViaCEP
function buscarEndereco() {
  const cep = document.getElementById("cep")?.value?.replace(/\D/g, "");

  if (!cep || cep.length !== 8) {
    return;
  }

  // Mostra feedback visual
  const logradouro = document.getElementById("logradouro");
  const bairro = document.getElementById("bairro");
  const cidade = document.getElementById("cidade");
  const estado = document.getElementById("estado");

  logradouro.value = "Buscando...";
  bairro.value = "Buscando...";
  cidade.value = "Buscando...";
  estado.value = "Buscando...";

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((data) => {
      if (data.erro) {
        alert("CEP não encontrado!");
        limparCamposEndereco();
        return;
      }

      // Preenche os campos com os dados retornados
      logradouro.value = data.logradouro || "";
      bairro.value = data.bairro || "";
      cidade.value = data.localidade || "";
      estado.value = data.uf || "";

      // Foca no campo número para o usuário continuar preenchendo
      document.getElementById("numero")?.focus();
    })
    .catch((error) => {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar CEP. Tente novamente.");
      limparCamposEndereco();
    });
}

// Função auxiliar para limpar os campos de endereço
function limparCamposEndereco() {
  document.getElementById("logradouro").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
}
