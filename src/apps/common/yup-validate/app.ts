import {ForgotPwdType} from '@model/authentication';
import  rxPhone  from '@config/regex';
import * as yup from 'yup';
import {PopupType} from "@model/app";

export const popupValidation: yup.SchemaOf<PopupType> = yup.object().shape({
  // cost: yup.string()
      // .matches(/(03|05|07|08|09)+([0-9]{8})\b/ , 'Số điện thoại đúng, vui lòng kiểm tra lại')
      // .required('Chi phí không được bỏ trông')
});

