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
  
      if (account !== "0x20cacc2d44c6056a4a8d657cd8bdc05bec7e611b") {
        window.location.href = "/index.html";
        return;
      }
  
      return account; // return the account value
    } catch (error) {
      console.error(error);
    }
  }
  