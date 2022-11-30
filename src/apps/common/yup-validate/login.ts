import {ForgotPwdType, FormLoginType} from '@model/authentication';
import  rxPhone  from '@config/regex';
import * as yup from 'yup';

export const loginValidation: yup.SchemaOf<FormLoginType> = yup.object().shape({
  username: yup.string()
      // .matches(/(03|05|07|08|09)+([0-9]{8})\b/ , 'Số điện thoại đúng, vui lòng kiểm tra lại')
      .required('Tài khoản không được bỏ trông'),
  password: yup.string().required('Mật khẩu không được bỏ trống'),
});


export const forgotValidation: yup.SchemaOf<ForgotPwdType> = yup.object().shape({
    phone: yup.string()
        .matches(/(03|05|07|08|09)+([0-9]{8})\b/ , 'Số điện thoại không đúng, vui lòng kiểm tra lại')
        .required('Số điện thoại không được bỏ trông')
});

