const from = document.getElementById("fromInput");
const to = document.getElementById("toInput");
const fromDrop = document.getElementById('fromDropdown');
const toDrop = document.getElementById('toDropdown');
const fromLabel = document.getElementById('fromLabel');
const toLabel = document.getElementById('toLabel');

async function populateDropDown() {
    const api = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json`;

    try {
        const response = await fetch(api);
        const data = await response.json();

        const currencyKeys = Object.keys(data.inr);

        fromDrop.innerHTML = '';
        toDrop.innerHTML = '';


        currencyKeys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key.toUpperCase();
            fromDrop.appendChild(option);
        });
        currencyKeys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key.toUpperCase();
            toDrop.appendChild(option);
        });

    }
    catch (error) {
        console.error(error);
    }
}

async function currency(value) {
    const api = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${value}.json`;

    const response = await fetch(api);
    return await response.json();
}

async function runFromConverter() {

    const data = await currency(fromDrop.value);

    to.value = (data[fromDrop.value][toDrop.value] * from.value).toFixed(2);

}

async function runToConverter() {

    const data = await currency(toDrop.value);

    from.value = (data[toDrop.value][fromDrop.value] * to.value).toFixed(2);

}

populateDropDown();
from.addEventListener('input', runFromConverter);
to.addEventListener('input', runToConverter);
fromDrop.addEventListener('change', runFromConverter);
toDrop.addEventListener('change', runFromConverter);


from.addEventListener('click', (event) => {
    if (fromLabel.textContent === 'To') {
      fromLabel.classList.add('fadein');
      fromLabel.textContent = 'From';
  
      toLabel.classList.add('fadein');
      toLabel.textContent = 'To';

      setTimeout(() => {
        fromLabel.classList.remove('fadein');
        toLabel.classList.remove('fadein');
      }, 500);
    }
  });
  
  to.addEventListener('click', (event) => {
    if (toLabel.textContent === 'To') {
      toLabel.classList.add('fadein');
      toLabel.textContent = 'From';
  
      fromLabel.classList.add('fadein');
      fromLabel.textContent = 'To';
  
      setTimeout(() => {
        toLabel.classList.remove('fadein');
        fromLabel.classList.remove('fadein');
      }, 500);
    }
  });
  
