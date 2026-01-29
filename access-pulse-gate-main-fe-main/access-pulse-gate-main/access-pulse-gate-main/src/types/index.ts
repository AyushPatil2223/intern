export type UserRole = "user";

export interface User {
  id: string;
  name: string;
  mobile: string;
  role: UserRole;
  employeeCode?: string;
  createdAt: string;
}
export interface Employee {
  email_id: string;
  emp_code: string;
  curr_comp: string;
  loc_code: string;
  roles: string;
  emp_name: string;
  mobile_no: string;
  pa_code: string;
  curr_comp_code: string;
  locn_ic_yn: string | null;
  emp_status: string;
  loc_name: string;
  designation: string;
  psa: string;
}

// export interface AuthState {
//   employee: Employee | null;
//   user: User | null;
//   role: Role | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   captchaImage: string | null;

//   login: (credentials: LoginCredentials) => Promise<void>;

//   //For userLogin
//   userLogin: (credentials: UserLoginCredentials) => Promise<void>;

//   logout: () => void;
//   fetchCaptcha: () => Promise<void>;

//   setUser: (user: User | null) => void;
// }



export interface AuthState {
  employee: Employee | null;
  user: User | null;
  role: Role | Role[] | null;
  token: string | null;
  isAuthenticated: boolean;
  captchaImage: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  userLogin: (credentials: UserLoginCredentials) => Promise<void>;
  logout: () => void;
  fetchCaptcha: () => Promise<void>;
  setUser: (user: User | null) => void;
}


export interface LoginCredentials {
  username: string;
  password: string;
  captcha?: string;
}

export interface StoreLoginData {
  token: string;
  user: User | null;
}






export interface UserLoginCredentials {
  mobile: string;
  password: string;
  captcha: string;
}


// export interface Roles {
//   roles: string[];
// }


export type Role = 'admin' | 'employee' | 'user';


// export interface Visitor {
//   id: string;
//   name: string;
//   gender: "male" | "female" | "other";
//   mobile: string;
//   company: string;
//   email?: string;
//   engineerName: string;
//   createdAt: string;
//   createdBy: string;
// }




export interface Visitor {
  id: number;
  fullName: string;
  gender: string;
  mobileNumber: string;
  companyName: string;
  emailId: string;
  host: string;
   hostName: string;
   purposeOfVisit : string;
  visitDate: string;
  visitTime: string;
  photo?: string; // Base64 image from backend

  punchOutDateTime?: string | null; // ✅ Add this

  createdAt: string; 
}


export interface VisitorFormData {
  name: string;
  gender: "male" | "female" | "other";
  mobile: string;
  company: string;
  email?: string;
  photo?: FileList;
  purpose: string; 
}

export interface CreateVisitorPayload extends VisitorFormData {
  host: string;
}


export interface NewUserFormData {
  name: string;
  mobile: string;
  password: string;
  
  employeeCode?: string;
}

export interface DashboardStats {
  
  totalVisitors: number;
  todayVisitors: number;
  totalUsers: number;
  totalEmployees: number;
}

export interface UpdateUserProfilePayload {
  name?: string;
  password?: string;
}

// User report (used in reports / table view only)
export interface UserReport {
  employeeCode: string;
  mobile: string;
  name: string;
  createdAt: string;
    isActive: boolean; 
}
