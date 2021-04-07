interface IUsersTypeRepository {
  getAdminTypeId(): Promise<string>;
  getDoctorTypeId(): Promise<string>;
  getUserTypeId(): Promise<string>;
}

export default IUsersTypeRepository;
