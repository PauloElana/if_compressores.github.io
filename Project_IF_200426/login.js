async function login() {
    const btn = document.querySelector('.btn-primary');
    if (btn) { btn.disabled = true; btn.textContent = 'Entrando...'; }

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Preencha e-mail e senha.");
        if (btn) { btn.disabled = false; btn.innerHTML = '🔐 <span>Entrar</span>'; }
        return;
    }

    const { error } = await window.db.auth.signInWithPassword({
        email: email,
        password: senha
    });

    if (error) {
        alert("Login inválido. Verifique suas credenciais.");
        if (btn) { btn.disabled = false; btn.innerHTML = '🔐 <span>Entrar</span>'; }
        return;
    }

    window.location.href = "dashboard.html";
}
