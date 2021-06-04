export interface IUserData {
  _id: number;
  name: string;
}

export interface IPaginationRequest{
  search: string;
  pageSize: number;
  pageIndex: number;
}
