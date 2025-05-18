const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FAVORITES_REQUEST':
    case 'ADD_FAVORITE_REQUEST':
    case 'DELETE_FAVORITE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'GET_FAVORITES_SUCCESS':
      return {
        ...state,
        favorites: action.payload,
        loading: false,
        error: null,
      };

    case 'ADD_FAVORITE_SUCCESS':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        loading: false,
        error: null,
      };

    case 'DELETE_FAVORITE_SUCCESS':
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.productId !== action.payload.productId
        ),
        loading: false,
        error: null,
      };

    case 'GET_FAVORITES_FAILURE':
    case 'ADD_FAVORITE_FAILURE':
    case 'DELETE_FAVORITE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};


export default favoriteReducer;