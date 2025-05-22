
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { signOut, getUserProfile, getUserSubjects, updateUserRole, UserRole } from '@/lib/supabase';
import { LogOut, User, AlertTriangle, Book, Shield } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, loading, isAdmin, isSupabaseConnected } = useAuth();
  const { toast: uiToast } = useToast();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userSubjects, setUserSubjects] = useState<any[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !isSupabaseConnected) return;
      
      try {
        // Get user profile
        const { data: profileData } = await getUserProfile(user.id);
        setUserProfile(profileData);
        
        // If onboarding is not completed, redirect to onboarding
        if (profileData && !profileData.onboarding_completed) {
          navigate('/onboarding');
          return;
        }
        
        // Get user subjects
        const { data: subjectsData } = await getUserSubjects(user.id);
        setUserSubjects(subjectsData || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoadingProfile(false);
      }
    };
    
    if (user && isSupabaseConnected) {
      fetchUserData();
    } else if (!loading && isSupabaseConnected) {
      setLoadingProfile(false);
    }
  }, [user, isSupabaseConnected, loading, navigate]);

  const handleSignOut = async () => {
    const { error } = await signOut();
    
    if (error) {
      uiToast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      uiToast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    }
  };

  const handleUpgrade = async (role: UserRole) => {
    if (!user) return;
    
    try {
      await updateUserRole(user.id, role);
      setUserProfile(prev => ({...prev, role}));
      
      toast.success(`You've been upgraded to ${role} plan!`);
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update subscription');
    }
  };

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isSupabaseConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2 text-amber-500">
              <AlertTriangle />
              <CardTitle>Supabase Not Connected</CardTitle>
            </div>
            <CardDescription>
              This application requires Supabase to function properly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Please connect your project to Supabase using the green Supabase button in the top right corner of the Lovable interface.
            </p>
            <p className="text-sm text-muted-foreground">
              Once connected, you'll be able to use authentication, database, and other backend features.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => toast.info("Look for the green Supabase button in the top right of the Lovable interface.")}
            >
              Learn More
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Get user's role from profile
  const userRole = userProfile?.role || 'free';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.email}</p>
          </div>
          <Button variant="ghost" onClick={handleSignOut} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-full p-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{user.email}</p>
                <p className="text-sm text-muted-foreground">
                  {isAdmin ? 'Admin User' : 'Student'}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </CardFooter>
          </Card>
          
          {userSubjects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Subjects</CardTitle>
                <CardDescription>Currently studying</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  {userSubjects.map((userSubject: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                      <Book className="h-4 w-4 text-primary" />
                      <span>{userSubject.subjects?.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/onboarding')}>
                  Change Subjects
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {isAdmin ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Admin Controls</CardTitle>
                  <CardDescription>Manage platform content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Access to admin-only features</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary hover:bg-primary-600">Admin Panel</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage users and roles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Control access and permissions</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Manage Users</Button>
                </CardFooter>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Your Learning</CardTitle>
                  <CardDescription>Track your progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Continue where you left off</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary hover:bg-primary-600">Resume Learning</Button>
                </CardFooter>
              </Card>
              
              <Card className="border-2">
                <CardHeader className={userRole !== 'free' ? 'bg-primary/10' : ''}>
                  <div className="flex items-center gap-2">
                    <Shield className={`h-5 w-5 ${userRole !== 'free' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <CardTitle>Subscription</CardTitle>
                  </div>
                  <CardDescription>Current plan: <span className="font-medium capitalize">{userRole}</span></CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-4">
                  {userRole === 'free' && (
                    <>
                      <p>Limited access to study materials</p>
                      <div className="h-2 w-full bg-gray-100 rounded-full mt-2">
                        <div className="h-2 w-1/4 bg-primary rounded-full"></div>
                      </div>
                      <p className="text-xs text-muted-foreground">Upgrade to access more features</p>
                    </>
                  )}
                  
                  {userRole === 'basic' && (
                    <>
                      <p>Full access to study notes and past papers</p>
                      <div className="h-2 w-full bg-gray-100 rounded-full mt-2">
                        <div className="h-2 w-2/3 bg-primary rounded-full"></div>
                      </div>
                      <p className="text-xs text-muted-foreground">Upgrade to Premium for AI features</p>
                    </>
                  )}
                  
                  {userRole === 'premium' && (
                    <>
                      <p>Full access to all features including AI</p>
                      <div className="h-2 w-full bg-gray-100 rounded-full mt-2">
                        <div className="h-2 w-full bg-primary rounded-full"></div>
                      </div>
                      <p className="text-xs text-primary font-medium">Premium Plan Active</p>
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  {userRole === 'free' && (
                    <div className="w-full grid grid-cols-2 gap-2">
                      <Button variant="outline" className="w-full" onClick={() => handleUpgrade('basic')}>
                        Basic (£5)
                      </Button>
                      <Button className="w-full" onClick={() => handleUpgrade('premium')}>
                        Premium (£7)
                      </Button>
                    </div>
                  )}
                  
                  {userRole === 'basic' && (
                    <Button className="w-full" onClick={() => handleUpgrade('premium')}>
                      Upgrade to Premium (£7)
                    </Button>
                  )}
                  
                  {userRole === 'premium' && (
                    <Button variant="outline" className="w-full">
                      Manage Subscription
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
