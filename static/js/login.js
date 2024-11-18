document.getElementById('loginButton').addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert('Username and password cannot be empty');
    return;
  }

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      alert(`Logged as ${result.user.username} (${result.user.role})`);
      window.location.href = 'User_BookingPage.html';
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert('Unknown error');
  }
});
