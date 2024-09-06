document.addEventListener("DOMContentLoaded", function () {
    console.log('App loaded');

    let apsScore = 0;
    let hasVoted = false;

    // Update APS score display
    function updateApsScore() {
        document.getElementById('aps-score').innerText = "APS Score: " + apsScore;
    }

    // Show the user selection when the page loads
    document.getElementById('user-selection').style.display = 'block';

    // Show specific registration form based on user type
    document.getElementById('fan-btn').addEventListener('click', function () {
        document.getElementById('user-selection').style.display = 'none';
        document.getElementById('registration-section').style.display = 'block';
    });

    document.getElementById('club-btn').addEventListener('click', function () {
        document.getElementById('user-selection').style.display = 'none';
        document.getElementById('registration-section').style.display = 'block';
        document.getElementById('club-registration-fields').style.display = 'block';
    });

    document.getElementById('federation-btn').addEventListener('click', function () {
        document.getElementById('user-selection').style.display = 'none';
        document.getElementById('registration-section').style.display = 'block';
        document.getElementById('federation-registration-fields').style.display = 'block';
    });

    document.getElementById('contractor-btn').addEventListener('click', function () {
        document.getElementById('user-selection').style.display = 'none';
        document.getElementById('registration-section').style.display = 'block';
        document.getElementById('contractor-registration-fields').style.display = 'block';
    });

    // Handle registration form submission
    document.getElementById('registration-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const walletAddress = document.getElementById('wallet-address-input').value;

        console.log('Full Name:', fullName);
        console.log('Email:', email);
        console.log('Wallet Address:', walletAddress);

        // Hide registration form and show the Connect Wallet button
        document.getElementById('registration-section').style.display = 'none';
        document.getElementById('connect-wallet-btn').style.display = 'block';
    });

    // Connect to MetaMask Wallet
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

    // Handle voting
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

    // Show token staking
    function showTokenStaking() {
        document.getElementById('menu-section').style.display = 'none';
        document.getElementById('staking-section').style.display = 'block';
    }

    // Show fundraising section (for clubs)
    function showFundraising() {
        document.getElementById('menu-section').style.display = 'none';
        document.getElementById('fundraising-section').style.display = 'block';
    }

    // Return to menu from any section
    function returnToMenu() {
        document.getElementById('voting-section').style.display = 'none';
        document.getElementById('blog-section').style.display = 'none';
        document.getElementById('nft-section').style.display = 'none';
        document.getElementById('wallet-balance-section').style.display = 'none';
        document.getElementById('staking-section').style.display = 'none';
        document.getElementById('fundraising-section').style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'none';
        document.getElementById('menu-section').style.display = 'block';
    }

    // Event listeners for menu options
    document.getElementById('participate-vote').addEventListener('click', showVoting);
    document.getElementById('participate-blog').addEventListener('click', showBlog);
    document.getElementById('nft-option').addEventListener('click', showNftSection);
    document.getElementById('view-balance').addEventListener('click', showWalletBalance);
    document.getElementById('token-staking').addEventListener('click', showTokenStaking);
    document.getElementById('fundraising').addEventListener('click', showFundraising);

    // Event listener for wallet connection
    document.getElementById('connect-wallet-btn').addEventListener('click', connectWallet);

    // Event listeners for voting
    document.getElementById('vote-jersey1').addEventListener('click', function () { vote('Jersey 1'); });
    document.getElementById('vote-jersey2').addEventListener('click', function () { vote('Jersey 2'); });

    // Event listeners for returning to menu
    const returnMenuLinks = document.querySelectorAll('.return-menu');
    returnMenuLinks.forEach(link => {
        link.addEventListener('click', returnToMenu);
    });
});
