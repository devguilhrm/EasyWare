function estaLogado(){
    return localStorage.getItem("logado") === "true";
}

function protegerCarrinho(){
    if(!estaLogado()){
        window.location.href = "login.html"; // ← ALTERADO (era cadastro.html)
    }
}