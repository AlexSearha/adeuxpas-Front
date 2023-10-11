// REACT
import { useState } from 'react';

function useChangeState(initialValue: boolean) {
  const [state, setState] = useState(initialValue);

  const changeState = () => {
    setState(!state);
  };

  return {
    state,
    changeState,
  };
}

export default useChangeState;
