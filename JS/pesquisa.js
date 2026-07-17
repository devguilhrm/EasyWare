const inputPesquisa = document.querySelector("#input-pesquisa");
const cards = document.querySelectorAll(".card");

inputPesquisa.addEventListener("input", () => {
    
    // .toLowerCase(): Converte tudo para minúscula
    // .trim(): Remove espaços em branco no início e no fim
    const texto = inputPesquisa.value.toLowerCase().trim();

    // puxa cada card de produto para verificar se ele corresponde ao critério de busca.
    cards.forEach(card => {
        
        // Extrai o texto do nome do produto (assumindo que está dentro de uma tag <h2>).
        // Também convertemos para minúsculas para garantir que a comparação com o 'texto' seja justa.
        const nomeProduto = card.querySelector("h2").textContent.toLowerCase();

        // O método .includes() verifica se a string 'nomeProduto' contém a substring 'texto'.
        if (nomeProduto.includes(texto)) {
            // Se o nome do produto CONTÉM o que foi digitado, exibe o card.
            card.style.display = "block"; 
        } else {
            // Se nn contém, oculta o card do layout.
            card.style.display = "none";
        }
    });
});