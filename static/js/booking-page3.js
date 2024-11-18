window.onload = function () {
  var vehicleType = localStorage.getItem('vehicleType');
  var entryDate = localStorage.getItem('entryDate');
  var exitDate = localStorage.getItem('exitDate');
  var parkingFee = localStorage.getItem('parkingFee');

  var vehicleTypeText = getVehicleTypeText(vehicleType);

  var notesHtml = `
        Vehicle Classification: ${vehicleTypeText}
        Entry Date &amp; Time: ${entryDate}
        Exit Date &amp; Time: ${exitDate}
        Booking Fee: HKD$${parkingFee}
    `;

  document.querySelector('.notes').innerHTML = notesHtml;

  document.getElementById('payForm').addEventListener('submit', function (event) {
    event.preventDefault();
    handleFormSubmit();
  });
};

function handleFormSubmit() {
  var mobileNo = document.getElementById('mobile-no').value;
  var carPlateNo = document.getElementById('car-plate-no').value;
  var octopusCardNo = document.getElementById('octopus-card-no').value;
  var confirmOctopusCardNo = document.getElementById('octopus-card-no-confirm').value;
  var octopusCardLastDigit = document.getElementById('octopus-card-last-digit').value;
  var confirmLastDigit = document.getElementById('octopus-card-last-digit-confirm').value;

  if (
    !validateForm(mobileNo, carPlateNo, octopusCardNo, confirmOctopusCardNo, octopusCardLastDigit, confirmLastDigit)
  ) {
    return;
  }

  sendFormData({
    vehicleType: localStorage.getItem('vehicleType'),
    entryDate: localStorage.getItem('entryDate'),
    exitDate: localStorage.getItem('exitDate'),
    parkingFee: localStorage.getItem('parkingFee'),
    mobileNo: mobileNo,
    carPlateNo: carPlateNo,
    octopusCardNo: octopusCardNo,
    octopusCardLastDigit: octopusCardLastDigit,
    confirmLastDigit: confirmLastDigit,
  });
}

function validateForm(
  mobileNo,
  carPlateNo,
  octopusCardNo,
  confirmOctopusCardNo,
  octopusCardLastDigit,
  confirmLastDigit
) {
  if (
    !mobileNo ||
    !carPlateNo ||
    !octopusCardNo ||
    !confirmOctopusCardNo ||
    !octopusCardLastDigit ||
    !confirmLastDigit
  ) {
    alert('Please fill in all fields');
    return false;
  }

  if (!/^\d{8}$/.test(mobileNo)) {
    alert('Invalid mobile number. It should be 8 digits.');
    return false;
  }

  if (!/^\d{8}$/.test(octopusCardNo) || !/^\d$/.test(octopusCardLastDigit)) {
    alert('Invalid Octopus card number. It should be 8 digits and the last digit should be a single digit.');
    return false;
  }

  if (octopusCardNo !== confirmOctopusCardNo || octopusCardLastDigit !== confirmLastDigit) {
    alert('Octopus card number does not match.');
    return false;
  }

  return true;
}

function sendFormData(data) {
  fetch('/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      window.location.href = 'payment-success.html';
    })
    .catch(function (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('Payment failed. Please try again.');
    });
}

function getVehicleTypeText(vehicleType) {
  switch (vehicleType) {
    case 'disabled-private-car':
      return 'Disabled Private Car';
    case 'van-type-light-goods-vehicle':
      return 'Van-type Light Goods Vehicle';
    case 'motorcycle':
      return 'Motorcycle';
    case 'private-car':
      return 'Private Car';
    default:
      return 'Unknown Vehicle Type';
  }
}
