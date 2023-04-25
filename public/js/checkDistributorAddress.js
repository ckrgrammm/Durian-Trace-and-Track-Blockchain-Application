async function checkDistributorAddress() {
    let account;
  
    if (typeof window.ethereum === "undefined") {
      console.error("Metamask not detected");
      return;
    }
  
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0];
      const distributorAccount = await contract.methods.distributor().call();
      const farmerAccount = await contract.methods.farmer().call();
      if (account !== distributorAccount.toLowerCase()||distributorAccount.toLowerCase()===farmerAccount.toLowerCase()) {
        alert("You cannot access this page!");
        window.location.href = "/index.html";
        return;
      }
  
      return account; // return the account value
    } catch (error) {
      console.error(error);
    }
  }
  