const items = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ITEMS':
      console.log('dispatch Worked !!!');
      return [
        ...state,
      ];
    default:
      return state;
  }
};
export default items;
