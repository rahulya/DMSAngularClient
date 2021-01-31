export class CompanyGroup {
    id?: number;
    companyGroupName: string;
    address: string;
    city: string;
    country: string;
    email: string;
    contactPerson: string
    phone: string;
    isActive: boolean;
    totalUsers: number;
    expirayDateAD ?: Date;
    isBranchApplicable: boolean;
    noOfBranch: number;
    groupCode:string;
    groupCreateDate ?:Date;

}