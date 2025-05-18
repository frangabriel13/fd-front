const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_REVIEW_REQUEST':
    case 'UPDATE_REVIEW_REQUEST':
    case 'DELETE_REVIEW_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'CREATE_REVIEW_SUCCESS':
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        loading: false,
        error: null,
      };

    case 'UPDATE_REVIEW_SUCCESS':
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review.id === action.payload.id ? action.payload : review
        ),
        loading: false,
        error: null,
      };

    case 'DELETE_REVIEW_SUCCESS':
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.payload.id),
        loading: false,
        error: null,
      };

    case 'CREATE_REVIEW_FAILURE':
    case 'UPDATE_REVIEW_FAILURE':
    case 'DELETE_REVIEW_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};


export default reviewReducer;