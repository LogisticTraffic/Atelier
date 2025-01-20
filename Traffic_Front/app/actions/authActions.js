export const signUp = (username, password) => async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      dispatch({ type: 'SIGN_UP_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'SIGN_UP_FAILURE', payload: error.message });
    }
  };
  
  export const signIn = (username, password) => async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      dispatch({ type: 'SIGN_IN_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'SIGN_IN_FAILURE', payload: error.message });
    }
  };
  
export default { signUp };