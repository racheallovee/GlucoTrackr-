
import { useState } from "react";
import { useWeb3 } from "@/hooks/useWeb3";
import ConnectWallet from "@/components/blockchain/ConnectWallet";
import HealthDataForm from "@/components/blockchain/HealthDataForm";
import HealthDataHistory from "@/components/blockchain/HealthDataHistory";
import AccessControl from "@/components/blockchain/AccessControl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PatientBlockchain = () => {
  const { isConnected } = useWeb3();
  const [activeTab, setActiveTab] = useState("log");
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
          <h1 className="text-3xl font-bold text-glucotrack-dark-gray">
            Blockchain Health Records
          </h1>
          <ConnectWallet />
        </div>
        
        {!isConnected ? (
          <div className="max-w-md mx-auto">
            <Alert className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connect Your Wallet</AlertTitle>
              <AlertDescription>
                To access your blockchain health records, please connect your Ethereum wallet.
              </AlertDescription>
            </Alert>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-3 text-glucotrack-blue mb-4">
                <Info className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Why use blockchain for health data?</h2>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-glucotrack-blue mr-2">•</span>
                  <span>Your health data is securely stored on the blockchain</span>
                </li>
                <li className="flex items-start">
                  <span className="text-glucotrack-blue mr-2">•</span>
                  <span>You control who has access to your medical information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-glucotrack-blue mr-2">•</span>
                  <span>Data cannot be altered once recorded, ensuring integrity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-glucotrack-blue mr-2">•</span>
                  <span>Track your glucose levels and health metrics over time</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Tabs
              defaultValue="log"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-8"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="log">Log Health Data</TabsTrigger>
                <TabsTrigger value="history">View History</TabsTrigger>
                <TabsTrigger value="access">Manage Access</TabsTrigger>
              </TabsList>
              
              <TabsContent value="log" className="mt-6">
                <HealthDataForm />
              </TabsContent>
              
              <TabsContent value="history" className="mt-6">
                <HealthDataHistory />
              </TabsContent>
              
              <TabsContent value="access" className="mt-6">
                <AccessControl />
              </TabsContent>
            </Tabs>
            
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Blockchain Transactions</AlertTitle>
              <AlertDescription>
                Each transaction requires a small amount of gas (ETH) and may take a moment to be confirmed on the blockchain.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientBlockchain;
