import React, { 
    createContext, 
    useState, 
    useContext, 
    useEffect 
  } from 'react';
import { logoutUser } from '@/api/apiClient';
  import { useNavigate } from 'react-router-dom';
import { loginUser, verifyToken } from '@/api/apiClient';
  
  // Define types
  // interface User {
  //   name : string;
  //   id: string;
  //   email: string;
  // }
  
  interface AuthContextType {
    user: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) : JSX.Element => {
    const [user, setUser] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
         
          const verificationStatus = await verifyToken();
         
          if("error" in verificationStatus){
            setUser('');
            setIsAuthenticated(false);
            throw new Error('Failed to verify token');
          }
          setIsAuthenticated(true);
        } catch (error) {
          setUser('');
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
        const response = await loginUser({email, password});
        if("error" in response){
          throw new Error('Failed to login');
        }
        setUser(email);
        setIsAuthenticated(true);
        navigate('/');
      } catch (error) {
        setUser('');
        setIsAuthenticated(false);
        // throw error;
        console.log(error);
        throw error;
      }
    };
  
    const logout = async () => {
      try {
        const res = await logoutUser();
        if("error" in res){
          throw new Error('Failed to logout');
        }
        setUser('');
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