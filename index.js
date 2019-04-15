
 if (typeof window.web3 !== "undefined") {
  window.addEventListener("message", receiveMessage, false)
  } else {
    window.location.reload()
  }


  function receiveMessage(event)
{
  // Do we trust the sender of this message?  (might be
  // different from what we originally opened, for example).
  console.log(event.data)

  // event.source is popup
  // event.data is "hi there yourself!  the secret response is: rheeeeet!"
}