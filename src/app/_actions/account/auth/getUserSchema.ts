export type TAuth = {
  sub: string;
  uid: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  phone_no: string;
  type: string;
  profile_img: string;
  login_id: string;
  created_at: Date;
};

export type GetUserResponse = {
  code: "SUCCESS";
  message?: string;
  data: TUser;
};
