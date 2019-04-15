if (typeof window.web3 !== "undefined") {
        var account = web3.eth.accounts[0];
      var accountInterval = setInterval(function() {
        if (web3.eth.accounts[0] !== account) {
          account = web3.eth.accounts[0];
          window.location.reload()
        }
      }, 100);
        
  
 
  window.addEventListener("message", receiveMessage, false)
  } else {
    window.location.reload()
  }


  function receiveMessage(event)
{
  // Do we trust the sender of this message?  (might be
  // different from what we originally opened, for example).
  if(event.data==='onboardingcomplete'){
    var string = window.location.href
    if( string.includes('fwd.metamask.io/')){
      
      var res = string.substring(24);
      window.open(res)
     window.close()
    
    }
  }

  // event.source is popup
  // event.data is "hi there yourself!  the secret response is: rheeeeet!"
}

