import * as yup from 'yup';
import {FormInformationType} from "@model/user";

export const profileValidation: yup.SchemaOf<FormInformationType> = yup.object().shape({
    phone_number: yup.string()
        .matches(/(03|05|07|08|09)+([0-9]{8})\b/ , 'Số điện thoại không đúng định dạng, vui lòng kiểm tra lại'),
    // sex: yup.string().required('Mật khẩu không được bỏ trống'),
    // birthday: yup.string().required('Mật khẩu không được bỏ trống'),
    // customer_id_value: yup.string().required('Mật khẩu không được bỏ trống'),
    // fullname: yup.string().required('Số điện thoại không được bỏ trống'),
    email: yup.string().email('Định dạng email không đúng, vui lòng kiểm tra lại'),
    // address_full: yup.string().required('Địa chỉ không được bỏ trống'),
});


export const partnerValidation: yup.SchemaOf<FormInformationType> = yup.object().shape({
    phone_number: yup.string()
        .matches(/(03|05|07|08|09)+([0-9]{8})\b/ , 'Số điện thoại không đúng định dạng, vui lòng kiểm tra lại')
        .required('Số điện thoại không được bỏ trống'),
    // sex: yup.string().required('Mật khẩu không được bỏ trống'),
    // birthday: yup.string().required('Mật khẩu không được bỏ trống'),
    // customer_id_value: yup.string().required('Mật khẩu không được bỏ trống'),
    // fullname: yup.string().required('Số điện thoại không được bỏ trống'),
    fullname: yup.string()
        .required('Họ và tên không được bỏ trống'),
    // address_full: yup.string().required('Địa chỉ không được bỏ trống'),
});

// fullname: string;
// sex: string;
// sex_label: string;
// birthday: string;
// customer_id_value: string;
// phone_number: string;
// email: string;
// address_full: string;