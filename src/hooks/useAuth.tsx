
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for current user
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser || null);
      
      // If we have a user, check if they're an admin
      if (currentUser) {
        const { data: admin } = await supabase
          .from('admins')
          .select('*')
          .eq('user_id', currentUser.id)
          .single();
        
        setIsAdmin(!!admin);
      }
      
      setLoading(false);
    };

    loadUser();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        
        if (currentUser) {
          const { data: admin } = await supabase
            .from('admins')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();
          
          setIsAdmin(!!admin);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default useAuth;
