const initialState = {
  token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_UP_SUCCESS':
    case 'SIGN_IN_SUCCESS':
      return { ...state, token: action.payload.access_token, error: null };
    case 'SIGN_UP_FAILURE':
    case 'SIGN_IN_FAILURE':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
