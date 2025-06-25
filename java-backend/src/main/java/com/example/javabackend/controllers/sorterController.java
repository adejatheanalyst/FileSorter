package com.example.javabackend.controllers;

import com.example.javabackend.domain.FileSorterService;
import com.example.javabackend.domain.Result;
import com.example.javabackend.models.fileRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/files")
public class sorterController {
    private final FileSorterService fileSorterService;


    public sorterController(FileSorterService fileSorterService) {
        this.fileSorterService = fileSorterService;
    }

    @PostMapping
    public ResponseEntity<?> createFolder(@RequestBody fileRequest request) throws IOException {

        System.out.printf("SourceDir: %s\n", request.getSourceDir());
        System.out.println("DestFolderName: " + request.getDestFolderName());

        File chosenFolder = new File(request.getSourceDir());
        String chosenFolderName = request.getDestFolderName();
        Result result = fileSorterService.createFolder(chosenFolder, chosenFolderName);
        if(result.isSuccess()){
            System.out.println(result.getMessage());
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);

    }
    @DeleteMapping
    public ResponseEntity<?> deleteFolder(@RequestBody fileRequest sourceDir) throws IOException {
        System.out.println("SourceDir: " + sourceDir.getSourceDir());
        File chosenFolder = new File(sourceDir.getSourceDir());
        Result result = new Result<>();
       boolean isDeleted =  fileSorterService.deleteDirectory(chosenFolder);
       if(isDeleted){
           result.setMessage("Folder deleted successfully");
           result.setSuccess(true);
       }
        System.out.println(result.getMessage());
       if(result.isSuccess()){
           return new ResponseEntity<>(result, HttpStatus.OK);
       }
       return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFiles(@RequestBody fileRequest files) throws IOException {
        System.out.println("sourceDir: " + files.getSourceDir());
        System.out.println("keyword: " + files.getKeyword());
        File chosenFolder = new File(files.getSourceDir());
        String keyword = files.getKeyword();
        Result result =  fileSorterService.deleteFiles(chosenFolder, keyword);
        if(result.isSuccess()){
            System.out.println(result.getMessage());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }


    @PutMapping
    public ResponseEntity<?> updateFolder(@RequestBody fileRequest request) throws IOException {
        System.out.println("SourceDir: " + request.getSourceDir());
        System.out.println("DestDirectory " + request.getDestDir());
        System.out.println("Keyword: " + request.getKeyword());
        File chosenFolder = new File(request.getSourceDir());
        File chosenDir = new File(request.getDestDir());
        String keywordInput = request.getKeyword();
        Result result = fileSorterService.movefiles(chosenFolder,chosenDir, keywordInput);
        if(result.isSuccess()){
            System.out.println(result.getMessage());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
}
