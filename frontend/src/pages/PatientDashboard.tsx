
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, FileText, Coffee, Users, UserCheck, BarChart, Heart, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import HealthDataForm from "@/components/blockchain/HealthDataForm";
import HealthDataHistory from "@/components/blockchain/HealthDataHistory";
import ConnectWallet from "@/components/blockchain/ConnectWallet";
import { Card } from "@/components/ui/card";
import ContactSupportModal from "@/components/ContactSupportModal";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-glucotrack-light-gray">
        <div className="animate-spin h-8 w-8 border-4 border-glucotrack-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const menuItems = [
    { id: "overview", label: "Overview", icon: <Activity size={20} /> },
    { id: "records", label: "Health Records", icon: <FileText size={20} /> },
    { id: "data", label: "Log Data", icon: <Coffee size={20} /> },
    { id: "doctors", label: "My Doctors", icon: <UserCheck size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart size={20} /> },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-glucotrack-light-gray">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 rounded-full bg-glucotrack-blue flex items-center justify-center mr-2"
            >
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </motion.div>
            <span className="text-xl font-bold text-glucotrack-dark-gray">
              Gluco<span className="text-glucotrack-blue">Trackr</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ConnectWallet />
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="h-8 w-8 rounded-full bg-glucotrack-blue/10 flex items-center justify-center text-glucotrack-blue"
              >
                <Heart size={16} />
              </motion.div>
              <span className="text-sm font-medium text-glucotrack-dark-gray">
                {user?.email ? user.email.split('@')[0] : 'Patient'}
              </span>
            </div>
          </div>

          <button className="md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-b"
        >
          <div className="container mx-auto py-2 px-4">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-glucotrack-blue text-white"
                      : "hover:bg-glucotrack-blue/10 text-glucotrack-dark-gray"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t">
                <ConnectWallet />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="container mx-auto py-6 px-4 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="hidden md:block w-64 space-y-2"
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-glucotrack-blue text-white shadow-md"
                  : "hover:bg-glucotrack-blue/10 text-glucotrack-dark-gray"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}

          <div className="mt-8 pt-4 border-t">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full flex items-center px-4 py-3 rounded-lg transition-colors hover:bg-glucotrack-blue/10 text-glucotrack-dark-gray"
            >
              <Users size={20} className="mr-3" />
              Contact Support
            </button>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1"
        >
          {/* Dashboard Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-glucotrack-dark-gray">
              {activeTab === "overview" && "Your Health Dashboard"}
              {activeTab === "records" && "Health Records"}
              {activeTab === "data" && "Log Health Data"}
              {activeTab === "doctors" && "Your Healthcare Team"}
              {activeTab === "analytics" && "Health Analytics"}
            </h1>
            <p className="text-gray-500 mt-1">
              {activeTab === "overview" && "Welcome back! Here's your health at a glance."}
              {activeTab === "records" && "View and manage your blockchain-secured health records."}
              {activeTab === "data" && "Log your daily health measurements securely."}
              {activeTab === "doctors" && "Manage access to your health data."}
              {activeTab === "analytics" && "Insights and trends from your health data."}
            </p>
          </div>

          {/* Content Sections */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Activity size={18} className="mr-2 text-glucotrack-blue" />
                  Recent Activity
                </h3>
                <p className="text-gray-500 text-sm">
                  Connect your wallet to view your recent health activities.
                </p>
                <div className="mt-4">
                  <ConnectWallet />
                </div>
              </Card>

              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <FileText size={18} className="mr-2 text-glucotrack-blue" />
                  Health Summary
                </h3>
                <p className="text-gray-500 text-sm">
                  Your health data is secured and private. Log data to see a summary.
                </p>
                <button 
                  onClick={() => setActiveTab("data")}
                  className="mt-4 text-sm text-glucotrack-blue hover:underline"
                >
                  Log health data →
                </button>
              </Card>

              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Users size={18} className="mr-2 text-glucotrack-blue" />
                  Healthcare Team
                </h3>
                <p className="text-gray-500 text-sm">
                  Manage your healthcare providers' access to your data.
                </p>
                <button 
                  onClick={() => setActiveTab("doctors")}
                  className="mt-4 text-sm text-glucotrack-blue hover:underline"
                >
                  Manage permissions →
                </button>
              </Card>
            </div>
          )}

          {activeTab === "records" && (
            <Card className="p-6 shadow-md">
              <HealthDataHistory />
            </Card>
          )}

          {activeTab === "data" && (
            <Card className="p-6 shadow-md">
              <HealthDataForm />
            </Card>
          )}

          {activeTab === "doctors" && (
            <Card className="p-6 shadow-md">
              <div className="flex flex-col items-center justify-center py-10">
                <Users size={48} className="text-glucotrack-blue mb-4" />
                <h3 className="text-xl font-semibold mb-2">Healthcare Team Access</h3>
                <p className="text-gray-500 text-center max-w-md mb-6">
                  Control which healthcare providers can access your health records.
                </p>
                <ConnectWallet />
              </div>
            </Card>
          )}

          {activeTab === "analytics" && (
            <Card className="p-6 shadow-md">
              <div className="flex flex-col items-center justify-center py-10">
                <BarChart size={48} className="text-glucotrack-blue mb-4" />
                <h3 className="text-xl font-semibold mb-2">Health Analytics</h3>
                <p className="text-gray-500 text-center max-w-md mb-6">
                  Connect your wallet to view insights about your health data.
                </p>
                <ConnectWallet />
              </div>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Contact Support Modal */}
      <ContactSupportModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default PatientDashboard;
