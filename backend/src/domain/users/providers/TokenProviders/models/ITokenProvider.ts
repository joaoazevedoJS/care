interface ITokenProvider {
  sign(user_id: string): Promise<string>;
}

export default ITokenProvider;
