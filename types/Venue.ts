export type VenueLocation = {
  street1?: string;
  street2?: string;
  suburb?: string;
  postcode?: string;
};

export type Venue = {
  name: string;
  location?: VenueLocation;
};