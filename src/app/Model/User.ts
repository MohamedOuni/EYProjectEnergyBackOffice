import { Role } from "./Role";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone?: string;
  role: Role;
  isValid : boolean
  isBanned: boolean; 

}