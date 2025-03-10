import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Database,
  Search,
  FileText,
  Menu,
  X,
  Users,
  Activity,
  LineChart,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ConnectWallet from "@/components/blockchain/ConnectWallet";
import { Card } from "@/components/ui/card";
import ContactSupportModal from "@/components/ContactSupportModal";

const ResearcherDashboard = () => {
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
    { id: "analytics", label: "Analytics", icon: <BarChart size={20} /> },
    { id: "datasets", label: "Datasets", icon: <Database size={20} /> },
    { id: "reports", label: "Reports", icon: <FileText size={20} /> },
    { id: "participants", label: "Participants", icon: <Users size={20} /> },
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
              Gluco<span className="text-glucotrack-blue">Trackr</span>{" "}
              <span className="text-sm font-normal bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                Researcher
              </span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ConnectWallet />
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="h-8 w-8 rounded-full bg-glucotrack-blue/10 flex items-center justify-center text-glucotrack-blue"
              >
                <BarChart size={16} />
              </motion.div>
              <span className="text-sm font-medium text-glucotrack-dark-gray">
                {user?.email ? user.email.split("@")[0] : "Researcher"}
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
              {activeTab === "overview" && "Research Dashboard"}
              {activeTab === "analytics" && "Data Analytics"}
              {activeTab === "datasets" && "Available Datasets"}
              {activeTab === "reports" && "Research Reports"}
              {activeTab === "participants" && "Study Participants"}
            </h1>
            <p className="text-gray-500 mt-1">
              {activeTab === "overview" &&
                "Welcome to your research portal. Access anonymized health data."}
              {activeTab === "analytics" &&
                "Analyze trends and patterns in diabetes health data."}
              {activeTab === "datasets" &&
                "Browse and access available anonymized datasets."}
              {activeTab === "reports" && "Generate and view research reports."}
              {activeTab === "participants" &&
                "View anonymized participant information."}
            </p>
          </div>

          {/* Content Sections */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Database size={18} className="mr-2 text-glucotrack-blue" />
                  Data Access
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Connect your wallet to access anonymized health datasets.
                </p>
                <ConnectWallet />
              </Card>

              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Users size={18} className="mr-2 text-glucotrack-blue" />
                  Study Participants
                </h3>
                <p className="text-gray-500 text-sm">
                  Data available from anonymous participants.
                </p>
                <button
                  onClick={() => setActiveTab("participants")}
                  className="mt-4 text-sm text-glucotrack-blue hover:underline"
                >
                  View participants →
                </button>
              </Card>

              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <BarChart size={18} className="mr-2 text-glucotrack-blue" />
                  Analytics
                </h3>
                <p className="text-gray-500 text-sm">
                  Analyze trends and patterns in health data.
                </p>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className="mt-4 text-sm text-glucotrack-blue hover:underline"
                >
                  Go to analytics →
                </button>
              </Card>
            </div>
          )}

          {activeTab === "analytics" && (
            <Card className="p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Data Analytics</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-glucotrack-blue/10 text-glucotrack-blue rounded-lg hover:bg-glucotrack-blue/20">
                    Last 7 Days
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Last 30 Days
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    All Time
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-100 mb-6">
                <div className="flex items-center justify-center h-64">
                  <div className="flex flex-col items-center">
                    <LineChart
                      size={48}
                      className="text-glucotrack-blue/30 mb-4"
                    />
                    <p className="text-gray-500 mb-4">
                      Connect your wallet to view analytics
                    </p>
                    <ConnectWallet />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "datasets" && (
            <Card className="p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Available Datasets</h3>
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search datasets..."
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-glucotrack-blue"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-10">
                <Database size={48} className="text-glucotrack-blue/30 mb-4" />
                <p className="text-gray-500 mb-4">
                  Connect your wallet to access datasets
                </p>
                <ConnectWallet />
              </div>
            </Card>
          )}

          {(activeTab === "reports" || activeTab === "participants") && (
            <Card className="p-6 shadow-md">
              <div className="flex flex-col items-center justify-center py-10">
                {activeTab === "reports" && (
                  <FileText size={48} className="text-glucotrack-blue mb-4" />
                )}
                {activeTab === "participants" && (
                  <Users size={48} className="text-glucotrack-blue mb-4" />
                )}

                <h3 className="text-xl font-semibold mb-2">
                  {activeTab === "reports" && "Research Reports"}
                  {activeTab === "participants" && "Study Participants"}
                </h3>

                <p className="text-gray-500 text-center max-w-md mb-6">
                  {activeTab === "reports" &&
                    "Connect your wallet to generate and view research reports."}
                  {activeTab === "participants" &&
                    "Connect your wallet to view anonymized participant information."}
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

export default ResearcherDashboard;
