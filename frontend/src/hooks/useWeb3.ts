
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useToast } from "@/hooks/use-toast";

const providerOptions = {
  // Add wallet connect options if needed
};

const web3Modal = new Web3Modal({
  network: "mainnet", // can be changed to other networks like "rinkeby", "ropsten", etc.
  cacheProvider: true,
  providerOptions
});

export const useWeb3 = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      const instance = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(instance);
      const accounts = await ethersProvider.listAccounts();
      const network = await ethersProvider.getNetwork();

      setProvider(ethersProvider);
      setAccount(accounts[0]);
      setChainId(network.chainId);
      setIsConnected(true);

      // Set up event listeners
      instance.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0]);
        toast({
          title: "Account Changed",
          description: `Connected to ${accounts[0]?.slice(0, 6)}...${accounts[0]?.slice(-4)}`,
        });
      });

      instance.on("chainChanged", (chainId: number) => {
        setChainId(chainId);
        toast({
          title: "Network Changed",
          description: "Please make sure you are on the correct network",
        });
      });
      
      return true;
    } catch (err) {
      console.error("Connection error:", err);
      setError(err instanceof Error ? err.message : "Failed to connect to wallet");
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Could not connect to your wallet. Please try again.",
      });
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      await web3Modal.clearCachedProvider();
      setProvider(null);
      setAccount(null);
      setChainId(null);
      setIsConnected(false);
    } catch (err) {
      console.error("Disconnect error:", err);
    }
  };

  // Try to auto-connect if the user has previously connected
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, []);

  return {
    provider,
    account,
    chainId,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect
  };
};
