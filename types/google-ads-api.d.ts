// Type declarations for google-ads-api
declare module 'google-ads-api' {
  export class GoogleAdsApi {
    constructor(config: any);
    Customer(config: any): any;
  }
  
  export class Customer {
    constructor(config: any);
    query(query: string): Promise<any>;
    customerManager: {
      listAccessibleCustomers(): Promise<any>;
    };
  }
  
  export interface GoogleAdsConfig {
    client_id: string;
    client_secret: string;
    developer_token: string;
    refresh_token?: string;
    customer_id?: string;
  }
}