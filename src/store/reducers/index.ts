import categoryReducer from './categories';
import addressesReducer from './addresses';
import searchReducer from './search';
import userReducer from './users';

const reducer = {
  user: userReducer,
  address: addressesReducer,
  search: searchReducer,
  category: categoryReducer,
};

export default reducer;
