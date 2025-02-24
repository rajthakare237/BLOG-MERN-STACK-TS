export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

interface LoginPayload {
  email: string;
  token: string;
  username: string;
  bio: string;
  profilePicUrl: string;
}

export type AuthAction =
  | { type: typeof LOGIN; payload: LoginPayload }
  | { type: typeof LOGOUT; payload?: never };

export const login = (email: string, token: string, username: string, bio: string, profilePicUrl: string): AuthAction => ({
  type: LOGIN,
  payload: { email, token, username, bio, profilePicUrl },
});

export const logout = (): AuthAction => ({
  type: LOGOUT,
});


// export const LOGIN = 'LOGIN';
// export const LOGOUT = 'LOGOUT';

// interface LoginPayload {
//   email: string;
//   token: string;
// }

// export type AuthAction =
//   | { type: typeof LOGIN; payload: LoginPayload }
//   | { type: typeof LOGOUT; payload?: never };

// export const login = (email: string, token: string): AuthAction => ({
//   type: LOGIN,
//   payload: { email, token },
// });

// export const logout = (): AuthAction => ({
//   type: LOGOUT,
// });
