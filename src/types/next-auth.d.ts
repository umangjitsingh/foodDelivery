
declare module "next-auth"{
    interface User{
        id: string;
        name:string;
        role?: string;
        email:string
    }
}

export {}