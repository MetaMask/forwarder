const refreshInterval = 3000
const parentMessageInterval = 1000
let reloadParentInterval
let parentWindow

const getParentWindow = () => {
  if (window.opener) {
    return window.opener
  } else if (window.parent) {
    return window.parent
  }

  throw new Error('Cannot determine parent window')
}

const registerForwarder = async (parentLocation) => {
  if (!window.ethereum._metamask.registerOnboardingForwarder) {
    throw new Error('Onboarding not supported by current version of MetaMask')
  }

  await window.ethereum._metamask.registerOnboardingForwarder(parentLocation)
}

const receiveParentMessage = (event) => {
  if (event.data.type === 'metamask:setParentLocation') {
    if (event.origin !== new URL(event.data.location).origin) {
      return console.log(`Location '${event.data.location}' doesn't match origin '${event.origin}'`)
    }
    console.log(`Parent location received: '${event.data.location}'`)
    registerForwarder(event.data.location)
    clearInterval(reloadParentInterval)
  } else {
    console.log(`Ignoring unrecognized message from parent`)
  }
}

const receiveContentScriptMessage = (event) => {
  if (event.data.type === 'metamask:onboardingcomplete') {
    console.log('Onboarding complete; closing window')
    window.close()
  }
}

const receiveMessage = (event) => {
  if (event.source === parentWindow) {
    receiveParentMessage(event)
  } else if (event.origin === new URL(window.location.href).origin) {
    receiveContentScriptMessage(event)
  } else {
    return console.log(`Ignoring cross-domain message from '${event.origin}'`)
  }
}

const initialize = () => {
  if (window.web3 === undefined) {
    return setTimeout(() => window.location.reload(), refreshInterval)
  }

  parentWindow = getParentWindow()
  window.addEventListener('message', receiveMessage)
  reloadParentInterval = setInterval(() => {
    console.log('Sending metamask:reload message')
    parentWindow.postMessage({ type: 'metamask:reload' }, '*')
  }, parentMessageInterval)
}
window.addEventListener('DOMContentLoaded', initialize)
