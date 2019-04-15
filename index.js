
 if (typeof window.web3 !== "undefined") {
  window.addEventListener('onboardingcomplete',function(event) {

    if( string.includes('fwd.metamask.io/')){
      var string = window.location.href
      var res = string.substring(17);
      window.open(res);

      window.close()
    
    }
  

     
  },false);
  } else {
    window.location.reload()
  }