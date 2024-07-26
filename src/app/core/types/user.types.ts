export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarURL: string;
  subscription: string;
  role: string;
  token: string;
};

export type UserProfile = Omit<User, 'token' | 'id' | 'password'>;
