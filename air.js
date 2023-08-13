 window.addEventListener('load', async () => {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
      if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        alert('No web3 provider detected');
      }
      const contractAddress = '0x1088f19eb53aeed6521dda965eea2d7cceb7dd4f';
      const contractAbi = [{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getMaxAirdropTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
      const contract = new window.web3.eth.Contract(contractAbi, contractAddress);

      const claimTokens = async () => {
        try {
          const accounts = await window.web3.eth.getAccounts();
          const result = await contract.methods.claim().send({ from: accounts[0], gas: 100000 });
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      };

      document.querySelector('#claim-button').addEventListener('click', claimTokens);
    });