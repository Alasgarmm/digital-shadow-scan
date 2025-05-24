// FormContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type FormData = {
  name: string;
  email: string;
  aliases: string[];
  consent: boolean;
  files: File[];
};

type FormContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const defaultFormData: FormData = {
  name: '',
  email: '',
  aliases: [],
  consent: false,
  files: [],
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
