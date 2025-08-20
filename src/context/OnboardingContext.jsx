import React, { createContext, useContext, useState } from 'react';

const defaultData = {
  step1: {},
  step2: {},
  step3: {},
  step4: {},
  step5: {},
  step6: {},
  step7: {},
  step8: {},
  step9: {},
};

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [onboardingData, setOnboardingData] = useState(() => {
    // Try to load from localStorage for persistence
    const saved = localStorage.getItem('onboardingData');
    return saved ? JSON.parse(saved) : defaultData;
  });

  // Save to localStorage on change
  React.useEffect(() => {
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
  }, [onboardingData]);

  const updateStep = (step, data) => {
    setOnboardingData(prev => ({ ...prev, [step]: { ...prev[step], ...data } }));
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateStep }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  return useContext(OnboardingContext);
} 