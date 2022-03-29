const data_report = window.sessionStorage
const valid = document.getElementById('valid_n').innerHTML = data_report['valid'] || "0";
const invalid = document.getElementById('invalid_n').innerHTML = data_report['invalid'] || "0";
const trab = document.getElementById('trab_n').innerHTML = data_report['trab'] || "0";
const civel = document.getElementById('civ_n').innerHTML = data_report['civ'] || "0";
const fed = document.getElementById('fed_n').innerHTML = data_report['fed'] || "0";
const others = document.getElementById('others_n').innerHTML = data_report['others'] || "0";

//* Confirm retrieved data structure
const confirmData = document.querySelector('#confirm-data')

const lottie = Webflow.require('lottie').lottie;
const endpoint = 'https://8917-217-138-158-2.ngrok.io';

const getLottieAnimationById = (lottieId) => {
  const animations = lottie.getRegisteredAnimations();
  const loading = document.getElementById(lottieId)
  const getLottie = animations.filter(item => item.wrapper === loading)[0];
  return getLottie
}

const mergeDataModal = document.querySelector('#mergedata-modal')
const mergeDataLoading = document.querySelector('#mergedata-loading-modal')
const mergeDataSuccess = document.querySelector('#mergedata-success-modal')
const mergeDataError = document.querySelector('#mergedata-error-modal')

confirmData.addEventListener('click', async () => {
  mergeDataLoading.style.display = 'block'
  getLottieAnimationById('mergedata-loading-lottie').play()

  const res = await fetch(endpoint + '/send_data', {
    'method': 'POST',
    headers: {
      "Content-type": "application/json"
    },
    'body': data_report['manhattanjson']
  })

  getLottieAnimationById('mergedata-loading-lottie').stop()

  if (res.status === 200) {
    getLottieAnimationById('mergedata-success-lottie').play()
    mergeDataLoading.style.display = ''
    mergeDataSuccess.style.display = 'block'
  } else {
    getLottieAnimationById('mergedata-error-lottie').play()
    mergeDataLoading.style.display = ''
    mergeDataError.style.display = 'block'
  }
})

document.body.addEventListener('click', ({ target }) => {
  if (target != mergeDataModal || target.id === 'close-modal-validation') {
    mergeDataModal.style.display = ''
  }
})

setTimeout(() => {
  lottie.stop()
}, 80);