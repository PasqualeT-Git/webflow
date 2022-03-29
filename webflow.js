// * Global scope variables
const lottie = Webflow.require('lottie').lottie;
const endpoint = 'https://8917-217-138-158-2.ngrok.io';

const getLottieAnimationById = (lottieId) => {
  const animations = lottie.getRegisteredAnimations();
  const loading = document.getElementById(lottieId)
  const getLottie = animations.filter(item => item.wrapper === loading)[0];
  return getLottie
}

//* Submit form structure
const getDataToSubmit = () => {
  const emailUser = document.getElementById('email').value
  const pasta = document.getElementById('Pasta').value || 'pasta'
  const form = document.querySelector('#email-form')
  const formdata = {}
    
  formdata['user'] = emailUser   
  formdata['product'] = getSelectedProduct()
  formdata['pasta'] = pasta;

  if (form.checkValidity() && getFile()) {
    return formdata
  } else {
    throw new Error('A problem occured, please check the passed details are valid')
  }
}

const manageSubmit = async (e) => {
  const formdata = getDataToSubmit()
  if (!formdata) { 
    new Error('An error ocuured with the request, please check with an administrator') 
    return
  }

  const formData = new FormData()
  
  const file = document.getElementById('file').files[0]

  formData.append('file', file)
  formData.append('data', JSON.stringify(formdata))

  formLoading = getLottieAnimationById('form-loading-lottie')
  formLoading.play()
  
  const res = await fetch(endpoint + `/send_form?email=${inputEmail.value}`, {
    'method' : 'POST',
    'body' : formData
  })

  if (res.status === 200) {
    const dataJson = await res.json()

    for (const [key, value] of Object.entries(dataJson.data)) {
      window.sessionStorage.setItem(key, value)
    }

    window.sessionStorage.setItem('manhattanjson', dataJson.manhattanjson)

    formLoading.stop()
    getLottieAnimationById('form-success-lottie').play()
    setTimeout(() => window.location.href = '/success', 2500)

  } else {
    formLoading.stop()
    getLottieAnimationById('form-error-lottie').play()
    const toastDiv = setToast('Please retry, an error occurred', 'rgba(255, 99, 71, 0.56)' )
      
    toastDiv.classList.remove('appear-toast')
    setTimeout(() => {toastDiv.classList.add('appear-toast')}, 3000)
    setTimeout(() => {window.location.href = '/' }, 5000)
  }
}

const getFile = () => {
  const file = document.getElementById('file').files[0]
  return file
}

//* Radio products bg effect structure
const products = document.querySelectorAll('.radio_product');

const changeBgAccordingly = (elem) => {
  const inputElem = elem.querySelector('input');
      
  if (inputElem.checked) {
    elem.classList.add('product_bg')
  } else {
    elem.classList.remove('product_bg')
  }
}

const getSelectedProduct = () => {
  const productUser = Array.from(products).filter(child => child.querySelector('input').checked)[0]
  const productUserValue = productUser?.querySelector('input').value || ''

  return productUserValue
}

products.forEach(product => {    
  product.addEventListener('click', () => {
    products.forEach(changeBgAccordingly)    
    
    nextFakeContainer.style.display = ''
  })
})

//* Check slides structure
const next = document.querySelector('a[class="button w-button"]');
const checkUserContainer = document.querySelector('#fake-check-container')
const nextFakeContainer = document.querySelector('#fake-next-container');
const nextFake = nextFakeContainer.querySelector('a');
const slides = document.getElementsByClassName('slide w-slide');

nextFakeContainer.style.display = 'block'
checkUserContainer.style.display = 'block'

document.body.addEventListener('click', ({ target }) => {
  const activeSlide = [...slides].find(slide => slide.attributes['aria-hidden'] === undefined)
  const activeModal = [...document.querySelectorAll('.modal')].filter(modal => modal.style.display != '')

  if (activeSlide.dataset.wId === "d1646e26-b157-6224-3d38-23b860a01de2") {
    if (!userIsVerified) {
      checkUserContainer.style.display = 'block'
    } else {
      checkUserContainer.style.display = ''
      nextFakeContainer.style.display = ''
    }
  }

  if (activeSlide.dataset.wId === "d1646e26-b157-6224-3d38-23b860a01db2") { 
    nextFake.addEventListener('click', () => {
      const toastDiv = setToast('Please choose one product', 'rgba(255, 221, 5, 0.56)' )
    
      toastDiv.classList.remove('appear-toast')
      setTimeout(() => {toastDiv.classList.add('appear-toast')}, 3000)
    })

    if (!getSelectedProduct()) {
      nextFakeContainer.style.display = 'block'
    } else {
      nextFakeContainer.style.display = ''
    }
  }

  if (activeSlide.dataset.wId === "d1646e26-b157-6224-3d38-23b860a01e09") {
    nextFake.addEventListener('click', () => {
      const toastDiv = setToast('Please upload a valid file', 'rgba(255, 221, 5, 0.56)' )
    
      toastDiv.classList.remove('appear-toast')
      setTimeout(() => {toastDiv.classList.add('appear-toast')}, 3000)
    })

    //* Mutation obsever structure
    const upload = document.querySelector('div[class="w-file-upload-success w-hidden"]')
    const options = {
      attributes: true,
      childList: true
    }

    function callback(mutationList, observer) {
      mutationList.forEach(({target}) => {
        if (target.style.display === 'inline-block') {
          nextFakeContainer.style.display = ''
        } else {
          nextFakeContainer.style.display = 'block'
        }
      })
    }

    const observer = new MutationObserver(callback)
    observer.observe(upload, options) 

    if (!getFile()) {
      nextFakeContainer.style.display = 'block'
    } else {
      nextFakeContainer.style.display = ''
    }
  }

  if (activeSlide.dataset.wId === "d1646e26-b157-6224-3d38-23b860a01e1b") {
    next.textContent = 'Submit'
    return next.addEventListener('click', manageSubmit)
  }

  if (activeModal.length > 0) {
    const modal = activeModal[0]
    
    if (target.id === 'close-modal' || target === modal) {
      modal.style = ''

      if (modal === modalVerifyUser) {
        verifySuccess.style.display = ''
        getLottieAnimationById('verify-success-lottie').stop()
        verifyContainer.style.display = 'block'
      }
    }
  }

  next.textContent = 'Next'
  next.removeEventListener('click', manageSubmit)
})

