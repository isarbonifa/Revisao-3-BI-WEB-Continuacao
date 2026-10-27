// ==========================================
// 1. CLASSE MANIPULADOR DOM
// ==========================================
class ManipuladorDOM {
    #tabelaBody;

    constructor(seletorTabelaBody) {
        this.#tabelaBody = document.getElementById(seletorTabelaBody);
    }

    limparTabela() {
        this.#tabelaBody.innerHTML = '';
    }

    renderizarLinha(cliente) {
        const novaLinha = document.createElement('tr');
        
        novaLinha.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.altura.toFixed(2)}</td>
            <td>${cliente.peso.toFixed(1)}</td>
            <td>${cliente.calcularIMC().toFixed(2)}</td>
            <td>${cliente.definirClassificacao()}</td>
        `;

        this.#tabelaBody.appendChild(novaLinha);
    }
}

// ==========================================
// 2. CLASSE CLIENTE
// ==========================================
class Cliente {
    #nome;
    #altura;
    #peso;

    constructor(nome, altura, peso) {
        this.#nome = nome;
        this.#altura = altura;
        this.#peso = peso;
    }

    get nome() {
        return this.#nome;
    }

    get altura() {
        return this.#altura;
    }

    get peso() {
        return this.#peso;
    }

    calcularIMC() {
        return this.#peso / (this.#altura * this.#altura);
    }

    definirClassificacao() {
        const imc = this.calcularIMC();
        
        if (imc < 18.5) {
            return 'Abaixo do peso';
        } else if (imc < 25) {
            return 'Peso normal';
        } else if (imc < 30) {
            return 'Sobrepeso';
        } else {
            return 'Obesidade';
        }
    }
}

// ==========================================
// 3. CLASSE PAINEL APP (Controlador)
// ==========================================
class PainelApp {
    #clientes;
    #dom;
    #form;

    constructor() {
        this.#clientes = [];
        this.#dom = new ManipuladorDOM('tabela-corpo');
        this.#form = document.getElementById('form-paciente');
        
        this.inicializarEventos();
    }

    carregarDadosIniciais() {
        // Método de suporte para dados iniciais, se necessário
    }

    adicionarCliente(cliente) {
        this.#clientes.push(cliente);
        this.renderizarPainel();
    }

    renderizarPainel() {
        this.#dom.limparTabela();
        this.#clientes.forEach(cliente => {
            this.#dom.renderizarLinha(cliente);
        });
    }

    inicializarEventos() {
        this.#form.addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const altura = parseFloat(document.getElementById('altura').value);
            const peso = parseFloat(document.getElementById('peso').value);

            if (altura <= 0 || peso <= 0) {
                alert('A altura e o peso devem ser superiores a zero!');
                return;
            }

            const novoCliente = new Cliente(nome, altura, peso);
            this.adicionarCliente(novoCliente);
            this.#form.reset();
        });
    }
}

// Inicializa a aplicação assim que o script é carregado
document.addEventListener('DOMContentLoaded', () => {
    new PainelApp();
});