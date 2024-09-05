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
        const contractABI = [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_despTokenAddress",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "playerId",
                        "type": "uint256"
                    }
                ],
                "name": "acceptTransfer",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "despToken",
                "outputs": [
                    {
                        "internalType": "contract IERC20",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "playerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "fromClub",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "toClub",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "initiateTransfer",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "playerId",
                        "type": "uint256"
                    }
                ],
                "name": "rejectTransfer",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "transfers",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "fromClub",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "toClub",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum PlayerTransfer.TransferStatus",
                        "name": "status",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];

        const contractAddress = '0xF69b6d416F2d1E82A2F6C85fF710c1cC0A774BE8';  // Your actual deployed contract address

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log('Contract instantiated:', contract);

        try {
            const value = await contract.despToken(); // Replace with an actual function call
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
