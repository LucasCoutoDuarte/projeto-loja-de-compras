// Função para alterar a quantidade e atualizar os valores
function alterarQtd(produto, acao) {
    const qtd = document.getElementById('qtd_' + produto);
    const valor = document.getElementById('valor_' + produto);
    const total = document.getElementById('total_' + produto);

    // Remove o "R$" e substitui vírgula por ponto para converter o valor unitário em número
    let valorNumerico = parseFloat(valor.innerHTML.replace('R$', '').replace('.', '').replace(',', '.'));

    // Verifica se a ação é válida
    if (acao == '-' && qtd.innerHTML == 0) {
        alert('Quantidade não pode ser menor que 0!!!');
    } else {
        // Atualiza a quantidade
        acao == '+' ? qtd.innerHTML++ : qtd.innerHTML--;

        // Calcula o total (quantidade * valor unitário)
        let totalNumerico = qtd.innerHTML * valorNumerico;

        // Formata o total no formato brasileiro (ex: 0,00)
        total.innerHTML = totalNumerico.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Atualiza o subtotal
        atualizarSubtotal();
    }
}

// Função para atualizar o subtotal no footer
function atualizarSubtotal() {
    let subtotal = 0;

    // Soma os totais de todos os produtos
    document.querySelectorAll('[id^="total_"]').forEach(element => {
        // Converte o total de cada produto para um número
        let totalProduto = parseFloat(element.innerHTML.replace('.', '').replace(',', '.'));
        subtotal += totalProduto;
    });

    // Verifica se o subtotal é válido e atualiza o valor no footer
    if (!isNaN(subtotal) && subtotal >= 0) {
        // Atualiza o subtotal no footer
        document.querySelector('footer span').innerHTML = `<i class="bi bi-cart-check"></i> Subtotal: R$ ${subtotal.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
        // Exibe um valor padrão caso o subtotal não seja válido
        document.querySelector('footer span').innerHTML = `<i class="bi bi-cart-check"></i> Subtotal: R$ 0,00`;
    }
}
