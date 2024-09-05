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
        
        // Replace with your actual ABI
        const contractABI = [
            "function initiateTransfer(uint256 playerId, address fromClub, address toClub, uint256 amount) public",
            "function acceptTransfer(uint256 playerId) public",
            "function rejectTransfer(uint256 playerId) public",
            "function transfers(uint256) public view returns (address fromClub, address toClub, uint256 amount, uint8 status)"
        ];

        const contractAddress = '0xF69b6d416F2d1E82A2F6C85fF710c1cC0A774BE8'; // Your PlayerTransfer contract address

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            console.log('Contract instantiated:', contract);

            // Use your wallet address for both fromClub and toClub
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const playerId = 1; 
            const fromClub = accounts[0]; // Your wallet address
            const toClub = accounts[0]; // Same wallet address for trial
            const amount = ethers.utils.parseUnits("10", "ether");

            await contract.initiateTransfer(playerId, fromClub, toClub, amount);
            console.log('Player transfer initiated.');

            // Optionally, check the status of the transfer
            const transfer = await contract.transfers(playerId);
            console.log('Transfer status:', transfer.status);

        } catch (error) {
            console.error('Error interacting with contract:', error.message);
            console.error('Full error details:', error);
        }
    }

    // Event listeners for buttons
    document.getElementById('connect-wallet-btn').addEventListener('click', connectWallet);
    document.getElementById('init-contract-btn').addEventListener('click', initContracts);
});
