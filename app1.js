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

    // Return to menu from any section
    function returnToMenu() {
        document.getElementById('voting-section').style.display = 'none';
        document.getElementById('blog-section').style.display = 'none';
        document.getElementById('nft-section').style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'none';
        document.getElementById('menu-section').style.display = 'block';
    }

    // Event listeners for menu options
    document.getElementById('participate-vote').addEventListener('click', showVoting);
    document.getElementById('participate-blog').addEventListener('click', showBlog);
    document.getElementById('nft-option').addEventListener('click', showNftSection);

    // Event listeners for voting
    document.getElementById('vote-jersey1').addEventListener('click', function () { vote('Jersey 1'); });
    document.getElementById('vote-jersey2').addEventListener('click', function () { vote('Jersey 2'); });

    // Event listeners for returning to menu
    const returnMenuLinks = document.querySelectorAll('.return-menu');
    returnMenuLinks.forEach(link => {
        link.addEventListener('click', returnToMenu);
    });

    // Event listener for wallet connection
    document.getElementById('connect-wallet-btn').addEventListener('click', connectWallet);
});