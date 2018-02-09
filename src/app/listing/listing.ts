// TODO: Update this to match the object from AddListing component
export class Listing {
  id?: string;
  title?: string;
  description?: string;
  monthlyRent?: number;
  image?: string;
  postcode?: number;
  createdDate?: Date = new Date();
}
