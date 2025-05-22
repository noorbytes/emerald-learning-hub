
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isSupabaseConnected: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  isSupabaseConnected: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Check if Supabase is connected
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  useEffect(() => {
    setIsSupabaseConnected(!!supabaseUrl && !!supabaseAnonKey);
    
    // If Supabase is not connected, show a message and set loading to false
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase is not connected. Please connect your project to Supabase.');
      setLoading(false);
      return;
    }

    // Check for current user
    const loadUser = async () => {
      try {
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
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        
        if (currentUser) {
          try {
            const { data: admin } = await supabase
              .from('admins')
              .select('*')
              .eq('user_id', currentUser.id)
              .single();
            
            setIsAdmin(!!admin);
          } catch (error) {
            console.error("Error checking admin status:", error);
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [supabaseUrl, supabaseAnonKey]);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, isSupabaseConnected }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default useAuth;
