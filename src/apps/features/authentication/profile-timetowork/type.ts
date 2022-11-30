import {FormInformationType} from "@model/user";

export interface FormInforProps {
  onSubmit: (data: FormInformationType) => void;
  profileInfo: FormInformationType;
}
