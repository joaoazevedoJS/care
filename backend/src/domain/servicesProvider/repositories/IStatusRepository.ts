interface IStatusRepository {
  getOpeningId(): Promise<string>;
  getProgressId(): Promise<string>;
  getClosedId(): Promise<string>;
}

export default IStatusRepository;
