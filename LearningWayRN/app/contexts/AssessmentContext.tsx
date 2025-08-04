import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AssessmentProgress, VarkResults, ModuleProgress, FinalResults } from '../types';

interface AssessmentState {
  progress: AssessmentProgress;
  isLoading: boolean;
  error: string | null;
}

type AssessmentAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_PROGRESS'; payload: AssessmentProgress }
  | { type: 'SELECT_TOPIC'; payload: string }
  | { type: 'COMPLETE_VARK'; payload: VarkResults }
  | { type: 'UPDATE_MODULE_PROGRESS'; payload: { moduleId: string; progress: ModuleProgress } }
  | { type: 'COMPLETE_ASSESSMENT'; payload: FinalResults }
  | { type: 'RESET_ASSESSMENT' };

const initialState: AssessmentState = {
  progress: {
    varkCompleted: false,
    moduleProgress: {},
    completed: false,
  },
  isLoading: false,
  error: null,
};

const assessmentReducer = (state: AssessmentState, action: AssessmentAction): AssessmentState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'LOAD_PROGRESS':
      return { ...state, progress: action.payload };
    
    case 'SELECT_TOPIC':
      return {
        ...state,
        progress: {
          ...state.progress,
          selectedTopic: action.payload,
        },
      };
    
    case 'COMPLETE_VARK':
      return {
        ...state,
        progress: {
          ...state.progress,
          varkCompleted: true,
          varkResults: action.payload,
        },
      };
    
    case 'UPDATE_MODULE_PROGRESS':
      return {
        ...state,
        progress: {
          ...state.progress,
          moduleProgress: {
            ...state.progress.moduleProgress,
            [action.payload.moduleId]: action.payload.progress,
          },
        },
      };
    
    case 'COMPLETE_ASSESSMENT':
      return {
        ...state,
        progress: {
          ...state.progress,
          completed: true,
          finalResults: action.payload,
        },
      };
    
    case 'RESET_ASSESSMENT':
      return {
        ...state,
        progress: {
          varkCompleted: false,
          moduleProgress: {},
          completed: false,
        },
      };
    
    default:
      return state;
  }
};

const AssessmentContext = createContext<{
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
  saveProgress: () => Promise<void>;
  loadProgress: () => Promise<void>;
  clearProgress: () => Promise<void>;
} | null>(null);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const STORAGE_KEY = '@learning_assessment_progress';

  const saveProgress = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save progress' });
    }
  }, [state.progress]);

  const loadProgress = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const savedProgress = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        dispatch({ type: 'LOAD_PROGRESS', payload: progress });
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load progress' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearProgress = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      dispatch({ type: 'RESET_ASSESSMENT' });
    } catch (error) {
      console.error('Failed to clear progress:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to clear progress' });
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  useEffect(() => {
    if (state.progress.selectedTopic || state.progress.varkCompleted || Object.keys(state.progress.moduleProgress).length > 0) {
      saveProgress();
    }
  }, [state.progress, saveProgress]);

  return (
    <AssessmentContext.Provider value={{ state, dispatch, saveProgress, loadProgress, clearProgress }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
};