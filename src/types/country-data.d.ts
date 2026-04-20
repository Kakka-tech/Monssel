declare module "country-data" {
  export const countries: {
    all: {
      alpha2: string;
      name: string;
      countryCallingCodes: string[];
    }[];
  };
}