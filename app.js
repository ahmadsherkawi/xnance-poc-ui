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
        // Replace with your contract's ABI and address
        const contractABI = '82213853141539f96fabb0f4753609ef';
        const contractAddress = '0x405f1F0f5264a8f3ebDC1DeFe2d4e19F90E1f31A';

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        try {
            const value = await contract.getValue(); // Replace with actual function
            console.log('Contract Value:', value);
            document.getElementById('contract-value').innerText = value;
        } catch (error) {
            console.error('Error interacting with contract:', error);
        }
    }

    // Event listeners for buttons
    document.getElementById('connect-wallet-btn').addEventListener('click', connectWallet);
    document.getElementById('init-contract-btn').addEventListener('click', initContracts);
});

