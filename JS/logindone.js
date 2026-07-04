const formulario = document.querySelector("#cadastropessoa");

formulario.addEventListener("submit", (evt) => {

    evt.preventDefault();

    const Cad = new FormData(formulario);

    const novapessoa = {
        nome: Cad.get("nome"),
        email: Cad.get("email"),
        telefone: Cad.get("Telefone"),
        datanascimento: Cad.get("Datanascimento"),
        cep: Cad.get("CEP"),
        endereço: Cad.get("Endereço"),
        numerocasa: Cad.get("Numerocasa"),
        bairro: Cad.get("Bairro"),
        cidade: Cad.get("Cidade"),
        estado: Cad.get("estado"),
        cpf: Cad.get("CPF"),
        senha: Cad.get("senha"),
        confirmasenha: Cad.get("confirmasenha")
    };

    if (novapessoa.senha !== novapessoa.confirmasenha) {
        alert("As senhas não coincidem!");
        return;
    }

    localStorage.setItem("usuario", JSON.stringify(novapessoa));
    localStorage.setItem("logado", "true");

    alert("Cadastro realizado com sucesso!");

    // Recupera o produto salvo antes do cadastro
    const produtoPendente = JSON.parse(
        localStorage.getItem("produtoPendente")
    );

    if (produtoPendente) {

        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        const existente = carrinho.find(
            p => p.nome === produtoPendente.nome
        );

        if (existente) {
            existente.quantidade++;
        } else {
            carrinho.push(produtoPendente);
        }

        localStorage.setItem(
            "carrinho",
            JSON.stringify(carrinho)
        );

        localStorage.removeItem("produtoPendente");

        window.location.href = "carrinho.html";
        return;
    }

    window.location.href = "../index.html";

});