interface IUsers {
  id: string;

  email: string;

  name: string;

  password: string;

  user_type_id: string;

  user_avatar: string;

  verified_account: boolean;

  verification_code: string;

  mail_resend_count: number;

  mail_limit_date_resend: Date;

  created_at: Date;

  updated_at: Date;
}

export default IUsers;
