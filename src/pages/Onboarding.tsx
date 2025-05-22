
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoards, getLevels, getSubjects, saveUserSubjects, createUserProfile } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { GraduationCap, Book, Columns2 } from 'lucide-react';

interface Board {
  id: string;
  name: string;
}

interface Level {
  id: string;
  name: string;
  board_id: string;
}

interface Subject {
  id: string;
  name: string;
  level_id: string;
}

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [boards, setBoards] = useState<Board[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  
  const { user, loading: authLoading, isSupabaseConnected } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user && isSupabaseConnected) {
      navigate('/auth');
    }
  }, [authLoading, user, isSupabaseConnected, navigate]);

  useEffect(() => {
    const fetchBoards = async () => {
      if (!isSupabaseConnected) return;
      
      try {
        const { data, error } = await getBoards();
        if (error) throw error;
        setBoards(data || []);
      } catch (error) {
        console.error('Error fetching boards:', error);
        toast({
          title: 'Error',
          description: 'Failed to load exam boards. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, [isSupabaseConnected, toast]);

  useEffect(() => {
    const fetchLevels = async () => {
      if (!selectedBoard || !isSupabaseConnected) return;
      
      setLoading(true);
      try {
        const { data, error } = await getLevels(selectedBoard);
        if (error) throw error;
        setLevels(data || []);
      } catch (error) {
        console.error('Error fetching levels:', error);
        toast({
          title: 'Error',
          description: 'Failed to load levels. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, [selectedBoard, isSupabaseConnected, toast]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!selectedLevel || !isSupabaseConnected) return;
      
      setLoading(true);
      try {
        const { data, error } = await getSubjects(selectedLevel);
        if (error) throw error;
        setSubjects(data || []);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        toast({
          title: 'Error',
          description: 'Failed to load subjects. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [selectedLevel, isSupabaseConnected, toast]);

  const handleBoardSelect = (boardId: string) => {
    setSelectedBoard(boardId);
    setSelectedLevel(null);
    setSelectedSubjects([]);
    setStep(2);
  };

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
    setSelectedSubjects([]);
    setStep(3);
  };

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      } else {
        return [...prev, subjectId];
      }
    });
  };

  const handleComplete = async () => {
    if (!user || !isSupabaseConnected) return;
    
    setLoading(true);
    try {
      // Save user profile with board and level info
      await createUserProfile(user.id, {
        board_id: selectedBoard,
        level_id: selectedLevel,
        onboarding_completed: true
      });
      
      // Save selected subjects
      await saveUserSubjects(user.id, selectedSubjects);
      
      toast({
        title: 'Success!',
        description: 'Your preferences have been saved.',
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your preferences. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
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
            <CardTitle>Supabase Not Connected</CardTitle>
            <CardDescription>
              Please connect your project to Supabase to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Look for the green Supabase button in the top right corner of the Lovable interface.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            {step === 1 && <GraduationCap className="h-10 w-10 text-primary" />}
            {step === 2 && <Book className="h-10 w-10 text-primary" />}
            {step === 3 && <Columns2 className="h-10 w-10 text-primary" />}
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            {step === 1 && "Select Your Exam Board"}
            {step === 2 && "Select Your Level"}
            {step === 3 && "Select Your Subjects"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1 && "Choose the examination board you're studying under"}
            {step === 2 && "Which qualification level are you preparing for?"}
            {step === 3 && "Select the subjects you're currently studying"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="grid grid-cols-1 gap-3">
                  {boards.map(board => (
                    <Button
                      key={board.id}
                      variant={selectedBoard === board.id ? "default" : "outline"} 
                      className="justify-start h-auto py-6 px-4 text-left"
                      onClick={() => handleBoardSelect(board.id)}
                    >
                      <div>
                        <p className="font-medium">{board.name}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
              
              {step === 2 && (
                <div className="grid grid-cols-1 gap-3">
                  {levels.map(level => (
                    <Button
                      key={level.id}
                      variant={selectedLevel === level.id ? "default" : "outline"}
                      className="justify-start h-auto py-6 px-4 text-left"
                      onClick={() => handleLevelSelect(level.id)}
                    >
                      <div>
                        <p className="font-medium">{level.name}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-4">
                  {subjects.map(subject => (
                    <div key={subject.id} className="flex items-center space-x-3 border rounded-md p-4">
                      <Checkbox
                        id={subject.id}
                        checked={selectedSubjects.includes(subject.id)}
                        onCheckedChange={() => handleSubjectToggle(subject.id)}
                      />
                      <label
                        htmlFor={subject.id}
                        className="flex-1 font-medium cursor-pointer"
                      >
                        {subject.name}
                      </label>
                    </div>
                  ))}
                  
                  {subjects.length === 0 && (
                    <div className="text-center p-6">
                      <p className="text-muted-foreground">No subjects found for this level. Please check back later.</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button 
              variant="outline" 
              onClick={() => setStep(s => s - 1)}
              disabled={loading}
            >
              Back
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => navigate('/auth')}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
          
          {step < 3 ? (
            <Button 
              onClick={() => {
                if (step === 1 && selectedBoard) setStep(2);
                else if (step === 2 && selectedLevel) setStep(3);
              }}
              disabled={(step === 1 && !selectedBoard) || (step === 2 && !selectedLevel) || loading}
            >
              Continue
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              disabled={selectedSubjects.length === 0 || loading}
            >
              {loading ? 'Saving...' : 'Complete'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Onboarding;
