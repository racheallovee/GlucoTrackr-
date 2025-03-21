import { useState } from "react";
import { usePatientContract } from "@/hooks/usePatientContract";
import { useWeb3 } from "@/hooks/useWeb3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const HealthDataForm = () => {
  const { provider } = useWeb3();
  const { logHealthData, isLoading } = usePatientContract(provider);

  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [medication, setMedication] = useState("");
  const [meals, setMeals] = useState("");
  const [exercise, setExercise] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!glucoseLevel || isNaN(Number(glucoseLevel))) {
      return;
    }

    await logHealthData(Number(glucoseLevel), medication, meals, exercise);

    // Reset form on success
    if (!isLoading) {
      setGlucoseLevel("");
      setMedication("");
      setMeals("");
      setExercise("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Health Data</CardTitle>
        <CardDescription>
          Record your health metrics on the blockchain securely
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="glucoseLevel"
              className="block text-sm font-medium mb-1"
            >
              Glucose Level (mg/dL)
            </label>
            <Input
              id="glucoseLevel"
              type="number"
              value={glucoseLevel}
              onChange={(e) => setGlucoseLevel(e.target.value)}
              placeholder="e.g. 120"
              required
            />
          </div>

          <div>
            <label
              htmlFor="medication"
              className="block text-sm font-medium mb-1"
            >
              Medication
            </label>
            <Input
              id="medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              placeholder="e.g. Insulin 10 units"
            />
          </div>

          <div>
            <label htmlFor="meals" className="block text-sm font-medium mb-1">
              Meals
            </label>
            <Textarea
              id="meals"
              value={meals}
              onChange={(e) => setMeals(e.target.value)}
              placeholder="e.g. Breakfast: Oatmeal with berries, Lunch: Chicken salad"
              rows={3}
            />
          </div>

          <div>
            <label
              htmlFor="exercise"
              className="block text-sm font-medium mb-1"
            >
              Exercise
            </label>
            <Textarea
              id="exercise"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              placeholder="e.g. 30 min walk, 20 min yoga"
              rows={2}
            />
          </div>

          <Button type="submit" className="w-44" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Recording...
              </>
            ) : (
              "Record Health Data"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthDataForm;
