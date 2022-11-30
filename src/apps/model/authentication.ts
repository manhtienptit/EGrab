export type BlockFormLoginType = {
    username: string;
    password: string;
    device_key: string;
    device_param: string;
    layout_engine: string;
    lang: string;
};

export type ForgotPwdType = {
    phone: string;
};

export interface AuthenticationState {
  loading: boolean;
}


