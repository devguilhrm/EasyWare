document.addEventListener("DOMContentLoaded", () => {
    console.log("Carrinho-page.js carregado");
    // Pequeno delay para garantir sincronia com o localStorage
    setTimeout(() => {
        renderizarCarrinho();
        configurarEventos();
    }, 100);
});

/* Renderiza os itens do carrinho na tela
   REQUISITO: Atualiza interface sem recarregar a página manipulando o DOM
 */
function renderizarCarrinho() {
  
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const container = document.getElementById("itensCarrinho");
    const carrinhoVazio = document.getElementById("carrinhoVazio");
    const resumoPedido = document.getElementById("resumoPedido");

    container.innerHTML = ""; // Limpa o container antes de renderizar

    if (carrinho.length === 0) {
        carrinhoVazio.style.display = "block";
        resumoPedido.style.display = "none";
        return;
    }

    carrinhoVazio.style.display = "none";
    resumoPedido.style.display = "block";

    carrinho.forEach((produto, index) => {
        const subtotalItem = produto.preco * produto.quantidade;
        
        // REQUISITO: Campo de entrada (input) para alterar a quantidade
        const itemHTML = `
            <div class="item-carrinho" data-index="${index}">
                <div class="item-imagem">
                    <img src="${produto.imagem}" alt="${produto.alt || produto.nome}">
                </div>
                <div class="item-info">
                    <h3 class="item-nome">${produto.nome}</h3>
                    <p class="item-preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                    
                    <div class="item-quantidade">
                        <button class="btn-quantidade btn-diminuir" data-index="${index}">−</button>
                        
                        <!-- INPUT ADICIONADO PARA ATENDER AO REQUISITO -->
                        <input type="number" 
                               class="input-quantidade" 
                               value="${produto.quantidade}" 
                               min="1" 
                               data-index="${index}">
                               
                        <button class="btn-quantidade btn-aumentar" data-index="${index}">+</button>
                    </div>
                </div>
                <div class="item-acoes">
                    <!-- O subtotal é recalculado dinamicamente -->
                    <p class="item-subtotal">R$ ${subtotalItem.toFixed(2).replace('.', ',')}</p>
                    <button class="btn-remover" data-index="${index}">Remover</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", itemHTML);
    });

    atualizarResumo(carrinho);
}

/**
 * 3 Recalcula e exibe os valores totais.
 * REQUISITO: Recalcular automaticamente o valor total do item e do carrinho.
 */
function atualizarResumo(carrinho) {
    if (!carrinho) {
        carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    }
    
    const subtotal = carrinho.reduce((acc, produto) => {
        return acc + (produto.preco * produto.quantidade);
    }, 0);

    document.getElementById("subtotal").textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById("total").textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

/**
 * Função auxiliar para salvar no localStorage e atualizar a tela.
 * REQUISITO: Boas práticas de programação (evita repetição de código - DRY).
 */
function salvarERenderizar(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarCarrinho();
}

/**
 * Configura todos os eventos de clique e alteração de input.
 */
function configurarEventos() {
    const container = document.getElementById("itensCarrinho");
    const btnFinalizar = document.getElementById("btnFinalizar");
    const btnLimpar = document.getElementById("btnLimpar");

    // Delegação de eventos para os botões (+ e -)
    container.addEventListener("click", (e) => {
        const target = e.target;
        const index = parseInt(target.dataset.index);
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        if (target.classList.contains("btn-aumentar")) {
            carrinho[index].quantidade++;
            salvarERenderizar(carrinho);
            
        } else if (target.classList.contains("btn-diminuir")) {
            if (carrinho[index].quantidade > 1) {
                carrinho[index].quantidade--;
                salvarERenderizar(carrinho);
            }
            
        } else if (target.classList.contains("btn-remover")) {
            carrinho.splice(index, 1);
            salvarERenderizar(carrinho);
        }
    });

    // REQUISITO: Evento para quando o usuário digita diretamente no campo de input
    container.addEventListener("input", (e) => {
        if (e.target.classList.contains("input-quantidade")) {
            const index = parseInt(e.target.dataset.index);
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            
            // REQUISITO: Validar campo para aceitar apenas inteiros positivos
            let novaQuantidade = parseInt(e.target.value);
            
            if (isNaN(novaQuantidade) || novaQuantidade < 1) {
                novaQuantidade = 1; // Força o valor mínimo para 1
            }
            
            // Atualiza o valor no array e no input (caso tenha sido corrigido)
            carrinho[index].quantidade = novaQuantidade;
            e.target.value = novaQuantidade; 
            
            // Salva e atualiza a tela sem recarregar
            salvarERenderizar(carrinho);
        }
    });

    btnFinalizar.addEventListener("click", () => {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        alert("Compra finalizada com sucesso!");
        localStorage.removeItem("carrinho");
        window.location.href = "../index.html";
    });

    btnLimpar.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja limpar o carrinho?")) {
            localStorage.removeItem("carrinho");
            renderizarCarrinho();
        }
    });
}