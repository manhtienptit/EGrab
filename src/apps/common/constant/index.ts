export const STORAGE_KEY_TOKEN = 'TOKEN';
export const STORAGE_KEY_CUSTOMER = 'CUSTOMER_INFOR';
export const STORAGE_KEY_APP_THEME = 'APP_THEME';
export const STATUS_ERROR = {
    'STRING_EMPTY' : "",
    'SUCCESS' :"success",
    'FAIL' : "fail",
    'STATUS_SUCCESS' : "0",
    'ERROR_NOT_FOUND' : "-1",
    'ERR_SIGNUP_ACCOUNT_EXISTING' : "11001",
    'ERR_LOGIN_ACCOUNT_NOT_FOUND' : "ERR_LOGIN_ACCOUNT_NOT_FOUND",
    'ERR_CUSTOMER_NOT_FOUND' : "ERR_CUSTOMER_NOT_FOUND",
    'ERR_LOGIN_PASSWORD_INVALID' : "ERR_LOGIN_PASSWORD_INVALID",
    'ERR_EVN_CONTRACT_CANNOT_ADD_TO_MANY_CUSTOMER' :"ERR_EVN_CONTRACT_CANNOT_ADD_TO_MANY_CUSTOMER",
    'ERR_ACCOUNT_LOCKED_BY_TOO_MANY_FAIL_VERIFICATIONS' : "ERR_ACCOUNT_LOCKED_BY_TOO_MANY_FAIL_VERIFICATIONS",
    'ERR_ACCOUNT_NAME_NOT_FOUND' : "ERR_ACCOUNT_NAME_NOT_FOUND",
    'NO_ERROR' : "NO_ERROR",
    'PHONE_NUMBER_KEY' : "PHONE_NUMBER_KEY",
    'NEW_PIN' : "NEW_PIN",
    'CURRENT_PIN' : "CURRENT_PIN",
    'ERR_AUTH_TOKEN_TIMEOUT' : "ERR_AUTH_TOKEN_TIMEOUT",
    'ERR_AUTH_TOKEN_INVALID' : "ERR_AUTH_TOKEN_INVALID",
    'ERR_AUTH_TOKEN_EXPIRED' : "ERR_AUTH_TOKEN_EXPIRED",
} as Record<string, string>;
export const STATUS_ORDER = {
    'MATCHING' : "Đã nhận đơn",
    'CREATED' : "Chờ tiếp nhận",
    'ELECTRICIAN_ACCEPTED' : "Đã tiếp nhận",
    'CUSTOMER_REJECTED' :"Đã huỷ",
    'ELECTRICIAN_UNMATCHING' : "Đã huỷ",
    'ELECTRICIAN_REJECTED' : "Đã huỷ",
    'CONFIRMED' : "Đã ký hợp đồng",
    'ACCEPTANCE_REQUESTED' : "Chờ nghiệm thu",
    'ACCEPTANCED' : "Đã nghiệm thu",
    'PAYMENT_REQUESTED' : "Chờ thanh toán",
    'PAID' :"Đã thanh toán",
    'PAID_CONFIRMED' : "Đã hoàn thành",
    'RATED' : "Đã hoàn thành",
} as Record<string, string>;

export const STATUS_ORDER_COLOR = {
    'CREATED' : "#FFF7EB",
    'MATCHING' : "#FFF7EB",
    'ELECTRICIAN_ACCEPTED' : "#FFF7EB",
    'CUSTOMER_REJECTED' :"#E7F0FF",
    'ELECTRICIAN_UNMATCHING' : "#E7F0FF",
    'ELECTRICIAN_REJECTED' : "#E7F0FF",
    'CONFIRMED' : "#FFF7EB",
    'ACCEPTANCE_REQUESTED' : "#FFF7EB",
    'ACCEPTANCED' : "#FFF7EB",
    'PAYMENT_REQUESTED' : "#FFF7EB",
    'PAID' :"#DDFFE0",
    'PAID_CONFIRMED' : "#DDFFE0",
    'RATED' : "#DDFFE0",
} as Record<string, string>;


export const STATUS_ORDER_COLOR_TXT = {
    'CREATED' : "#ED8E00",
    'MATCHING' : "#ED8E00",
    'ELECTRICIAN_ACCEPTED' : "#ED8E00",
    'CUSTOMER_REJECTED' :"#FF4747",
    'ELECTRICIAN_UNMATCHING' : "#FF4747",
    'ELECTRICIAN_REJECTED' : "#FF4747",
    'CONFIRMED' : "#ED8E00",
    'ACCEPTANCE_REQUESTED' : "#ED8E00",
    'ACCEPTANCED' : "#ED8E00",
    'PAYMENT_REQUESTED' : "#ED8E00",
    'PAID' :"#00AF12",
    'PAID_CONFIRMED' : "#00AF12",
    'RATED' : "#00AF12",
} as Record<string, string>;


export const POPUP_TEXT = {
    'CREATED' : "Nhập chi phí dịch vụ dự kiến",
    'ELECTRICIAN_ACCEPTED' : "Nhập chi phí dịch vụ dự kiến",
    'CUSTOMER_REJECTED' :"Đã huỷ",
    'ELECTRICIAN_UNMATCHING' : "Đã huỷ",
    'ELECTRICIAN_REJECTED' : "Đã huỷ",
    'CONFIRMED' : "Ký hợp đồng",
    'ACCEPTANCE_REQUESTED' : "Đang xử lý",
    'ACCEPTANCED' : "Đã nghiệm thu",
    'PAYMENT_REQUESTED' : "Đã nghiệm thu",
    'PAID' :"Chờ thanh toán",
    'PAID_CONFIRMED' : "Đã hoàn thành",
    'RATED' : "Đã hoàn thành",
} as Record<string, string>;




