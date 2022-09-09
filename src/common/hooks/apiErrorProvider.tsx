import { ErrorPopUp } from "common/components/ErrorPopUp";
import React, { useState, useCallback } from "react";

export interface IErrorContext {
  error: IError | null;
  addError: (message: string, status?: number) => void;
  removeError: () => void;
}
const defaultContextValue: IErrorContext = {
  error: null,
  addError: () => {},
  removeError: () => {},
};
export interface IError {
  message: string;
  status?: number;
}

export const APIErrorContext =
  React.createContext<IErrorContext>(defaultContextValue);

interface IAPIErrorProviderProps {
  children: JSX.Element[] | JSX.Element;
}
export default function APIErrorProvider(props: IAPIErrorProviderProps) {
  const [error, setError] = useState<IError | null>(null);

  const removeError = () => setError(null);

  const addError = (message: string, status?: number) =>
    setError({ message, status });

  const contextValue = {
    error,
    addError: useCallback(
      (message: string, status?: number) => addError(message, status),
      []
    ),
    removeError: useCallback(() => removeError(), []),
  };

  return (
    <APIErrorContext.Provider value={contextValue}>
      <>
        {props.children}
        {error ? <ErrorPopUp errorMessage={error?.message} /> : <></>}
      </>
    </APIErrorContext.Provider>
  );
}
