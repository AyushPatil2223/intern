package com.dcm.visitor_management.dto;

import com.fasterxml.jackson.databind.JsonNode;

//public class ApiResponse {
//
//	private Boolean success;
//	private String status;
//	private JsonNode responseObject;
////	private int stat;
//	
//	public ApiResponse() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//	public ApiResponse(Boolean success, String status, JsonNode responseObject) {
//		super();
//		this.success = success;
//		this.status = status;
//		this.responseObject = responseObject;
//	}
//	
//	public Boolean getSuccess() {
//		return success;
//	}
//	public void setSuccess(Boolean success) {
//		this.success = success;
//	}
//	public String getStatus() {
//		return status;
//	}
//	public void setStatus(String status) {
//		this.status = status;
//	}
//	public JsonNode getResponseObject() {
//		return responseObject;
//	}
//	public void setResponseObject(JsonNode responseObject) {
//		this.responseObject = responseObject;
//	}
//	
//	@Override
//	public String toString() {
//		return "ApiResponse [success=" + success + ", status=" + status + ", responseObject=" + responseObject + "]";
//	}
//		
//}



public class ApiResponse<T> {

    private Boolean success;
    private String status;
    private T responseObject;

    public ApiResponse() {
    }

    public ApiResponse(Boolean success, String status, T responseObject) {
        this.success = success;
        this.status = status;
        this.responseObject = responseObject;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public T getResponseObject() {
        return responseObject;
    }

    public void setResponseObject(T responseObject) {
        this.responseObject = responseObject;
    }
}
