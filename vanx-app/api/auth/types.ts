export type User = {
  id: number;
  name: string;
  point: number;
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