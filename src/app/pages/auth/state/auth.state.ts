export type AuthState = {
  token: string | null;
  error: string | null;
  isLoading: boolean;
};

export const initialAuthState: AuthState = {
  token: null,
  error: null,
  isLoading: false,
};
