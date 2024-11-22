# Digital Revolution NFT Collection

A limited edition series of 608 unique NFTs representing the convergence of art and technology.

🌐 **[View Live Website](https://pielancer314.github.io)**

## Project Overview

- **Collection Size**: 608 unique pieces
- **Blockchain**: opBNB (ERC-721)
- **Smart Contract**: Implements ERC-721 standard with batch minting capability
- **Network**: opBNB Mainnet (Chain ID: 204)
- **Marketplaces**: OpenSea (DEX) and Binance NFT (CEX)

## Technical Details

- Smart contract built with Solidity
- IPFS for decentralized metadata storage
- OpenZeppelin for secure contract implementation
- Hardhat for development environment

## Network Details

- **Network Name**: opBNB Mainnet
- **RPC URL**: https://opbnb-mainnet-rpc.bnbchain.org
- **Chain ID**: 204
- **Currency Symbol**: BNB
- **Block Explorer**: https://opbnb.bscscan.com/

## Project Structure

```
digital-revolution-nft/
├── contracts/           # Smart contract files
├── scripts/            # Deployment and minting scripts
├── metadata/           # NFT metadata and attributes
├── art/               # Original artwork files
└── test/              # Contract test files
```

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
- Create a `.env` file with your private keys and API endpoints
- Update `hardhat.config.js` with your network settings

3. Deploy contract:
```bash
npx hardhat run scripts/deploy.js --network [network]
```

## Local Development for GitHub Pages

1. Clone the repository:
   ```bash
   git clone https://github.com/pielancer314/pielancer314.github.io.git
   cd pielancer314.github.io
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   # Using Node.js
   npx serve
   ```

3. Visit `http://localhost:8000` in your browser

## Project Description

Embrace the Future of Technology

The Digital Revolution NFT collection is a celebration of the transformative power of technology. Each NFT in this collection represents a key milestone in the digital revolution, from the invention of the internet to the rise of artificial intelligence.

### Own a Piece of History

By owning a Digital Revolution NFT, you're not just acquiring a digital asset; you're becoming a part of history. Each NFT is a unique piece of digital art that commemorates the technological advancements that have shaped our world.

### Invest in the Future

The digital revolution is still in its early stages, and the potential for future growth is immense. By investing in Digital Revolution NFTs, you're positioning yourself to benefit from the continued expansion of the digital world.

### Join the Community

The Digital Revolution NFT community is a vibrant and growing group of technology enthusiasts. By owning a Digital Revolution NFT, you'll gain access to exclusive events, networking opportunities, and other benefits.

### Experience the Future Today

The Digital Revolution NFT collection is more than just a collection of digital art. It's an invitation to experience the future of technology firsthand.

Own a Digital Revolution NFT today and be a part of the future!

## Metadata Structure

Each NFT includes the following metadata:
```json
{
  "name": "Digital Revolution #[1-608]",
  "description": "Part of the Digital Revolution collection...",
  "image": "ipfs://[CID]/[id].png",
  "attributes": [
    {
      "trait_type": "Edition",
      "value": "[1-608]"
    },
    {
      "trait_type": "Signature",
      "value": "Unique digital signature"
    }
  ]
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/pielancer314/pielancer314.github.io](https://github.com/pielancer314/pielancer314.github.io)

---

Made with ❤️ by Digital Revolution Team
