const getColorSchemeBtn = document.getElementById('get-scheme-btn');
const inputSeed = document.getElementById('seed-color');
const colorSchemeMode = document.getElementById('color-scheme-mode');
const colorContainers = document.querySelectorAll('.color-container');
// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

function renderDisplay() {
  fetch('https://www.thecolorapi.com/scheme?hex=35A1E0', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log('data', data);
      // console.log('AA', data.colors[3].XYZ.fraction);

      colorContainers.forEach((container, index) => {
        const colorValue = data.colors[index].hex.value;
        container.style.backgroundColor = colorValue;
        container.innerHTML = `<div class="hex-value">${colorValue}<div>`;
      });
    });
}
renderDisplay();

getColorSchemeBtn.addEventListener('click', function () {
  // console.log('btn was clicked');
  var inputSeedValue = inputSeed.value;
  const inputSeedClean = inputSeedValue.slice(1);
  // console.log('seed color was choosen', inputSeedClean);
  var colorSchemeModeByUser = colorSchemeMode.value;
  // console.log('color scheme mode was choosen', colorSchemeModeByUser);

  getColorScheme(inputSeedClean, colorSchemeModeByUser);
});

function getColorScheme(inputSeedClean, colorSchemeModeByUser) {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${inputSeedClean}&mode=${colorSchemeModeByUser}`,
    {
      method: 'GET',
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      colorContainers.forEach((container, index) => {
        const colorValue = data.colors[index].hex.value;
        container.style.backgroundColor = colorValue;
        container.innerHTML = `<div class="hex-value">${colorValue}<div>`;
      });
    });
}
colorContainers.forEach((color) => {
  color.addEventListener('click', function () {
    copyToClipboard(color.innerText);
  });
});

async function copyToClipboard(text) {
  // console.log(text);
  await navigator.clipboard.writeText(text);
  // alert('Copied');
  const notification = document.createElement('div');
  notification.className = 'notification-style';

  notification.innerHTML = `Color <b>${text}</b> is copied to the clipboard! `;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 2000);
}
// function plus(num1, num2, num3) {
//   sum = num1 + num2 + num3;
//   console.log(sum);
// }
// plus(3, 5, 2);
