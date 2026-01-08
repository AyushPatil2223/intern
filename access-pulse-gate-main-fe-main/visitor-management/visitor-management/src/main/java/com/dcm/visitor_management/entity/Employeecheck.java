package com.dcm.visitor_management.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "admin_users", schema = "suraksha")
public class Employeecheck {

    @Id
    @Column(name = "emp_code")
    private String empCode;

    @Column(name = "is_admin")
    private String is_admin;

    // Getter and Setter for empCode
    public String getEmpCode() {
        return empCode;
    }

    public void setEmpCode(String empCode) {
        this.empCode = empCode;
    }

    // Getter and Setter for is_admin
    public String getIs_admin() {
        return is_admin;
    }

    public void setIs_admin(String is_admin) {
        this.is_admin = is_admin;
    }
}
