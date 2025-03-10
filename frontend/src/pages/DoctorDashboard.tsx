import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Users,
  UserCheck,
  Search,
  Stethoscope,
  FileText,
  Menu,
  X,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ConnectWallet from "@/components/blockchain/ConnectWallet";
import { Card } from "@/components/ui/card";
import ContactSupportModal from "@/components/ContactSupportModal";

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    { id: "patients", label: "My Patients", icon: <Users size={20} /> },
    { id: "records", label: "Patient Records", icon: <FileText size={20} /> },
    { id: "appointments", label: "Appointments", icon: <Calendar size={20} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={20} /> },
  ];

  const mockPatients = [
    { id: 1, name: "Patient 1", lastVisit: "2023-10-15", status: "Stable" },
    { id: 2, name: "Patient 2", lastVisit: "2023-10-12", status: "Follow-up" },
    { id: 3, name: "Patient 3", lastVisit: "2023-10-10", status: "Improving" },
  ];

  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                Doctor
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
                <Stethoscope size={16} />
              </motion.div>
              <span className="text-sm font-medium text-glucotrack-dark-gray">
                Dr. {user?.email ? user.email.split("@")[0] : "User"}
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
              <UserCheck size={20} className="mr-3" />
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
              {activeTab === "overview" && "Doctor Dashboard"}
              {activeTab === "patients" && "Your Patients"}
              {activeTab === "records" && "Patient Records"}
              {activeTab === "appointments" && "Appointment Schedule"}
              {activeTab === "messages" && "Patient Messages"}
            </h1>
            <p className="text-gray-500 mt-1">
              {activeTab === "overview" &&
                "Welcome back, Doctor! Your patient overview."}
              {activeTab === "patients" &&
                "Manage your patient list and access patient data."}
              {activeTab === "records" &&
                "View and analyze patient health records."}
              {activeTab === "appointments" &&
                "Manage your appointments and schedule."}
              {activeTab === "messages" && "Communication with your patients."}
            </p>
          </div>

          {/* Content Sections */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Users size={18} className="mr-2 text-glucotrack-blue" />
                  Patient Overview
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Connect your wallet to view your patient data.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-glucotrack-dark-gray">
                      {mockPatients.length}
                    </p>
                    <p className="text-xs text-gray-500">Active Patients</p>
                  </div>
                  <ConnectWallet />
                </div>
              </Card>

              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Calendar size={18} className="mr-2 text-glucotrack-blue" />
                  Today's Schedule
                </h3>
                <p className="text-gray-500 text-sm">
                  You have no appointments scheduled for today.
                </p>
                <button
                  onClick={() => setActiveTab("appointments")}
                  className="mt-4 text-sm text-glucotrack-blue hover:underline"
                >
                  View full schedule →
                </button>
              </Card>

              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <MessageSquare
                    size={18}
                    className="mr-2 text-glucotrack-blue"
                  />
                  Recent Messages
                </h3>
                <p className="text-gray-500 text-sm">
                  You have no unread messages.
                </p>
                <button
                  onClick={() => setActiveTab("messages")}
                  className="mt-4 text-sm text-glucotrack-blue hover:underline"
                >
                  Check messages →
                </button>
              </Card>
            </div>
          )}

          {activeTab === "patients" && (
            <Card className="p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Patient List</h3>
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-glucotrack-blue"
                  />
                </div>
              </div>

              {filteredPatients.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Visit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPatients.map((patient) => (
                        <tr key={patient.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {patient.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {patient.lastVisit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                patient.status === "Stable"
                                  ? "bg-green-100 text-green-800"
                                  : patient.status === "Follow-up"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {patient.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-glucotrack-blue hover:underline">
                              View Records
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <Users size={48} className="text-glucotrack-blue/30 mb-4" />
                  <p className="text-gray-500">
                    No patients found with that name.
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <ConnectWallet />
              </div>
            </Card>
          )}

          {(activeTab === "records" ||
            activeTab === "appointments" ||
            activeTab === "messages") && (
            <Card className="p-6 shadow-md">
              <div className="flex flex-col items-center justify-center py-10">
                {activeTab === "records" && (
                  <FileText size={48} className="text-glucotrack-blue mb-4" />
                )}
                {activeTab === "appointments" && (
                  <Calendar size={48} className="text-glucotrack-blue mb-4" />
                )}
                {activeTab === "messages" && (
                  <MessageSquare
                    size={48}
                    className="text-glucotrack-blue mb-4"
                  />
                )}

                <h3 className="text-xl font-semibold mb-2">
                  {activeTab === "records" && "Patient Records"}
                  {activeTab === "appointments" && "Appointment Schedule"}
                  {activeTab === "messages" && "Patient Messages"}
                </h3>

                <p className="text-gray-500 text-center max-w-md mb-6">
                  {activeTab === "records" &&
                    "Connect your wallet to access patient health records."}
                  {activeTab === "appointments" &&
                    "Connect your wallet to view and manage your appointments."}
                  {activeTab === "messages" &&
                    "Connect your wallet to access your patient communications."}
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

export default DoctorDashboard;
