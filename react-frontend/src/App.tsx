import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';
import { AuthContextProvider } from './contexts/authContext';
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
