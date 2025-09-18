import { IPagenation } from "./pagination.interface"

export interface ICategoryResponse {
  results: number;
  metadata: IPagenation;
  data: ICategory[]
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
