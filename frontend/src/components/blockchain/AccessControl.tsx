
import { useState } from "react";
import { usePatientContract } from "@/hooks/usePatientContract";
import { useWeb3 } from "@/hooks/useWeb3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const AccessControl = () => {
  const { provider } = useWeb3();
  const { updateAccessPermission, isLoading } = usePatientContract(provider);
  
  const [accessorAddress, setAccessorAddress] = useState("");
  
  const handleGrantAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessorAddress || !accessorAddress.startsWith("0x")) return;
    
    await updateAccessPermission(accessorAddress, true);
    if (!isLoading) {
      setAccessorAddress("");
    }
  };
  
  const handleRevokeAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessorAddress || !accessorAddress.startsWith("0x")) return;
    
    await updateAccessPermission(accessorAddress, false);
    if (!isLoading) {
      setAccessorAddress("");
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Data Access</CardTitle>
        <CardDescription>
          Control who can access your health data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label htmlFor="accessorAddress" className="block text-sm font-medium mb-1">
              Healthcare Provider Address
            </label>
            <Input
              id="accessorAddress"
              value={accessorAddress}
              onChange={(e) => setAccessorAddress(e.target.value)}
              placeholder="0x..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the Ethereum address of your doctor or healthcare provider
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={handleGrantAccess}
              className="flex-1"
              disabled={isLoading || !accessorAddress}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Grant Access"
              )}
            </Button>
            
            <Button
              type="button"
              onClick={handleRevokeAccess}
              variant="outline"
              className="flex-1"
              disabled={isLoading || !accessorAddress}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Revoke Access"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AccessControl;
