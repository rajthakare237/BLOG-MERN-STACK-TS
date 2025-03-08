// Define authentication action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

//structure of the login action payload
interface LoginPayload {
  email: string;
  token: string;
  username: string;
  bio: string;
  profilePicUrl: string;
}

//possible auth actions
export type AuthAction =
  | { type: typeof LOGIN; payload: LoginPayload } //login carries user data
  | { type: typeof LOGOUT; payload?: never }; //logout doesn't need payload

//action creator for user login
export const login = (email: string, token: string, username: string, bio: string, profilePicUrl: string): AuthAction => ({
  type: LOGIN, //action type
  payload: { email, token, username, bio, profilePicUrl }, //user details
});

//action creator for user logout
export const logout = (): AuthAction => ({
  type: LOGOUT, //action type
});
