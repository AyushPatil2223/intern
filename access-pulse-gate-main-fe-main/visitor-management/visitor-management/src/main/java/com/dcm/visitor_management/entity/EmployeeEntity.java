package com.dcm.visitor_management.entity;


import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;

@Entity
@Data
@Table(name="cem",schema = "cem_genpsqldb")
public class EmployeeEntity {
	@Id
	@Column(name = "emp_code")
	// private int empCode;\
   private String empCode;

    private String loc_code;
    private String loc_name;
    private String emp_name;
    private String emp_status;
    private String email_id;
    private String mobile_no;
    private String emp_gender;
    private String present_addr1;
    private String present_addr2;
    private String present_addr3;
    private String present_addr4;
    private String emp_sub_grp_code;
    private String emp_grp_code;
    private String psa;
    private Date dob;
    private String pa_code;
    
//    @Transient
//    private String role;
//
//    @Transient
//    private String incomingvisitor;
    private String curr_comp_code;
    private String curr_comp;
    private String designation;
    private String locn_ic_yn;
    private String working_hours;



    public String getEmpCode() {
    return empCode;
}

public void setEmpCode(String empCode) {
    this.empCode = empCode;
}

}
