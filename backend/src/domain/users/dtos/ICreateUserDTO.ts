interface ICreateUserDTO {
  email: string;

  password: string;

  name: string;

  verification_code: string;

  user_type_id: string;
}

export default ICreateUserDTO;
