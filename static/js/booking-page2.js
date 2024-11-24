document.getElementById('next-button').addEventListener('click', function () {
  // eslint-disable-next-line no-undef
  localStorage.setItem('selected-parkingBay', selectedBays);

  window.location.href = 'booking-page3.html';
});
