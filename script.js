// Elementos
const passwordDisplay = document.getElementById('password-display');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercaseCheckbox = document.getElementById('uppercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const strengthIndicator = document.getElementById('strength-indicator');

// Caracteres
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()-_=+{}[]|:;<>,.?/~';

// Atualiza valor visual do slider
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

// Gera senha
generateBtn.addEventListener('click', () => {
    const length = parseInt(lengthSlider.value);
    let chars = lowercaseChars;

    if (uppercaseCheckbox.checked) chars += uppercaseChars;
    if (numbersCheckbox.checked) chars += numberChars;
    if (symbolsCheckbox.checked) chars += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        const rand = Math.floor(Math.random() * chars.length);
        password += chars[rand];
    }

    passwordDisplay.value = password;
    updateStrengthBar(password);
});

// Copia senha
copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        navigator.clipboard.writeText(passwordDisplay.value)
            .then(() => alert('Senha copiada!'))
            .catch(err => alert('Erro ao copiar senha.'));
    }
});

// Calcula força da senha (simples)
function updateStrengthBar(password) {
    const length = password.length;
    let strength = 0;
    if (length > 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const colors = ['#ccc', 'orange', 'gold', '#28a745', '#007bff'];
    strengthIndicator.style.backgroundColor = colors[strength];
}
