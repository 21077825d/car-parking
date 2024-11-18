document.getElementById('registerButton').addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const repeatPassword = document.getElementById('repeatPassword').value.trim();
  const email = document.getElementById('email').value.trim();
  const phoneNumber = document.getElementById('phone-number').value.trim();

  // Check for empty username and password
  if (!username || !password) {
    alert('Username and password cannot be empty');
    return;
  }

  // Check for password mismatch
  if (password !== repeatPassword) {
    alert('Password mismatch!');
    return;
  }

  // Check for selected role
  if (!email) {
    alert('Please enter your email');
    return;
  }

  if (!phoneNumber) {
    alert('Please enter your phone number');
    return;
  }

  // Prepare form data
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('email', email);
  formData.append('phone number', phoneNumber);

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      alert(`Welcome, ${result.user.username}!\nYou can login with your account now!`);
      window.location.href = '/success-register.html'; // Redirect to login page
    } else {
      alert(result.message); // Show error message
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert('An error occurred during registration. Please try again.');
  }
});
