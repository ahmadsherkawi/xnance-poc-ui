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
            document.getElementById('wallet-address').innerText = "Connected Wallet Address: " + accounts[0];
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    }

    // Interact with deployed smart contracts
    async function initContracts() {
        console.log('Initializing contract interaction...');
        
        const playerTransferABI = [
            "function initiateTransfer(uint256 playerId, address fromClub, address toClub, uint256 amount) public",
            "function acceptTransfer(uint256 playerId) public",
            "function rejectTransfer(uint256 playerId) public",
            "function transfers(uint256) public view returns (address fromClub, address toClub, uint256 amount, uint8 status)",
            "function despToken() public view returns (address)"
        ];

        const erc20ABI = [
            "function balanceOf(address account) external view returns (uint256)",
            "function allowance(address owner, address spender) external view returns (uint256)",
            "function approve(address spender, uint256 amount) external returns (bool)",
            "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)"
        ];

        const contractAddress = '0xF69b6d416F2d1E82A2F6C85fF710c1cC0A774BE8'; // Your PlayerTransfer contract address

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const playerTransferContract = new ethers.Contract(contractAddress, playerTransferABI, signer);
            console.log('PlayerTransfer Contract instantiated:', playerTransferContract);

            // Fetch the despToken contract address from PlayerTransfer contract
            const despTokenAddress = await playerTransferContract.despToken();
            console.log('DeSpToken contract address:', despTokenAddress);

            // Instantiate despToken contract using its address
            const despTokenContract = new ethers.Contract(despTokenAddress, erc20ABI, signer);

            // Use your wallet address for both fromClub and toClub
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const playerId = 1; 
            const fromClub = accounts[0]; // Use your wallet address
            const toClub = accounts[0]; // Use the same wallet address for trial
            const amount = ethers.utils.parseUnits("10", "ether");

            // Check if the fromClub has enough balance
            const balance = await despTokenContract.balanceOf(fromClub);
            console.log('Token balance of fromClub:', balance.toString());

            if (balance.lt(amount)) {
                console.error('Insufficient balance for transfer');
                document.getElementById('contract-value-message').innerText = 'Insufficient token balance';
                return;
            }

            // Ensure the fromClub has approved enough tokens
            const allowance = await despTokenContract.allowance(fromClub, playerTransferContract.address);
            console.log('Allowance of contract:', allowance.toString());

            if (allowance.lt(amount)) {
                console.error('Insufficient token allowance for contract to perform transfer');
                document.getElementById('contract-value-message').innerText = 'Insufficient token allowance. Approving tokens...';

                // Approve the contract to spend tokens with a manually set gas limit
                const tx = await despTokenContract.approve(playerTransferContract.address, amount, { gasLimit: 100000 });
                await tx.wait();
                console.log('Tokens approved for transfer.');

                // Display approval success on the page
                document.getElementById('contract-value-message').innerText = 'Tokens approved for transfer.';
            }

            // Now that tokens are approved, initiate the transfer with a manually set gas limit
            await playerTransferContract.initiateTransfer(playerId, fromClub, toClub, amount, { gasLimit: 100000 });
            console.log('Player transfer initiated.');
            document.getElementById('contract-value-message').innerText = 'Player transfer initiated.';

            // Optionally, check the status of the transfer
            const transfer = await playerTransferContract.transfers(playerId);
            console.log('Transfer status:', transfer.status);

        } catch (error) {
            console.error('Error interacting with contract:', error.message);
            console.error('Full error details:', error);
            document.getElementById('contract-value-message').innerText = `Error: ${error.message}`;
        }
    }

    // Event listeners for buttons
    document.getElementById('connect-wallet-btn').addEventListener('click', connectWallet);
    document.getElementById('init-contract-btn').addEventListener('click', initContracts);
});
