window.addEventListener('load', async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);

      const chainId = '0x89'; // Chain ID for Polygon (MATIC) mainnet
      const contractAddress = '0x1088f19eb53aeed6521dda965eea2d7cceb7dd4f';
      const contractAbi = [{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getMaxAirdropTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
      const contract = new window.web3.eth.Contract(contractAbi, contractAddress);

      const claimTokens = async () => {
        try {
          const accounts = await window.web3.eth.getAccounts();
          const gasPrice = await window.web3.eth.getGasPrice();
          
          const result = await contract.methods.claim().send({
            from: accounts[0],
            gas: 100000, // Set a reasonable gas limit
            gasPrice: gasPrice // Set the current gas price
          });
          
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      };

      document.querySelector('#claim-button').addEventListener('click', claimTokens);
    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
    }
  } else {
    alert('No Ethereum provider detected');
  }
});
