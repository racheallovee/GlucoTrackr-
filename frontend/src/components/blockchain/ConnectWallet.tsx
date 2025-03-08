
import { useWeb3 } from "@/hooks/useWeb3";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ConnectWallet = () => {
  const { account, isConnected, isConnecting, connect, disconnect } = useWeb3();
  
  return (
    <div className="flex items-center gap-2">
      {isConnected && account ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <Button variant="outline" size="sm" onClick={disconnect}>
            Disconnect
          </Button>
        </div>
      ) : (
        <Button onClick={connect} disabled={isConnecting}>
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            "Connect Wallet"
          )}
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;
