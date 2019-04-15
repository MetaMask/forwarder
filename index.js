
 if (typeof window.web3 !== "undefined") {
  window.addEventListener('onboardingcomplete',function(event) {

    var string = window.location.href
    if( string.includes('fwd.metamask.io/')){
      
      var res = string.substring(17);
      window.open(res);

      window.close()
    
    }
  

     
  },false);
  } else {
    window.location.reload()
  }