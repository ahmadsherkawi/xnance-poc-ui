document.addEventListener("DOMContentLoaded", function () {
    console.log('App loaded');

    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        alert('MetaMask is not installed! Please install MetaMask to interact with this DApp.');
        return;
    }

    // Connect to the user's MetaMask wallet
    async function connectWallet() {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected account:', accounts[0]);
            document.getElementById('wallet-address').innerText = accounts[0];
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    }

    // Interact with deployed smart contracts
    async function initContracts() {
        console.log('Initializing contract interaction...');
        
        // Replace with your contract's ABI and address
        const contractABI = [ /* your ABI array */ ];

        const contractAddress = '0xF69b6d416F2d1E82A2F6C85fF710c1cC0A774BE8';  // Your actual deployed contract address

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log('Contract instantiated:', contract);

        try {
            // Example call to a read function
            const despTokenAddress = await contract.despToken();
            console.log('DeSp Token Address:', despTokenAddress);
            document.getElementById('contract-value').innerText = despTokenAddress;
        } catch (error) {
            console.error('Error interacting with contract:', error.message);
            console.error('Full error details:', error);
        }
    }

    // Event listeners for buttons
    document.getElementById('connect-wallet-btn').addEventListener('click', connectWallet);
    document.getElementById('init-contract-btn').addEventListener('click', initContracts);
});
