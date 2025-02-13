🔵💙 GlucoTrackr - Decentralized Diabetes Health Tracker 💙🔵

🔹 Overview
GlucoTrackr is a decentralized diabetes management application that empowers patients to securely track their health data, verify records on-chain, and earn incentives for proactive diabetes care. Built on blockchain technology, it ensures data privacy, transparency, and ownership for users while integrating Web3-powered health solutions.

🚀 Features
✅ Web3 Wallet Authentication – Secure login via MetaMask
✅ On-Chain Health Data Verification – Patients can store and verify glucose readings on blockchain
✅ Decentralized Medical Records – Secure storage for patient health data
✅ Incentivized Health Tracking – Rewards for consistent monitoring and healthy habits
✅ Doctor & Patient Interaction – Verified healthcare professionals can access patient records (with consent)
✅ Seamless Web2 & Web3 Integration – MongoDB for off-chain storage, blockchain for security-critical features

🛠️ Tech Stack
Smart Contracts: Solidity, Hardhat, Lisk
Blockchain Interaction: Ethers.js
Backend: Node.js, Express, MongoDB
Frontend: React.js
Authentication: MetaMask
Deployment: Lisk, Sepolia Testnet
🎯 Project Goals
📌 Empower diabetes patients with full control over their health records
📌 Enhance data security & transparency through blockchain technology
📌 Encourage proactive health monitoring with Web3-powered incentives
📌 Bridge the gap between traditional healthcare and decentralized solutions

📂 Folder Structure

/glucotrackr
│── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│── contracts/
│ ├── PatientDataManagement.sol
│── frontend/ (if applicable)
│── scripts/
│── test/
│── README.md
📖 Getting Started
🔹 Prerequisites
Ensure you have the following installed:

Node.js (v18+)
Hardhat
MetaMask (for Web3 authentication)
MongoDB (if using off-chain storage)
🔹 Installation & Setup
1️⃣ Clone the Repository

git clone https://github.com/racheallovee/glucotrackr.git
cd glucotrackr
2️⃣ Install Dependencies

npm install
3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add:

PRIVATE_KEY=your_blockchain_private_key
MONGO_URI=your_mongodb_connection_string
PORT=3000
4️⃣ Deploy Smart Contracts
npx hardhat run scripts/deploy.js --network sepolia

5️⃣ Start the Backend Server
node backend/server.js

6️⃣ Start the Frontend
cd frontend
npm start

🧪 Testing the API with Postman
🔹 Step 1: Request a Nonce
Endpoint: POST http://localhost:3000/auth/request-nonce
Body:
json

{
"walletAddress": "0xYourWalletAddressHere"
}
Response Example:
json

{
"nonce": "123456"
}
🔹 Step 2: Verify the Signed Message
Endpoint: POST http://localhost:3000/auth/verify
Body:
json

{
"walletAddress": "0xYourWalletAddressHere",
"signature": "0xSignatureGeneratedFromYourWallet"
}
Response Example (Success):
json

{
"success": true,
"message": "Authentication successful"
}
🌎 Roadmap
🚧 Phase 1: Develop & deploy smart contracts
🚀 Phase 2: Build and integrate backend API
🎨 Phase 3: Develop a responsive frontend UI
🌍 Phase 4: Launch beta version and gather user feedback

📜 License
This project is licensed under the MIT License – feel free to modify and improve!

🤝 Contributing
Interested in contributing? We welcome collaborations! Please check out our contributing guidelines and open a PR.

🔗 Connect & Contact
💬 Twitter: https://x.com/Racheallovee

📧 Email: rachealloveo6@gmail.com
