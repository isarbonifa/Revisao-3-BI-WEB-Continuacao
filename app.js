// ==========================================
// 1. CLASSE MANIPULADOR DOM
// ==========================================
class ManipuladorDOM {
    constructor(seletorTabelaBody) {
        this.tabelaBody = document.getElementById(seletorTabelaBody);
    }

    limparTabela() {
        this.tabelaBody.innerHTML = '';
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

        this.tabelaBody.appendChild(novaLinha);
    }
}

// ==========================================
// 2. CLASSE CLIENTE
// ==========================================
class Cliente {
    constructor(nome, altura, peso) {
        this._nome = nome;
        this._altura = altura;
        this._peso = peso;
    }

    get nome() {
        return this._nome;
    }

    get altura() {
        return this._altura;
    }

    get peso() {
        return this._peso;
    }

    calcularIMC() {
        return this._peso / (this._altura * this._altura);
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
    constructor() {
        this.clientes = [];
        this.dom = new ManipuladorDOM('tabela-corpo');
        this.form = document.getElementById('form-paciente');
        
        this.inicializarEventos();
    }

    carregarDadosIniciais() {
        // Método de suporte para dados iniciais, se necessário
    }

    adicionarCliente(cliente) {
        this.clientes.push(cliente);
        this.renderizarPainel();
    }

    renderizarPainel() {
        this.dom.limparTabela();
        this.clientes.forEach(cliente => {
            this.dom.renderizarLinha(cliente);
        });
    }

    inicializarEventos() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const altura = parseFloat(document.getElementById('altura').value);
            const peso = parseFloat(document.getElementById('peso').value);

            // Validação simples de dados inconsistentes
            if (altura <= 0 || peso <= 0) {
                alert('Altura e peso devem ser maiores que zero!');
                return;
            }

            // Instancia um novo objeto da classe Cliente
            const novoCliente = new Cliente(nome, altura, peso);

            // Adiciona ao array e atualiza o painel
            this.adicionarCliente(novoCliente);

            // Reseta o formulário
            this.form.reset();
        });
    }
}

// Inicializa a aplicação assim que o script é carregado
document.addEventListener('DOMContentLoaded', () => {
    new PainelApp();
});