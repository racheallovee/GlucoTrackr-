// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import { useToast } from "@/components/ui/use-toast";
// import { ethers } from "ethers";

// const mockData = [
//   { time: "6:00", glucoseLevel: 120 },
//   { time: "9:00", glucoseLevel: 140 },
//   { time: "12:00", glucoseLevel: 110 },
//   { time: "15:00", glucoseLevel: 130 },
//   { time: "18:00", glucoseLevel: 125 },
//   { time: "21:00", glucoseLevel: 115 },
// ];

// const Index = () => {
//   const { toast } = useToast();
//   const [isConnected, setIsConnected] = useState(false);

//   const connectWallet = async () => {
//     try {
//       if (window.ethereum) {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         setIsConnected(true);
//         toast({
//           title: "Wallet Connected",
//           description: "Your wallet has been successfully connected!",
//         });
//       } else {
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: "Please install MetaMask to use this application.",
//         });
//       }
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Connection Error",
//         description: "Failed to connect wallet. Please try again.",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen p-8 bg-background animate-fade-in">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <div className="flex justify-between items-center">
//           <h1 className="text-4xl font-bold text-secondary">
//             Patient Dashboard
//           </h1>
//           <Button
//             onClick={connectWallet}
//             className="bg-primary hover:bg-primary/90 text-white"
//           >
//             {isConnected ? "Connected" : "Connect Wallet"}
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
//             <h2 className="text-2xl font-semibold mb-4 text-secondary">
//               Glucose Levels
//             </h2>
//             <div className="h-[300px]">
//               <ChartContainer
//                 className="mt-4"
//                 config={{
//                   glucose: {
//                     theme: {
//                       light: "#28c3d4",
//                       dark: "#28c3d4",
//                     },
//                   },
//                 }}
//               >
//                 <LineChart data={mockData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="time" />
//                   <YAxis />
//                   <ChartTooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="glucoseLevel"
//                     name="glucose"
//                     stroke="#28c3d4"
//                     strokeWidth={2}
//                     dot={{ fill: "#248ea9" }}
//                   />
//                 </LineChart>
//               </ChartContainer>
//             </div>
//           </Card>

//           <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
//             <h2 className="text-2xl font-semibold mb-4 text-secondary">
//               Quick Actions
//             </h2>
//             <div className="space-y-4">
//               <Button className="w-full bg-primary hover:bg-primary/90">
//                 Log New Data
//               </Button>
//               <Button className="w-full bg-secondary hover:bg-secondary/90">
//                 View History
//               </Button>
//               <Button className="w-full bg-primary hover:bg-primary/90">
//                 Manage Access
//               </Button>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;
