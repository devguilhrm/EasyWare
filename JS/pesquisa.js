const inputPesquisa = document.querySelector("#input-pesquisa");
const cards = document.querySelectorAll(".card");

inputPesquisa.addEventListener("input", () => {
    const texto = inputPesquisa.value.toLowerCase().trim();

    cards.forEach(card => {
        const nomeProduto = card.querySelector("h2").textContent.toLowerCase();

        if (nomeProduto.includes(texto)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});