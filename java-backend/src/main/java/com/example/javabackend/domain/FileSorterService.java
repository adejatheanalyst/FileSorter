package com.example.javabackend.domain;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
//create folder
//find files by key word or file extension
// find folder by file path
@Service
public  class FileSorterService{


public Result createFolder(File sourceDir, String destFolderName){
    Result result = new Result();
    File destDir = new File(sourceDir, destFolderName);
    if(sourceDir == null || destDir == null){
        result.setMessage("Source and Destination Folder Are Null");
        result.setSuccess(false);
        return result;
    }

    if(!destDir.exists()){
        boolean created = destDir.mkdir();
        if(!created){
            result.setMessage("Folder creation failed");
            System.out.print("Could not create folder.");
            return null;
        }
    }else{
        result.setMessage("Folder already exists");
        result.setSuccess(false);
        return result;
    }
    result.setMessage("Folder created");
    result.setSuccess(true);
    return result;
}
    public Result deleteFiles(File sourceDir, String search) {
        Result result = new Result();
        search = search.toLowerCase();
        File[] files = sourceDir.listFiles();
        if (files == null) {
            result.setMessage("No files found in this folder");
            result.setSuccess(false);
            System.out.println("No files found in this folder");
            return result;
        }
        int deleteCount = 0;
        for (File file : files) {
            String fileName = file.getName().toLowerCase();
            if (file.isFile() && fileName.contains(search)) {
                file.delete();
                deleteCount++;
            }
        }
        result.setMessage("Deleted " + deleteCount + " files");
        result.setSuccess(true);
        result.setData(deleteCount);
        return result;
    }

public boolean deleteDirectory(File sourceDir){
    if(sourceDir.isDirectory()){
        File[] children = sourceDir.listFiles();
        if(children != null){
            for(File child : children){
                deleteDirectory(child);
            }
        }
        System.out.println("Folder was deleted successfully!");
    }
    return sourceDir.delete();
}


public Result movefiles(File sourceDir, File destDir, String search) {
    Result result = new Result();
    search = search.toLowerCase();

    File[] files = sourceDir.listFiles();
    if (files == null) {
        result.setMessage("No files found");
        result.setSuccess(false);
        System.out.println("Error reading files in the source directory");
        return result;
    }
    int movedCount = 0;
    for (File file : files) {
        String fileName = file.getName().toLowerCase();
        if (file.isFile() && fileName.contains(search))
            try {
                File destFile = new File(destDir, file.getName());
                Files.move(file.toPath(), destFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
                movedCount++;
            } catch (IOException e) {
                result.setMessage("Error moving file");
                result.setSuccess(false);
                System.out.println("Could not move file: " + file.getName());
                e.printStackTrace();
            }
    }
    result.setMessage("Moved " + movedCount + " files");
    result.setSuccess(true);
    result.setData(movedCount);
           return result;
}




}