/**
 * Verifica se o usuário está logado.
 * @returns {boolean} True se estiver logado, false caso contrário.
 */
function estaLogado() {
    return localStorage.getItem("logado") === "true";
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Script de Adição ao Carrinho carregado");
    
    const botoes = document.querySelectorAll(".btn-carrinho");

    botoes.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault(); 
            
            const card = btn.closest(".card");
            if (!card) return;

            // Extração segura dos dados do DOM
            const nomeEl = card.querySelector("h2");
            const precoEl = card.querySelector(".preco");
            const imgEl = card.querySelector("img");

            if (!nomeEl || !precoEl || !imgEl) {
                alert("Erro: Dados do produto incompletos no HTML.");
                return;
            }

            const nome = nomeEl.innerText.trim();
            // Converte "R$ 1.200,50" para 1200.50 (float)
            const preco = parseFloat(precoEl.innerText.replace("R$", "").replace(/\./g, "").replace(",", ".").trim());
            const imagem = imgEl.src;
            const alt = imgEl.alt || nome;

            if (isNaN(preco)) {
                alert("Erro: Preço do produto inválido.");
                return;
            }

            // Criação do objeto produto
            const novoProduto = {
                id: btn.dataset.id || Date.now(), 
                nome,
                preco,
                imagem,
                alt,
                quantidade: 1
            };

            // ---------------------------------------------------------
            // REQUISITO: Impedir duplicidade e atualizar apenas a quantidade
            // ---------------------------------------------------------
            if (!estaLogado()) {
                // Fluxo para usuário não logado (salva pendente e redireciona)
                localStorage.setItem("produtoPendente", JSON.stringify(novoProduto));
                window.location.href = "paginas/login.html";
                return;
            }

            // Fluxo para usuário logado
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            1.// Busca se o produto já existe pelo NOME (ou ID, se preferir: p.id === novoProduto.id)
            const produtoExistente = carrinho.find(p => p.nome === novoProduto.nome);

            if (produtoExistente) {
                // SE JÁ EXISTE: Apenas incrementa a quantidade, NÃO cria nova linha
                produtoExistente.quantidade++;
                console.log(`Quantidade de "${nome}" atualizada para ${produtoExistente.quantidade}`);
            } else {
                // SE NÃO EXISTE: Adiciona como novo item no array
                carrinho.push(novoProduto);
                console.log(`Produto "${nome}" adicionado ao carrinho`);
            }

            // Salva o estado atualizado no localStorage
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            
            // Redireciona para a página do carrinho
            window.location.href = "paginas/carrinho.html";
        });
    });
});