// Captura os elementos do formulário e da tabela
const form = document.getElementById('form-paciente');
const tabelaCorpo = document.getElementById('tabela-corpo');

// Ouve o evento de envio (submit) do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que a página recarregue

    // Pega os valores digitados nos inputs
    const nome = document.getElementById('nome').value;
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);

    // Calcula o IMC
    const imc = peso / (altura * altura);

    // Descobre a classificação do IMC
    let classificacao = '';
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
    } else if (imc < 25) {
        classificacao = 'Peso normal';
    } else if (imc < 30) {
        classificacao = 'Sobrepeso';
    } else {
        classificacao = 'Obesidade';
    }

    // Cria uma nova linha (tr) para inserir na tabela
    const novaLinha = document.createElement('tr');

    novaLinha.innerHTML = `
        <td>${nome}</td>
        <td>${altura.toFixed(2)}</td>
        <td>${peso.toFixed(1)}</td>
        <td>${imc.toFixed(2)}</td>
        <td>${classificacao}</td>
    `;

    // Adiciona a linha dentro do corpo da tabela
    tabelaCorpo.appendChild(novaLinha);

    // Limpa o formulário para o próximo cadastro
    form.reset();
});