/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeType } from '@theme';
import {PerformType} from "@model/perfomance/performance";
export interface AppState {
  internetState: boolean;

  profile: any;

  token: string | undefined;

  loadingApp: boolean;

  showDialog: boolean;

  // Trạng thái nhận việc
  inCharge: boolean;

  password: string | undefined;

  retype_password: string | undefined;

  passnotMatch: boolean;

  theme: ThemeType;

  performanceDetail: PerformType;
}


export type PopupType = {
    cost: string;
    note: string;
};