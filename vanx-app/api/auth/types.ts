export type User = {
  id: number;
  name: string;
  userIcon: string;
  userJob: string;
}

export type SignUpParams = {
  userName: string;
  password: string;
  confirmPassword: string;
};

export type LoginParams = {
  userName: string;
  password: string;
};