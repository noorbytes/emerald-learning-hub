
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// These environment variables will be provided by the Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a dummy client that shows messages instead of failing
const createDummyClient = () => {
  const errorMessage = 'Supabase is not connected. Please connect your project to Supabase using the Supabase button in the top right.';
  
  const showError = () => {
    console.error(errorMessage);
    toast.error(errorMessage);
    return { data: null, error: new Error(errorMessage) };
  };

  return {
    auth: {
      signInWithPassword: showError,
      signUp: showError,
      signInWithOAuth: showError,
      signOut: showError,
      getUser: () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: showError
        })
      })
    }),
  };
};

// Export either a real Supabase client or a dummy one
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : createDummyClient() as any;

// Helper functions for authentication
export const signIn = async (email: string, password: string) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async (email: string, password: string) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signInWithGoogle = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  return { data, error };
};

export const signOut = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { error: new Error('Supabase not connected') };
  }
  
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
