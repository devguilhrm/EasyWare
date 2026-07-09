document.addEventListener("DOMContentLoaded", () => {
    const linksFiltro = document.querySelectorAll("#menu-filtro a");
    const cards = document.querySelectorAll(".card");

    // Ativa o link "Todos" por padrão ao carregar a página
    const linkTodos = document.querySelector('#menu-filtro a[data-categoria="todos"]');
    if (linkTodos) linkTodos.classList.add("ativo");

    linksFiltro.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            
            // Gerencia a classe visual de botão ativo no menu
            linksFiltro.forEach(l => l.classList.remove("ativo"));
            link.classList.add("ativo");

            const categoriaSelecionada = link.getAttribute("data-categoria");
            let cardIndex = 0; // Contador para os cards que vão de fato aparecer

            cards.forEach(card => {
                const categoriaCard = card.getAttribute("data-categoria");

                // Remove o estado de animação anterior para resetar o ciclo
                card.classList.remove("efeito-zoom");
                card.style.animationDelay = "0ms";

                if (categoriaSelecionada === "todos" || categoriaSelecionada === categoriaCard) {
                    card.style.display = ""; // Torna o card visível no Grid
                    
                    // Define o delay dinâmico (60ms de diferença entre um card e outro)
                    card.style.animationDelay = `${cardIndex * 60}ms`;
                    
                    // Truque de performance: força o navegador a reiniciar a animação CSS
                    void card.offsetWidth; 
                    
                    card.classList.add("efeito-zoom");
                    cardIndex++; // Incrementa apenas para os cards visíveis
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});