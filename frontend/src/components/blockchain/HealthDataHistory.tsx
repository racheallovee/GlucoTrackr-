
import { useState, useEffect } from "react";
import { usePatientContract } from "@/hooks/usePatientContract";
import { useWeb3 } from "@/hooks/useWeb3";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Trash2 } from "lucide-react";
import { HealthData } from "@/blockchain/PatientContract";
import { bytes32ToString } from "@/blockchain/PatientContract";

const HealthDataHistory = () => {
  const { provider, account } = useWeb3();
  const { getHealthData, deleteHealthRecord, isLoading } = usePatientContract(provider);
  
  const [healthRecords, setHealthRecords] = useState<HealthData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  
  const loadHealthData = async () => {
    if (!account) return;
    
    setIsLoadingData(true);
    try {
      const data = await getHealthData(account);
      setHealthRecords(data);
    } catch (error) {
      console.error("Error loading health data:", error);
    } finally {
      setIsLoadingData(false);
    }
  };
  
  const handleDelete = async (index: number) => {
    await deleteHealthRecord(index);
    // Reload the data after deletion
    if (!isLoading) {
      loadHealthData();
    }
  };
  
  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };
  
  useEffect(() => {
    if (account) {
      loadHealthData();
    }
  }, [account]);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Health Data History</CardTitle>
          <CardDescription>
            View your historical health data stored on the blockchain
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadHealthData}
          disabled={isLoadingData || !account}
        >
          {isLoadingData ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Refresh"
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoadingData ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-glucotrack-blue" />
          </div>
        ) : healthRecords.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No health records found. Start logging your health data!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Glucose (mg/dL)</TableHead>
                  <TableHead>Medication</TableHead>
                  <TableHead>Meals</TableHead>
                  <TableHead>Exercise</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {healthRecords.map((record, index) => (
                  <TableRow key={`${record.timestamp}-${index}`}>
                    <TableCell>{formatDate(record.timestamp)}</TableCell>
                    <TableCell>{record.glucoseLevel}</TableCell>
                    <TableCell>{bytes32ToString(record.medicationHash)}</TableCell>
                    <TableCell>{bytes32ToString(record.mealsHash)}</TableCell>
                    <TableCell>{bytes32ToString(record.exerciseHash)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(index)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthDataHistory;
