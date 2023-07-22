import { BaseData, ImageFormat, PaginationResponse } from './base.model';

export interface Category extends BaseData {
  icons: ImageFormat[];
  name: string;
}

export interface CategoriesResponse {
  categories: PaginationResponse<Category>;
}
