# 🔵💙GlucoTrackr💙🔵

## GlucoTrackr is a decentralized diabetes management application that empowers patients to securely track their health data, verify records on-chain, and earn incentives for proactive diabetes care. Built on blockchain technology, it ensures data privacy, transparency, and ownership for users while integrating Web3-powered health solutions.

## Features🚀

-**✅ Web3 Wallet Authentication** – Secure login via MetaMask or WalletConnect -**✅ On-Chain Health Data Verification** – Patients can store and verify glucose readings on blockchain -**✅ Decentralized Medical Records** – Secure storage for patient health data -**✅ Incentivized Health Tracking** – Rewards for consistent monitoring and healthy habits -**✅ Doctor & Patient Interaction** – Verified healthcare professionals can access patient records (with consent) -**✅ Seamless Web2 & Web3 Integration** – MongoDB for off-chain storage, blockchain for security-critical features

---

## Tech Stack🛠️

-**Smart Contracts**: Solidity, Hardhat, Lisk -**Blockchain Interaction**: Ethers.js -**Backend**: Node.js, Express, MongoDB -**Frontend**: React.js -**Authentication**: MetaMask, WalletConnect -**Deployment**: Lisk, Sepolia Testnet

---

## Project Goals🎯

-📌 Empower diabetes patients with full control over their health records
-📌 Enhance data security & transparency through blockchain technology
-📌 Encourage proactive health monitoring with Web3-powered incentives
-📌 Bridge the gap between traditional healthcare and decentralized solutions

---

## Getting Started📖

## Prerequisites🔹

Ensure you have the following installed:

-Node.js (v18+)
-Hardhat
-MetaMask (for Web3 authentication)
-MongoDB (if using off-chain storage)

---

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/racheallovee/glucotrackr.git
   cd glucotrackr
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set Up Environment Variables:
   Create a .env file in the root directory and add:

-**PRIVATE_KEY**=your_blockchain_private_key -**MONGO_URI**=your_mongodb_connection_string -**PORT**=3000

4. Deploy Smart Contracts:
   npx hardhat run scripts/deploy.js --network sepolia

5. Start the Backend Server:
   node backend/server.js

6. Start the Frontend :
   cd frontend
   npm start

---

## Roadmap🌎

-**🚧 Phase 1**: Develop & deploy smart contracts -**🚀 Phase 2**: Build and integrate backend API -**🎨 Phase 3**: Develop a responsive frontend UI -**🌍 Phase 4**: Launch beta version and gather user feedback

---

### Adding New Features

1. Create a new branch for the feature:
   ```bash
   git checkout -b feature-name
   ```
2. Implement and test the feature.
3. Submit a pull request for review.

---

## Testing

Run the test suite to ensure all components work as expected:

```bash
npm test
```

---

## Contributing

We welcome contributions from the community! Feel free to fork the repository and submit pull requests for new features, bug fixes, or optimizations.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions or suggestions, feel free to reach out:

- Email: rachealloveo6@gmail.com
- Twitter: https://x.com/Racheallovee

  ## Live URL
  https://glucotrackr.vercel.app/