//* Form validation structure
const setToast = (message, color) => {
  const toastDiv = document.querySelector('#validation-toast')

  toastDiv.innerHTML = message
  toastDiv.style.backgroundColor = color

  return toastDiv
}

const validateEmail = (mail) => {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true
  }
}

//* Check user structure
const inputEmail = document.querySelector('input[name="email"]');
const checkUserButton = document.querySelector('#check-user')
const queryParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(queryParams.entries());
let userIsVerified = false

const fetchCheckUser = async (userEmail) => {
  const res = await fetch(endpoint + `/check_user?user_email=${userEmail}`)
  const resJson = await res.json()

  return resJson
}

const handleCheckUser = async () => {
  const userEmail = inputEmail.value
  checkUserButton.classList.add('disabled-button')
  checkUserLottie = getLottieAnimationById('checkUser-loading-lottie')
  checkUserLottie.play()
  
  if (validateEmail(userEmail)) {
    const checkUserWarning = getLottieAnimationById('checkUser-warning-lottie')
    const checkUserSuccess = getLottieAnimationById('checkUser-success-lottie')
    const { user_exists, user_is_verified } = await fetchCheckUser(userEmail)

    checkUserLottie.stop()

    if (!user_exists) {
      checkUserWarning.play()
      setTimeout(() => modalNewUser.style.display = 'block', 1500)
    }
    
    if (user_exists && !user_is_verified) {
      checkUserWarning.play()
      setTimeout(() => modalVerifyUser.style.display = 'block', 1500)  
    }

    if (user_exists && user_is_verified) {
      checkUserSuccess.play()
      user = true
      nextFakeContainer.style.display = ''
      checkUserContainer.style.display = ''
    }

    setTimeout(() => {
      checkUserWarning.stop()
      checkUserSuccess.stop()
    }, 3000)

  } else {
    const toastDiv = setToast('Please pass a valid email', 'rgba(255, 221, 5, 0.56)' )
    
    checkUserLottie.stop()
    checkUserButton.click()
    toastDiv.classList.remove('appear-toast')
    setTimeout(() => {toastDiv.classList.add('appear-toast')}, 3000)
    nextFakeContainer.style.display = 'block'
  }
  checkUserButton.classList.remove('disabled-button')
}

checkUserButton.addEventListener('click', handleCheckUser)
inputEmail.addEventListener('keydown', (e) => {if (e.key === 'Enter') handleCheckUser()})

//* Register new user structure
const formNewUser = document.querySelector('#form-new-user')
const modalNewUser = document.querySelector('#modal-new-user')

formNewUser.addEventListener('submit', (e) => {
  const formData = new FormData(formNewUser) 

  console.log(formData.entries())
})

//* Verify user structure
const sendVerificationButton = document.querySelector('#send-verification-button')
const modalVerifyUser = document.querySelector('#modal-verify-user') 
const verifyContainer = document.querySelector('#verify-user')
const verifySuccess = document.querySelector('#verify-success')

sendVerificationButton.addEventListener('click',async () => {
  sendVerificationButton.style.display = 'none'
  getLottieAnimationById('verify-loading-lottie').play()
  const res = await fetch(endpoint + `/authentication?email=${inputEmail.value}`)
  
  if (res.status === 200) {
    verifyContainer.style.display = 'none'
    getLottieAnimationById('verify-loading-lottie').stop()
    getLottieAnimationById('verify-success-lottie').play()
    verifySuccess.style.display = 'block'
  } else {
    console.log('An error occurred while sending the confirmation email')
  }
  sendVerificationButton.style.display = 'block'
})

if (params['email']) {
  inputEmail.value = params['email']
  setTimeout(() => checkUserButton.click(), 500)
}

setTimeout(() => {
  lottie.stop()
}, 80);