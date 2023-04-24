async function checkFarmerAddress() {
    let account;
  
    if (typeof window.ethereum === "undefined") {
      console.error("Metamask not detected");
      return;
    }
  
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0];
      alert(account);
  
      if (account !== "0x430a97760ff69773fbff0f45e5383bd74043bcba") {
        window.location.href = "/index.html";
        return;
      }
  
      return account; // return the account value
    } catch (error) {
      console.error(error);
    }
  }
  