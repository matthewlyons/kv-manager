const globalState = {
  alert: { message: '', success: false, active: false }
};

const types = {
  SET_ALERT: 'SET_ALERT'
};

const reducer = (state = globalState, action) => {
  let updatedState;
  switch (action.type) {
    case types.SET_ALERT:
      updatedState = { ...state, alert: action.payload };
      return updatedState;
    default:
      throw new Error('Unexpected action');
  }
};

export { globalState, types, reducer };
