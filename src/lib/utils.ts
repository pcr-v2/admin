// 자동 하이픈 삽입
export function autoHyphen(phoneNumber: string): string {
  const number = phoneNumber.trim().replace(/[^0-9]/g, "");
  if (number.length < 4) return number;
  if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
  if (number.length < 11)
    return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
  return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}

// 이메일 포맷
export const isEmailFormat = (email: string) => {
  if (email == null || email.length <= 0) return false;

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailRegex.test(email);
};

// 비번 포맷 영소,영대,특문,숫자 6-12자리
export const isPasswordFormat = (password: string) => {
  if (password == null || password.length <= 0) return false;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z]?)(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,12}$/;

  return passwordRegex.test(password);
};

// 폰번 포맷
export const isPhoneNumberFormat = (phoneNumber: string) => {
  const removedHyphen = phoneNumber?.replaceAll("-", "");
  if (phoneNumber == null || phoneNumber.length <= 0) return false;
  const phoneNumberRegex = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
  return phoneNumberRegex.test(removedHyphen);
};

// 하이픈 제거
export const getOnlyNumber = (number: string) => {
  const result = number.replace(/[^.0-9]/g, "");
  return result;
};

// 이름 포맷 한,영,숫자 1-20자리
export const isNameFormat = (name: string) => {
  const nameRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣ\x20A-Za-z0-9\s]{1,20}$/;
  return nameRegex.test(name);
};
