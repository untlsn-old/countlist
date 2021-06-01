import { useDispatch } from 'react-redux';
import { actions } from '@store';

type Actions = typeof actions;
interface Action<T=any> {
  type: string,
  payload?: T
}
type ActionFn<T> = (payload: T) => Action<T>

const useCleverDispatch = () => {
  const dispatch = useDispatch();

  return <Payload>(callback: (actions: Actions) => ActionFn<Payload>) => {
    const action = callback(actions);

    return (payload: Payload) => dispatch(action(payload));
  };
};

export default useCleverDispatch;