import { useBoolState } from '@hooks';
import { formChanger } from './data';

export const useLogState = () => {
  const [isLogin, switchType] = useBoolState(true);
  const text = isLogin ? 'Log in' : 'Sing Up';
  const [beforeClicker, clicker] = formChanger[text];
  const [showError, toggleShowError] = useBoolState();

  return { isLogin, switchType, beforeClicker, clicker, text, showError, toggleShowError };
};