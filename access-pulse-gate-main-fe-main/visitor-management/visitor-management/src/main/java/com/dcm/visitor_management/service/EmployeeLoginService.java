
package com.dcm.visitor_management.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import javax.naming.Context;
import javax.naming.NamingException;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dcm.visitor_management.dto.EmpLoginReq;
import com.dcm.visitor_management.repository.EmployeeCheckRepository;
import com.fasterxml.jackson.databind.JsonNode;


//import com.ioc.complaintms.repository.FbnewAdminRepository;

@Service
public class EmployeeLoginService implements UserDetailsService {

    private EmpLoginReq loginReq = new EmpLoginReq();

    private HashMap<String, String> users = new HashMap<>();
    @Autowired
private EmployeeCheckRepository employeeCheckRepository;


    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void setUser(EmpLoginReq req) {
        this.loginReq = req;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username == null || username.isEmpty()) {
            throw new UsernameNotFoundException("Username cannot be null or empty");
        }

        String password = "1234";

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_EMPLOYEE"));

        return new org.springframework.security.core.userdetails.User(username, password, authorities);
    }

    public UserDetails loadUserByVendorname(String username) throws UsernameNotFoundException {
        users.put(username, loginReq.getPassword());
        return new User(username, users.get(username), new ArrayList<>());
    }

    public boolean EmployeeLogin(String username, String password) {
        DirContext ctx = null;

        try {
            username = normalizeUsername(username);

            Hashtable<String, String> env = new Hashtable<>();
            env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
            env.put(Context.PROVIDER_URL, "LDAP://dcmkho1.ds.indianoil.in:389");
            env.put(Context.SECURITY_AUTHENTICATION, "DIGEST-MD5");
            env.put(Context.SECURITY_PRINCIPAL, username);
            env.put(Context.SECURITY_CREDENTIALS, password);

            ctx = new InitialDirContext(env);
            return true;

        } catch (NamingException ne) {
            return false;
        } finally {
            if (ctx != null) { try { ctx.close(); } catch (Exception ignored) {} }
        }
    }

    private String normalizeUsername(String username) {
        if (username != null && username.matches("\\d+")) {
            return String.format("%08d", Integer.parseInt(username));
        }
        return username;
    }



     public boolean isEmployeeAdmin(String empCode) {
      return employeeCheckRepository
            .findByEmpCode(empCode)
            .map(e -> "Y".equalsIgnoreCase(e.getIs_admin()))
            .orElse(false);
}



    public HashMap<String, Object> getEmployeeDetails(String empCode) {

        String sql = "SELECT emp_code,loc_code,loc_name,emp_name,emp_status,email_id,mobile_no,psa, pa_code, curr_comp_code, curr_comp, designation, locn_ic_yn"
        		+ "      FROM cem_genpsqldb.cem WHERE emp_code = ?";


        try {
            return jdbcTemplate.queryForObject(
                    sql,
                    (rs, rowNum) -> {
                        HashMap<String, Object> map = new HashMap<>();
                       // map.put("emp_code", rs.getInt("emp_code"));

                            //    String empCodeStr = String.valueOf(rs.getInt("emp_code"));
                              String empCodeStr = rs.getString("emp_code");
                              map.put("emp_code", empCodeStr);

                        map.put("loc_code", rs.getString("loc_code"));
                        map.put("loc_name", rs.getString("loc_name"));
                        map.put("emp_name", rs.getString("emp_name"));
                        map.put("emp_status", rs.getString("emp_status"));
                        map.put("email_id", rs.getString("email_id"));
                        map.put("mobile_no", rs.getString("mobile_no"));
                        map.put("psa", rs.getString("psa"));
                        map.put("pa_code", rs.getString("pa_code"));
                        map.put("curr_comp_code", rs.getString("curr_comp_code"));
                        map.put("curr_comp", rs.getString("curr_comp"));
                        map.put("designation", rs.getString("designation"));
                        map.put("locn_ic_yn", rs.getString("locn_ic_yn"));
                        //map.put("roles", List.of("employee", "admin"));
                        //return map;
                        
                        // ===== ROLE LOGIC (FINAL) =====
                        List<String> roles = new ArrayList<>();
                        roles.add("employee"); // always

                        if (isEmployeeAdmin(empCodeStr)) {
                            roles.add("admin");
                        }

                        map.put("roles", roles);

                        return map;


                        
                    },
                    // Integer.parseInt(empCode)   
                    empCode
            );
        } catch (Exception e) {
            e.printStackTrace();                 
            return new HashMap<>();
        }
    }


    // public JsonNode isAdmin(String username) {
    //     return null;
    // }

//     public boolean isEmployeeAdmin(String empCode) {
//     return employeeCheckRepository
//             .findByEmpCode(Integer.parseInt(empCode))
//             .map(e -> "Y".equalsIgnoreCase(e.getIs_admin()))
//             .orElse(false);
// }

}

