document.addEventListener('DOMContentLoaded', () => {
  const registerButton = document.getElementById('registerButton');

  registerButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('repeat-password').value.trim();
    const role = document.getElementById('role').value;

    if (!username || !password) {
      alert('Username and password cannot be empty');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password mismatch!');
      return;
    }

    if (!role) {
      alert('Please select your role');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', role);

    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Welcome, ${result.user.username}!\nYou can login with your account now!`);
        window.location.href = 'login.html';
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });
});