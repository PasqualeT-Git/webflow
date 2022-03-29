const data_report = window.sessionStorage
const valid = document.getElementById('valid_n').innerHTML = data_report['valid'] || "0";
const invalid = document.getElementById('invalid_n').innerHTML = data_report['invalid'] || "0";
const trab = document.getElementById('trab_n').innerHTML = data_report['trab'] || "0";
const civel = document.getElementById('civ_n').innerHTML = data_report['civ'] || "0";
const fed = document.getElementById('fed_n').innerHTML = data_report['fed'] || "0";
const others = document.getElementById('others_n').innerHTML = data_report['others'] || "0";

//* Confirm retrieved data structure
const confirmData = document.querySelector('#confirm-data')
const endpoint = 'https://8917-217-138-158-2.ngrok.io'

confirmData.addEventListener('click', async () => {
  const res = await fetch(endpoint + '/send_data', {
    'method': 'POST',
    headers: {
      "Content-type": "application/json"
    },
    'body': data_report['manhattanjson']
  })

  console.log(res)
})