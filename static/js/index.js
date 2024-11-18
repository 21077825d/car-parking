document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('logoutButton').addEventListener('click', async () => {
    if (confirm('Confirm to logout?')) {
      try {
        const response = await fetch('/auth/logout', {
          method: 'POST',
        });

        if (response.ok) {
          window.location.href = '/login.html';
        } else {
          alert('Logout failed');
        }
      } catch (error) {
        alert('Logout failed');
      }
    }
  });
});
