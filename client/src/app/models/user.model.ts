export class User{
    name: string;
    role: string;
    employee_id: string;
    username: string;
    email: string;
    phone: string;
    dob: Date;

    constructor(name,username,email,role,dob,phone,employee_id){
        this.name = name;
        this.username = username;
        this.email = email;
        this.role = role;
        this.dob = dob;
        this.phone = phone;
        this.employee_id = employee_id
    }
}