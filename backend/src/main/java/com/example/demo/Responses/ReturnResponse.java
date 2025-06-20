package com.example.demo.Responses;

public class ReturnResponse {
    private boolean success;
    private String message;

    public ReturnResponse(boolean isSuccess, String message) {
        this.success = isSuccess;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
