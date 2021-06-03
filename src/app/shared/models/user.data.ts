export interface IUserData {
  _id: number;
  assets: string;
}

export interface IPaginationRequest{
  search: string;
  pageSize: number;
  pageIndex: number;
}
