import React, { 
    createContext, 
    useState, 
    useContext, 
    useEffect 
  } from 'react';
  import { authService } from '../services/authService';
  import { useNavigate } from 'react-router-dom';
  
  // Define types
  interface User {
    id: string;
    email: string;
  }
  
  interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) : JSX.Element => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          const userData = await authService.verifyToken();
          setUser(userData.user);
          setIsAuthenticated(true);
        } catch (error) {
          setUser(null);
          setIsAuthenticated(false);
          console.log(error)
        } finally {
          setIsLoading(false);
        }
      };
  
      checkAuthStatus();
    }, []);
  
    const login = async (email: string, password: string) => {
      try {
        const response = await authService.login(email, password);
        setUser(response.user);
        setIsAuthenticated(true);
        navigate('/home');
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        throw error;
      }
    };
  
    const logout = async () => {
      try {
        await authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
      } catch (error) {
        console.error('Logout failed', error);
      }
    };
  
    return (
      <AuthContext.Provider value={{ 
        user, 
        isAuthenticated, 
        isLoading, 
        login, 
        logout 
      }}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };