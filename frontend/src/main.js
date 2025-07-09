const app = document.getElementById('app');

fetch('/api/check')
    .then(res => res.json())
    .then(data => {
        if (!data.authenticated) {
            app.innerHTML = \`
                <form id="login-form">
                    <input name="username" placeholder="Username">
                    <input name="password" placeholder="Password" type="password">
                    <button type="submit">Login</button>
                </form>
            \`;
            document.getElementById('login-form').onsubmit = async (e) => {
                e.preventDefault();
                const form = e.target;
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: form.username.value,
                        password: form.password.value
                    })
                });
                if (res.ok) location.reload();
                else alert("Login failed");
            };
        } else {
            app.innerHTML = "<h1>Welcome to the Dashboard</h1>";
        }
    });
