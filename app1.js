document.addEventListener("DOMContentLoaded", function () {
    console.log('App loaded');

    let apsScore = 0;
    let hasVoted = false;

    // Update APS score display
    function updateApsScore() {
        document.getElementById('aps-score').innerText = "APS Score: " + apsScore;
    }

    // Show the registration form when the page loads
    document.getElementById('registration-section').style.display = 'block';

    // Handle registration form submission
    document.getElementById('registration-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const favoriteClub = document.getElementById('favorite-club').value;

        console.log('Full Name:', fullName);
        console.log('Email:', email);
        console.log('Favorite Club:', favoriteClub);

        // Hide registration form and show the Connect Wallet button
        document.getElementById('registration-section').style.display = 'none';
        document.getElementById('connect-wallet-btn').style.display = 'block';
    });

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

            // Increase APS Score for connecting wallet
            apsScore += 1;
            updateApsScore();

            // Show the main menu and APS score
            document.getElementById('aps-score').style.display = 'block';
            document.getElementById('menu-section').style.display = 'block';

            // Hide the Connect Wallet button after connecting
            document.getElementById('connect-wallet-btn').style.display = 'none';

        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    }

    // Handle vote submission
    function vote(jersey) {
        if (hasVoted) {
            alert('You have already voted!');
            return;
        }

        console.log('User voted for:', jersey);
        hasVoted = true;

        // Increase APS Score for voting
        apsScore += 1;
        updateApsScore();

        // Show thank you message and hide voting options
        document.getElementById('voting-section').style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'block';
    }

    // Show voting section
    function showVoting() {
        document.getElementById('menu-section').style.display = 'none';
        document.getElementById('voting-section').style.display = 'block';
    }

    // Show blog section
    function showBlog() {
        document.getElementById('menu-section').style.display = 'none';
        document.getElementById('blog-section').style.display = 'block';
    }

    // Show NFT section
    function showNftSection() {
        document.getElementById('menu-section').style.display = 'none';
        document.getElementById('nft-section').style.display = 'block';
    }

    // Show wallet balance
    async function showWalletBalance() {
        document.getElementById('menu-section').style.display = 'none';
        document.getElementById('wallet-balance-section').style.display = 'block';

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const balance = await signer.getBalance();
        const balanceInEth = ethers.utils.formatEther(balance);

        document.getElementById('wallet-balance').innerText = `Balance: ${balanceInEth} ETH`;
    }

    // Show transaction history (mock data for now)
    function showTransactionHistory() {
        document.getElementById('menu-section').style.display = 'none';
        document.getElementById('transaction-history-section').style.display = 'block';

        const transactions = [
            "0xTransaction1",
            "0xTransaction2",
            "0xTransaction3"
        ];

        const transactionList = document.getElementById('transaction-list');
        transactionList.innerHTML = ""; // Clear existing entries

        transactions.forEach(tx => {
            const li = document.createElement('li');
            li.innerText = tx;
            transactionList.appendChild(li);
        });
    }

    // Handle token transfer (simulated)
    function sendToken() {
        const recipient = document.getElementById('recipient-address').value;
        const amount = document.getElementById('transfer-amount').value;

        console.log(`Sending ${amount} tokens to ${recipient}`);
        alert(`Token sent to ${recipient} successfully!`);

        // Return to menu after sending
        returnToMenu();
    }

    // Return to menu from any section
    function returnToMenu() {
        document.getElementById('voting-section').style.display = 'none';
        document.getElementById('blog-section').style.display = 'none';
        document.getElementById('nft-section').style.display = 'none';
        document.getElementById('wallet-balance-section').style.display = 'none';
        document.getElementById('transaction-history-section').style.display = 'none';
        document.getElementById('token-transfer-section').style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'none';
        document.getElementById('menu-section').style.display = 'block';
    }

    // Event listeners for menu options
    document.getElementById('participate-vote').addEventListener('click', showVoting);
    document.getElementById('participate-blog').addEventListener('click', showBlog);
    document.getElementById('nft-option').addEventListener('click', showNftSection);
    document.getElementById('view-balance').addEventListener('click', showWalletBalance);
    document.getElementById('view-transactions').addEventListener('click', showTransactionHistory);
    document.getElementById('token-transfer').addEventListener('click', () => {
        document.getElementById('menu-section').style.display = 'none';
        document.getElementById('token-transfer-section').style.display = 'block';
    });

    // Event listener for sending token
    document.getElementById('send-token-btn').addEventListener('click', sendToken);

    // Event listeners for returning to menu
    const returnMenuLinks = document.querySelectorAll('.return-menu');
    returnMenuLinks.forEach(link => {
        link.addEventListener('click', returnToMenu);
    });

    // Event listener for wallet connection
    document.getElementById('connect-wallet-btn').addEventListener('click', connectWallet);
});