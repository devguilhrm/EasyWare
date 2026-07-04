function estaLogado() {
    return localStorage.getItem("logado") === "true";
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Carrinho.js carregado");
    
    const botoes = document.querySelectorAll(".btn-carrinho");
    console.log(`Encontrados ${botoes.length} botões de carrinho`);

    if (botoes.length === 0) {
        console.error("Nenhum botão com classe .btn-carrinho encontrado!");
        return;
    }

    botoes.forEach((btn, index) => {
        console.log(`Configurando botão ${index + 1}`);
        
        btn.addEventListener("click", (e) => {
            e.preventDefault(); // Previne comportamento padrão
            
            console.log("Botão clicado!");
            
            const card = btn.closest(".card");
            
            if (!card) {
                console.error("Card não encontrado!");
                alert("Erro: Card do produto não encontrado");
                return;
            }

            // Busca os elementos com validação
            const nomeEl = card.querySelector("h2");
            const precoEl = card.querySelector(".preco");
            const imgEl = card.querySelector("img");

            if (!nomeEl || !precoEl || !imgEl) {
                console.error("Elementos do produto não encontrados:", {
                    nome: nomeEl,
                    preco: precoEl,
                    img: imgEl
                });
                alert("Erro: Dados do produto incompletos");
                return;
            }

            const nome = nomeEl.innerText.trim();
            const precoTexto = precoEl.innerText.trim();
            const imagem = imgEl.src;
            const alt = imgEl.alt || nome;

            console.log("Dados extraídos:", { nome, precoTexto, imagem });

            // Converte preço
            const preco = parseFloat(
                precoTexto
                    .replace("R$", "")
                    .replace(/\./g, "")
                    .replace(",", ".")
                    .trim()
            );

            if (isNaN(preco)) {
                console.error("Preço inválido:", precoTexto);
                alert("Erro: Preço do produto inválido");
                return;
            }

            const produto = {
                id: Date.now(),
                nome,
                preco,
                imagem,
                alt,
                quantidade: 1
            };

            console.log("Produto criado:", produto);

            // Se não estiver logado, salva o produto e envia para LOGIN
            if (!estaLogado()) {
                console.log("Usuário não logado, salvando produto pendente");
                
                try {
                    localStorage.setItem("produtoPendente", JSON.stringify(produto));
                    console.log("Produto pendente salvo com sucesso");
                    
                    // Redireciona para login
                    window.location.href = "paginas/login.html";
                } catch (error) {
                    console.error("Erro ao salvar produto pendente:", error);
                    alert("Erro ao salvar produto. Tente novamente.");
                }
                return;
            }

            // Já está logado - adiciona ao carrinho
            console.log("Usuário logado, adicionando ao carrinho");
            
            try {
                let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
                console.log("Carrinho atual:", carrinho);

                const existente = carrinho.find(p => p.nome === produto.nome);

                if (existente) {
                    existente.quantidade++;
                    console.log("Produto já existe, aumentando quantidade");
                } else {
                    carrinho.push(produto);
                    console.log("Produto adicionado ao carrinho");
                }

                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                console.log("Carrinho salvo:", carrinho);

                // Redireciona para o carrinho
                window.location.href = "paginas/carrinho.html";
            } catch (error) {
                console.error("Erro ao adicionar ao carrinho:", error);
                alert("Erro ao adicionar produto ao carrinho");
            }
        });
    });
});