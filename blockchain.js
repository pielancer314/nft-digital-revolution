// Blockchain configuration
const OPBNB_RPC = 'https://opbnb-mainnet.g.alchemy.com/v2/GZpKV2mtEjrodCTcYxy83U_g2InD3IWO';
const CONTRACT_ADDRESS = ''; // Add your NFT contract address here

// ABI for NFT contract (minimal version for reading)
const NFT_ABI = [
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function tokenByIndex(uint256 index) view returns (uint256)",
    "function ownerOf(uint256 tokenId) view returns (address)"
];

// Initialize ethers provider
let provider;
let contract;

async function initBlockchain() {
    try {
        provider = new ethers.providers.JsonRpcProvider(OPBNB_RPC);
        contract = new ethers.Contract(CONTRACT_ADDRESS, NFT_ABI, provider);
        console.log('Blockchain connection initialized');
    } catch (error) {
        console.error('Error initializing blockchain:', error);
    }
}

async function fetchNFTMetadata(tokenId) {
    try {
        const tokenURI = await contract.tokenURI(tokenId);
        const response = await fetch(tokenURI);
        const metadata = await response.json();
        return {
            id: tokenId.toString(),
            name: metadata.name,
            description: metadata.description,
            image: metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
            attributes: metadata.attributes
        };
    } catch (error) {
        console.error(`Error fetching metadata for token ${tokenId}:`, error);
        return null;
    }
}

async function loadAllNFTs() {
    try {
        const totalSupply = await contract.totalSupply();
        const nfts = [];
        
        for (let i = 0; i < totalSupply.toNumber(); i++) {
            const tokenId = await contract.tokenByIndex(i);
            const metadata = await fetchNFTMetadata(tokenId);
            if (metadata) {
                nfts.push(metadata);
            }
        }
        
        return nfts;
    } catch (error) {
        console.error('Error loading NFTs:', error);
        return [];
    }
}

// Function to check if an address owns a specific NFT
async function ownsNFT(address, tokenId) {
    try {
        const owner = await contract.ownerOf(tokenId);
        return owner.toLowerCase() === address.toLowerCase();
    } catch {
        return false;
    }
}
