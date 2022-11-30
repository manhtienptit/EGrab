import { FormLoginType } from '@model/authentication';
import {PopupType} from "@model/app";

export interface FormOrderAcceptProps {
  onSubmit: (data: PopupType) => void;
  onReject: (data: PopupType) => void;
}
