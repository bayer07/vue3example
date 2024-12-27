import { UserAccountType } from "@/enum/UserAccountType";

export default interface IUserAccount {
    id: number;
    labels: string[];
    accountType: UserAccountType;
    login: string;
    password: string;
}