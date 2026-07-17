document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('CEP');

    cepInput.addEventListener('blur', async () => {
        // Remove caracteres não numéricos
        const cep = cepInput.value.replace(/\D/g, '');

        // Valida se tem 8 dígitos
        if (cep.length !== 8) {
            alert('CEP inválido. Por favor, digite 8 números.');
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }

            // Preenche os campos baseando-se nos IDs do seu HTML
            document.getElementById('Endereço').value = data.logradouro || '';
            document.getElementById('Bairro').value = data.bairro || '';
            document.getElementById('Cidade').value = data.localidade || '';
            document.getElementById('estado').value = data.uf || '';

        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            alert('Ocorreu um erro ao buscar o CEP.');
        }
    });
});