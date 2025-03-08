
import { useState } from "react";
import { ethers } from "ethers";
import { useToast } from "@/hooks/use-toast";
import { getContract, stringToBytes32, bytes32ToString, HealthData } from "@/blockchain/PatientContract";

export const usePatientContract = (provider: ethers.providers.Web3Provider | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const logHealthData = async (
    glucoseLevel: number,
    medication: string,
    meals: string,
    exercise: string
  ) => {
    if (!provider) {
      toast({
        variant: "destructive",
        title: "Not Connected",
        description: "Please connect your wallet first",
      });
      return false;
    }

    try {
      setIsLoading(true);
      const contract = await getContract(provider);
      
      const medicationHash = stringToBytes32(medication);
      const mealsHash = stringToBytes32(meals);
      const exerciseHash = stringToBytes32(exercise);
      
      const tx = await contract.logHealthData(
        glucoseLevel,
        medicationHash,
        mealsHash,
        exerciseHash
      );
      
      await tx.wait();
      
      toast({
        title: "Health Data Logged",
        description: "Your health data has been successfully recorded on the blockchain",
      });
      
      return true;
    } catch (error) {
      console.error("Error logging health data:", error);
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "Failed to log health data",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getHealthData = async (patientAddress: string): Promise<HealthData[]> => {
    if (!provider) {
      toast({
        variant: "destructive",
        title: "Not Connected",
        description: "Please connect your wallet first",
      });
      return [];
    }

    try {
      setIsLoading(true);
      const contract = await getContract(provider);
      
      const data = await contract.viewHealthData(patientAddress);
      
      // Convert the contract data to our HealthData interface
      return data.map((item: any) => ({
        timestamp: item.timestamp.toNumber(),
        glucoseLevel: item.glucoseLevel.toNumber(),
        medicationHash: item.medicationHash,
        mealsHash: item.mealsHash,
        exerciseHash: item.exerciseHash
      }));
    } catch (error) {
      console.error("Error fetching health data:", error);
      toast({
        variant: "destructive",
        title: "Data Retrieval Failed",
        description: error instanceof Error ? error.message : "Failed to retrieve health data",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const updateAccessPermission = async (accessorAddress: string, isGranted: boolean) => {
    if (!provider) {
      toast({
        variant: "destructive",
        title: "Not Connected",
        description: "Please connect your wallet first",
      });
      return false;
    }

    try {
      setIsLoading(true);
      const contract = await getContract(provider);
      
      const tx = await contract.updateAccess(accessorAddress, isGranted);
      await tx.wait();
      
      toast({
        title: "Access Permission Updated",
        description: `Access for ${accessorAddress.slice(0, 6)}...${accessorAddress.slice(-4)} ${isGranted ? "granted" : "revoked"}`,
      });
      
      return true;
    } catch (error) {
      console.error("Error updating access permission:", error);
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "Failed to update access permission",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHealthRecord = async (index: number) => {
    if (!provider) {
      toast({
        variant: "destructive",
        title: "Not Connected",
        description: "Please connect your wallet first",
      });
      return false;
    }

    try {
      setIsLoading(true);
      const contract = await getContract(provider);
      
      const tx = await contract.deleteHealthData(index);
      await tx.wait();
      
      toast({
        title: "Health Record Deleted",
        description: "Your health record has been successfully deleted",
      });
      
      return true;
    } catch (error) {
      console.error("Error deleting health record:", error);
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "Failed to delete health record",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getAverageGlucose = async (
    patientAddress: string,
    startTime: number,
    endTime: number
  ): Promise<number> => {
    if (!provider) {
      toast({
        variant: "destructive",
        title: "Not Connected",
        description: "Please connect your wallet first",
      });
      return 0;
    }

    try {
      setIsLoading(true);
      const contract = await getContract(provider);
      
      const average = await contract.getAverageGlucoseLevel(patientAddress, startTime, endTime);
      return average.toNumber();
    } catch (error) {
      console.error("Error getting average glucose:", error);
      toast({
        variant: "destructive",
        title: "Data Retrieval Failed",
        description: error instanceof Error ? error.message : "Failed to calculate average glucose",
      });
      return 0;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logHealthData,
    getHealthData,
    updateAccessPermission,
    deleteHealthRecord,
    getAverageGlucose,
    isLoading
  };
};
