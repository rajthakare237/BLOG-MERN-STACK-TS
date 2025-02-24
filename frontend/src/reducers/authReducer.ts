import { LOGIN, LOGOUT, AuthAction } from '../actions/authActions';

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  token: string | null;
  username: string | null;
  bio: string | null;
  profilePicUrl: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  token: null,
  username: null,
  bio: null,
  profilePicUrl: null
};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        email: action.payload.email,
        token: action.payload.token,
        username: action.payload.username,
        bio: action.payload.bio,
        profilePicUrl: action.payload.profilePicUrl
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
