type onboardingSwiperDataType = {
    id: number;
    title: string;
    description: string;
    sortDescrition: string;
    sortDescrition2?: string;
    image: any;
  };
  
  type Avatar = {
    public_id: string;
    url: string;
  };
  
  type User = {
    _id: string;
    name: string;
    email: string;
    avatar?: Avatar;
    password?: string;
    courses: any;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    user: User;
}

export interface FormErrors {
    email: string;
    password: string;
}

export interface ValidationRules {
    email: RegExp;
    password: RegExp;
}

  type BannerDataTypes = {
    bannerImageUrl: any;
  };