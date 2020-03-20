import mapObject from './map-object.interface';
import formObject from './form-object.interface';

export default interface ApiResponse {
  id: number,
  title: string,
  date: string, 
  slug: string, 
  content: string,
  excerpt: string,
  featured_image?: string,
  map: mapObject[],
  form: formObject[],
}