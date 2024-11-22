// NFT Configuration
const PINATA_CID = 'Qmdo1zVc243HfmGnb9bb7egNer1nddk2wtwz9XxAMtpuFi';
const IPFS_GATEWAYS = [
    'https://ipfs.io/ipfs/',
    'https://gateway.pinata.cloud/ipfs/',
    'https://cloudflare-ipfs.com/ipfs/',
    'https://gateway.ipfs.io/ipfs/'
];
const LOCAL_METADATA_DIR = './metadata/';
const LOCAL_IMAGES_DIR = './images/';

// Function to try fetching from multiple gateways
async function fetchWithFallback(cid) {
    let lastError;
    
    for (const gateway of IPFS_GATEWAYS) {
        try {
            const url = `${gateway}${cid}`;
            console.log('Trying gateway:', url);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Successfully fetched data:', data);
            return data;
        } catch (error) {
            console.log('Gateway failed:', gateway, 'Error:', error);
            lastError = error;
        }
    }
    
    throw lastError;
}

// Function to load local metadata
async function loadLocalMetadata(id) {
    try {
        const response = await fetch(`${LOCAL_METADATA_DIR}${id}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const metadata = await response.json();
        return metadata;
    } catch (error) {
        console.error(`Error loading metadata for NFT #${id}:`, error);
        return null;
    }
}

// Function to fetch NFT metadata from IPFS
async function fetchNFTMetadata() {
    try {
        const metadata = await fetchWithFallback(PINATA_CID);
        console.log('Fetched metadata:', metadata);
        return metadata;
    } catch (error) {
        console.error('Error fetching NFT metadata:', error);
        return null;
    }
}

// Function to process image URL
function processImageUrl(imageUrl) {
    // Use local image instead of IPFS
    return `${LOCAL_IMAGES_DIR}NFT-Digital-Revolution.png`;
}

// Function to load NFT data
async function loadNFTData() {
    try {
        // Load metadata for NFT #1 as a sample
        const metadata = await loadLocalMetadata(1);
        console.log('Processing metadata:', metadata);
        
        if (!metadata) {
            throw new Error('No metadata found');
        }

        // Create NFT object with local image
        const nft = {
            id: '1',
            name: metadata.name || 'Digital Revolution NFT',
            description: metadata.description || 'Digital Revolution NFT Collection',
            image: processImageUrl(metadata.image),
            attributes: metadata.attributes || []
        };

        console.log('Loaded NFT:', nft);
        return [nft];
    } catch (error) {
        console.error('Error loading NFTs:', error);
        return [];
    }
}

// Function to copy text to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
    }
}

// Function to create hash display
function createHashDisplay(hash) {
    const hashContainer = document.createElement('div');
    hashContainer.className = 'hash-container';
    
    hashContainer.innerHTML = `
        <div class="hash-title">NFT Hash</div>
        <div class="hash-value">${hash}</div>
        <button class="copy-button" onclick="copyHash('${hash}')">
            Copy Hash
        </button>
    `;
    
    return hashContainer;
}

// Function to handle hash copying
window.copyHash = async function(hash) {
    const button = document.querySelector('.copy-button');
    const success = await copyToClipboard(hash);
    
    if (success) {
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = 'Copy Hash';
            button.classList.remove('copied');
        }, 2000);
    }
};

// Function to handle NFT purchase
async function handleBuyNFT() {
    try {
        // Check if Web3 is available
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask to purchase NFTs!');
            return;
        }

        const button = document.querySelector('.buy-button');
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        button.disabled = true;

        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create Web3 instance
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Add your smart contract interaction here
        // For now, just show a success message
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> Coming Soon!';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-shopping-cart"></i> Buy NFT';
                button.disabled = false;
            }, 2000);
        }, 1500);

    } catch (error) {
        console.error('Error during purchase:', error);
        const button = document.querySelector('.buy-button');
        button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Buy NFT';
            button.disabled = false;
        }, 2000);
    }
}

// Update NFT display with actual data
async function initializeNFTDisplay() {
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'Loading NFTs...';
    document.querySelector('.nft-display').appendChild(loadingText);

    try {
        const nfts = await loadNFTData();
        console.log('Loaded NFTs:', nfts);
        
        window.nftData = nfts; // Make NFT data available globally
        
        // Remove loading text
        loadingText.remove();
        
        // Initialize the display if NFTs were loaded
        if (nfts && nfts.length > 0) {
            const nftDisplay = document.querySelector('.nft-display');
            const currentNFT = nfts[0];
            
            // Find the hash attribute
            const hashAttribute = currentNFT.attributes.find(attr => attr.trait_type === 'Hash');
            const hash = hashAttribute ? hashAttribute.value : currentNFT.uniqueHash;
            
            // Update the display
            nftDisplay.innerHTML = `
                <div class="nft-image">
                    <img src="${currentNFT.image}" alt="${currentNFT.name}" />
                </div>
                <div class="nft-info">
                    <h2>${currentNFT.name}</h2>
                    <p>${currentNFT.description}</p>
                    ${currentNFT.attributes && currentNFT.attributes.length > 0 ? `
                        <div class="nft-attributes">
                            <h4>Attributes</h4>
                            <div class="attributes-grid">
                                ${currentNFT.attributes
                                    .filter(attr => attr.trait_type !== 'Hash')
                                    .map(attr => `
                                        <div class="attribute-item">
                                            <span class="attribute-trait">${attr.trait_type}</span>
                                            <span class="attribute-value">${attr.value}</span>
                                        </div>
                                    `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    <button class="buy-button" onclick="handleBuyNFT()">
                        <i class="fas fa-shopping-cart"></i> Buy NFT
                    </button>
                </div>
            `;
            
            // Add hash display if hash exists
            if (hash) {
                const hashDisplay = createHashDisplay(hash);
                nftDisplay.querySelector('.nft-info').appendChild(hashDisplay);
            }
        } else {
            throw new Error('No valid NFTs found');
        }
    } catch (error) {
        console.error('Error initializing NFT display:', error);
        document.querySelector('.nft-display').innerHTML = `
            <div class="error-message">
                Error loading NFTs: ${error.message}
                <br>
                <small>Please check the browser console for more details.</small>
            </div>
        `;
    }
}

// Make handleBuyNFT available globally
window.handleBuyNFT = handleBuyNFT;

// Add function to check NFT ownership
async function checkNFTOwnership(tokenId) {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                return await ownsNFT(accounts[0], tokenId);
            }
        } catch (error) {
            console.error('Error checking NFT ownership:', error);
        }
    }
    return false;
}
