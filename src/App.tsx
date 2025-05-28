
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Simulator from "./pages/Simulator";
import ConnectBanks from "./pages/ConnectBanks";
import MyAccount from "./pages/MyAccount";
import Consent from "./pages/Consent";
import DataCollection from "./pages/DataCollection";
import Analysis from "./pages/Analysis";
import PartnerDashboard from "./pages/PartnerDashboard";
import CreateProposal from "./pages/CreateProposal";
import MyProposals from "./pages/MyProposals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/cadastro" element={<PublicRoute><Register /></PublicRoute>} />
      
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="consentimento" element={<Consent />} />
        <Route path="coleta-dados" element={<DataCollection />} />
        <Route path="analise" element={<Analysis />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="simulador" element={<Simulator />} />
        <Route path="conectar-bancos" element={<ConnectBanks />} />
        <Route path="minha-conta" element={<MyAccount />} />
        
        {/* Partner Routes */}
        <Route path="parceiro/dashboard" element={<PartnerDashboard />} />
        <Route path="parceiro/criar-proposta" element={<CreateProposal />} />
        <Route path="parceiro/propostas" element={<MyProposals />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
