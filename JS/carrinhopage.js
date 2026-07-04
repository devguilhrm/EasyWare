document.addEventListener("DOMContentLoaded", () => {
    console.log("Carrinho-page.js carregado");
    
    // Aguarda um pouco para garantir que o localStorage foi atualizado
    setTimeout(() => {
        renderizarCarrinho();
        configurarEventos();
    }, 100);
});

function renderizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    console.log("Carrinho carregado:", carrinho);
    console.log("Total de itens:", carrinho.length);
    
    const container = document.getElementById("itensCarrinho");
    const carrinhoVazio = document.getElementById("carrinhoVazio");
    const resumoPedido = document.getElementById("resumoPedido");

    // Limpa o container
    container.innerHTML = "";

    if (carrinho.length === 0) {
        console.log("Carrinho vazio");
        carrinhoVazio.style.display = "block";
        resumoPedido.style.display = "none";
        return;
    }

    console.log(`Renderizando ${carrinho.length} itens`);
    
    carrinhoVazio.style.display = "none";
    resumoPedido.style.display = "block";

    // Renderiza cada item
    carrinho.forEach((produto, index) => {
        console.log(`Renderizando item ${index}:`, produto);
        
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
                        <span class="quantidade-valor">${produto.quantidade}</span>
                        <button class="btn-quantidade btn-aumentar" data-index="${index}">+</button>
                    </div>
                </div>
                <div class="item-acoes">
                    <p class="item-subtotal">R$ ${(produto.preco * produto.quantidade).toFixed(2).replace('.', ',')}</p>
                    <button class="btn-remover" data-index="${index}">Remover</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", itemHTML);
    });

    atualizarResumo();
}

function atualizarResumo() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    const subtotal = carrinho.reduce((acc, produto) => {
        return acc + (produto.preco * produto.quantidade);
    }, 0);

    document.getElementById("subtotal").textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById("total").textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    
    console.log("Resumo atualizado - Subtotal:", subtotal);
}

function configurarEventos() {
    const container = document.getElementById("itensCarrinho");
    const btnFinalizar = document.getElementById("btnFinalizar");
    const btnLimpar = document.getElementById("btnLimpar");

    // Event delegation para botões de quantidade e remover
    container.addEventListener("click", (e) => {
        const target = e.target;
        const index = parseInt(target.dataset.index);

        if (target.classList.contains("btn-aumentar")) {
            aumentarQuantidade(index);
        } else if (target.classList.contains("btn-diminuir")) {
            diminuirQuantidade(index);
        } else if (target.classList.contains("btn-remover")) {
            removerItem(index);
        }
    });

    // Finalizar compra
    btnFinalizar.addEventListener("click", () => {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        alert("Compra finalizada com sucesso! (Funcionalidade de pagamento será implementada)");
        localStorage.removeItem("carrinho");
        window.location.href = "../index.html";
    });

    // Limpar carrinho
    btnLimpar.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja limpar o carrinho?")) {
            localStorage.removeItem("carrinho");
            renderizarCarrinho();
        }
    });
}

function aumentarQuantidade(index) {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho[index].quantidade++;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarCarrinho();
}

function diminuirQuantidade(index) {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--;
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        renderizarCarrinho();
    }
}

function removerItem(index) {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarCarrinho();
}