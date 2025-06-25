package com.example.javabackend.domain;

import java.util.ArrayList;

public class Result<T> {
    private boolean success;
    private final ArrayList<String> messages = new ArrayList<>();
    String message;
    private T data;
    Result(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public Result() {
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

    public ArrayList<String> getMessages() {
        return messages;
    }
    public void addMessage(String messages) {
        this.messages.add(messages);
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
