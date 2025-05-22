
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { signOut } from '@/lib/supabase';
import { LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const { user, loading, isAdmin } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

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
              
              <Card>
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                  <CardDescription>Manage your plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Free Plan</p>
                  <p className="text-sm text-muted-foreground">Limited access</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Upgrade Plan</Button>
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
