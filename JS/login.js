const formulario = document.querySelector("#loginForm");

if (!formulario) {
    console.error("Formulário de login não encontrado!");
} else {
    formulario.addEventListener("submit", (evt) => {
        evt.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value.trim();

        // Recupera o usuário cadastrado
        const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

        if (!usuarioSalvo) {
            alert("Nenhum usuário cadastrado. Faça o cadastro primeiro!");
            window.location.href = "cadastro.html";
            return;
        }

        // Valida credenciais
        if (email !== usuarioSalvo.email || senha !== usuarioSalvo.senha) {
            alert("E-mail ou senha incorretos!");
            return;
        }

        // Login bem-sucedido
        localStorage.setItem("logado", "true");
        console.log("Login realizado com sucesso");

        // Verifica se há produto pendente (veio do carrinho)
        const produtoPendente = JSON.parse(localStorage.getItem("produtoPendente"));
        console.log("Produto pendente:", produtoPendente);

        if (produtoPendente) {
            console.log("Adicionando produto pendente ao carrinho");
            
            try {
                // Adiciona o produto ao carrinho
                let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

                const existente = carrinho.find(p => p.nome === produtoPendente.nome);

                if (existente) {
                    existente.quantidade++;
                } else {
                    carrinho.push(produtoPendente);
                }

                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                localStorage.removeItem("produtoPendente");
                
                console.log("Produto adicionado ao carrinho:", carrinho);

                // Redireciona para o carrinho
                window.location.href = "paginas/carrinho.html";
            } catch (error) {
                console.error("Erro ao adicionar produto pendente:", error);
                alert("Erro ao adicionar produto ao carrinho");
            }
        } else {
            // Redireciona para a página inicial
            window.location.href = "../index.html";
        }
    });
}