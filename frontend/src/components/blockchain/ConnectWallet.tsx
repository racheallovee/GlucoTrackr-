import { useWeb3 } from "@/hooks/useWeb3";

const ConnectWallet = () => {
  const { account, isConnected, isConnecting, connect, disconnect } = useWeb3();

  return (
    <div className="flex items-center gap-2">
      {isConnected && account ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={connect}
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
