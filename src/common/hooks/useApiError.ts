import { useContext } from 'react';
import { APIErrorContext } from './apiErrorProvider';


export const useAPIError = () => {
  const { error, addError, removeError } = useContext(APIErrorContext);
  return { error, addError, removeError };
}
