import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';

import DefaultLayout from './components/DefaultLayout';
import Dashboard from './pages/dashboard/index';
import Transactions from './pages/transactions/index';
import Goals from './pages/goals/index';
import Settings from './pages/settings/index';
import Auth from './pages/auth';
import Loading from './pages/auth/Loading';
import { useAuth } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const { user, loading } = useAuth();

  // 1. Rota de loading sempre disponível
  if (location.pathname === "/loading") {
    return <Loading />;
  }

  // 2. Enquanto carrega o perfil, redireciona pro /loading (ou mostra spinner)
  if (loading) {
    return <Loading />;
  }

  // 3. Se não tiver user e não estivermos em /auth, manda pra /auth
  if (!user && location.pathname !== "/auth") {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<Auth />} />
      {/* — suas rotas públicas acima — */}

      {/* rotas protegidas só se user existir */}
      {user && (
        <>
          <Route
            path="/dashboard"
            element={
              <DefaultLayout>
                <Dashboard />
              </DefaultLayout>
            }
          />
          <Route
            path="/transactions"
            element={
              <DefaultLayout>
                <Transactions />
              </DefaultLayout>
            }
          />
          <Route
            path="/goals"
            element={
              <DefaultLayout>
                <Goals />
              </DefaultLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <DefaultLayout>
                <Settings />
              </DefaultLayout>
            }
          />
        </>
      )}

      {/* Se quiser capturar qualquer outra rota e mandar pro dashboard ou 404 */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/auth"} replace />} />
    </Routes>
  );
}

export default App;
