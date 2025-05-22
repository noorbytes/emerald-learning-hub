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
      signInWithOtp: showError,
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

export const signInWithMicrosoft = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'azure',
  });
  return { data, error };
};

export const signInWithMagicLink = async (email: string) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`,
    },
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

// User roles
export type UserRole = 'free' | 'basic' | 'premium';

// Functions for user preferences and onboarding
export const createUserProfile = async (userId: string, data: any) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  // Set default role to free if not specified
  const userData = {
    ...data,
    role: data.role || 'free',
    created_at: new Date(),
    user_id: userId,
  };
  
  const { error } = await supabase
    .from('user_profiles')
    .insert([userData]);
  
  return { error };
};

export const getUserProfile = async (userId: string) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  return { data, error };
};

export const updateUserProfile = async (userId: string, data: any) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  const { error } = await supabase
    .from('user_profiles')
    .update(data)
    .eq('user_id', userId);
  
  return { error };
};

export const updateUserRole = async (userId: string, role: UserRole) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  const { error } = await supabase
    .from('user_profiles')
    .update({ role })
    .eq('user_id', userId);
  
  return { error };
};

export const getBoards = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .order('name');
  
  return { data, error };
};

export const getLevels = async (boardId?: string) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  let query = supabase.from('levels').select('*');
  
  if (boardId) {
    query = query.eq('board_id', boardId);
  }
  
  const { data, error } = await query.order('name');
  return { data, error };
};

export const getSubjects = async (levelId?: string) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  let query = supabase.from('subjects').select('*');
  
  if (levelId) {
    query = query.eq('level_id', levelId);
  }
  
  const { data, error } = await query.order('name');
  return { data, error };
};

export const saveUserSubjects = async (userId: string, subjectIds: string[]) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  // First delete existing preferences
  await supabase
    .from('user_subjects')
    .delete()
    .eq('user_id', userId);
  
  // Then insert new ones
  const { error } = await supabase
    .from('user_subjects')
    .insert(subjectIds.map(subjectId => ({
      user_id: userId,
      subject_id: subjectId,
    })));
  
  return { error };
};

export const getUserSubjects = async (userId: string) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    toast.error('Please connect your project to Supabase first.');
    return { data: null, error: new Error('Supabase not connected') };
  }
  
  const { data, error } = await supabase
    .from('user_subjects')
    .select(`
      subject_id,
      subjects:subject_id (
        id,
        name,
        level_id,
        levels:level_id (
          id,
          name,
          board_id,
          boards:board_id (
            id,
            name
          )
        )
      )
    `)
    .eq('user_id', userId);
  
  return { data, error };
};
