import ApiResponse from './response.interface';

export default interface RestApi {
  axios: any,
  getPosts(): Promise<ApiResponse[]>,
  // getPost(): ApiResponse[],
  // getPage(): ApiResponse,
}