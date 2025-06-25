package com.example.javabackend.models;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class fileRequest {
    private String sourceDir;
    private String destFolderName;
    private String keyword;
    private String destDir;
    private File[] files = new File[0];

    public fileRequest(File[] files) {
        this.files = files;
    }

    public File[] getFiles() {
        return files;
    }

    public void setFiles(File[] files) {
        this.files = files;
    }

    public fileRequest(String sourceDir, String destFolderName) {
        this.sourceDir = sourceDir;
        this.destFolderName = destFolderName;
    }

    public fileRequest(String sourceDir) {
        this.sourceDir = sourceDir;
    }

    public fileRequest(String sourceDir, String destDir, String keyword) {
        this.sourceDir = sourceDir;
        this.destDir = destDir;
        this.keyword = keyword;
    }

    public fileRequest() {
    }

    public String getSourceDir() {
        return sourceDir;
    }

    public void setSourceDir(String sourceDir) {
        this.sourceDir = sourceDir;
    }

    public String getDestFolderName() {
        return destFolderName;
    }

    public void setDestFolderName(String destFolderName) {
        this.destFolderName = destFolderName;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getDestDir() {
        return destDir;
    }

    public void setDestDir(String destDir) {
        this.destDir = destDir;
    }
}
