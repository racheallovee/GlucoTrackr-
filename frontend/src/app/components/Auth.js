import Web3 from "web3";

const authenticateUser = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const walletAddress = accounts[0];

      // Sign a message for backend verification
      const message = "Welcome to GlucoTrackr";
      const signature = await web3.eth.personal.sign(
        message,
        walletAddress,
        ""
      );

      // Send the wallet address and signature to the backend
      const response = await fetch("/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, signature }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  } else {
    console.error("MetaMask not detected");
  }
};
