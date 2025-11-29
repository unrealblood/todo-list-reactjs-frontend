export type SignInFormFields = {
    email: string,
    password: string
};

export type SignUpFormFields = {
    name: string,
    email: string,
    password: string
};

export type InitialAuthSateType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}