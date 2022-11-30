export type FormInformationType = {
    fullname: string;
    sex: string;
    sex_label: string;
    birthday: string;
    customer_id_value: string;
    phone_number: string;
    email: string;
    address_full: string;
};

export type ForgotPwdType = {
    phone: string;
};

export interface AuthenticationState {
  loading: boolean;
}


// ca làm việc
export type ShiftWorkType = {

    // Ngày trong tuần
    dateOfWeek: string[];

    startTime: string;

    endtime: string;
};


