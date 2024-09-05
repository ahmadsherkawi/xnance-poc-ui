document.addEventListener("DOMContentLoaded", function () {
    console.log('App loaded');

    let apsScore = 0;
    let hasVoted = false;

    // Update APS score display
    function updateApsScore() {
        document.getElementById('aps-score').innerText = "APS Score: " + apsScore;
    }

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

            // Show the voting section
            document.getElementById('voting-section').style.display = 'block';
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

    // Event listeners for buttons
    document.getElementById('connect-wallet-btn').addEventListener('click', connectWallet);
    document.getElementById('vote-jersey1').addEventListener('click', function () { vote('Jersey 1'); });
    document.getElementById('vote-jersey2').addEventListener('click', function () { vote('Jersey 2'); });
});
