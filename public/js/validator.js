const PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    telefone: /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/,
    nome: /^[a-zA-ZÀ-ÿ\s]{2,}$/,
    matricula: /^[0-9]{4,10}$/
};

const MENSAGENS_ERRO = {
    required: campo => `O campo ${campo} é obrigatório!`,
    invalid: campo => `O campo ${campo} está em formato inválido!`,
    minLength: (campo, min) => `O campo ${campo} deve ter no mínimo ${min} caracteres!`,
    maxLength: (campo, max) => `O campo ${campo} deve ter no máximo ${max} caracteres!`,
    anoInvalido: 'O ano de publicação deve estar entre 1800 e o ano atual!',
    emailInvalido: 'Por favor, insira um email válido!',
    telefoneInvalido: 'Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX!',
    nomeInvalido: 'O nome deve conter apenas letras e espaços!',
    matriculaInvalida: 'A matrícula deve conter apenas números e ter entre 4 e 10 dígitos!'
};

function validarFormularioUsuario() {
    const campos = {
        nome: document.getElementById('nome').value.trim(),
        matricula: document.getElementById('matricula').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
    };

    if (!PATTERNS.nome.test(campos.nome)) {
        mostrarErro(MENSAGENS_ERRO.nomeInvalido);
        return false;
    }

    if (!PATTERNS.matricula.test(campos.matricula)) {
        mostrarErro(MENSAGENS_ERRO.matriculaInvalida);
        return false;
    }

    if (!PATTERNS.email.test(campos.email)) {
        mostrarErro(MENSAGENS_ERRO.emailInvalido);
        return false;
    }

    if (campos.telefone && !PATTERNS.telefone.test(campos.telefone)) {
        mostrarErro(MENSAGENS_ERRO.telefoneInvalido);
        return false;
    }

    return true;
}

function validarFormularioLivro() {
    const campos = {
        titulo: document.getElementById('titulo').value.trim(),
        autor: document.getElementById('autor').value.trim(),
        genero: document.getElementById('genero').value.trim(),
        anoPublicacao: document.getElementById('anoPublicacao').value.trim(),
    };

    if (campos.titulo.length < 2) {
        mostrarErro(MENSAGENS_ERRO.minLength('título', 2));
        return false;
    }

    if (!PATTERNS.nome.test(campos.autor)) {
        mostrarErro('Nome do autor deve conter apenas letras e espaços!');
        return false;
    }

    const anoAtual = new Date().getFullYear();
    const anoPublicacao = parseInt(campos.anoPublicacao);
    
    if (isNaN(anoPublicacao) || anoPublicacao < 1800 || anoPublicacao > anoAtual) {
        mostrarErro(MENSAGENS_ERRO.anoInvalido);
        return false;
    }

    return true;
}

function mostrarErro(mensagem) {
    let errorDiv = document.getElementById('error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #ff4444;
            color: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
        `;
        document.body.appendChild(errorDiv);
    }

    errorDiv.textContent = mensagem;

    setTimeout(() => {
        errorDiv.style.animation = 'slideOut 0.5s ease-in';
        setTimeout(() => errorDiv.remove(), 500);
    }, 5000);
}

// Adiciona estilos de animação ao documento
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);