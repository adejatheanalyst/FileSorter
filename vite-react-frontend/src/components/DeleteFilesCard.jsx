import {Button, HStack, Input, Stack} from "@chakra-ui/react";
import {useState} from "react";
import {open} from "@tauri-apps/plugin-dialog";

export default function DeleteFilesCard (){
    const [deleteRequest, setDeleteRequest] = useState({sourceDir: "", keyword: ""})
    const [error, setErrors] = useState("")

    const selectFolderToDelete = async () => {
        const selected = await open({
            directory: true,
            multiple: false,
        });

        if (selected && typeof selected === 'string') {
            setDeleteRequest(prevState => ({
                ...prevState,
                sourceDir: selected
            }));
        }
    };
    const handleKeywordChange = (evt) => {
        setDeleteRequest(prevState => ({
            ...prevState,
            keyword: evt.target.value
        }))
    };
    const handleDelete = () => {
        let api = "/delete"
        let url = "http://localhost:8080/api/files"
        if(deleteRequest.keyword != null || deleteRequest.keyword !== undefined )
            url += api;
        fetch(url,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deleteRequest)
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application.json')) {
                        response.json().then(response => {
                            debugger
                            setDeleteRequest([response.message || response]);
                        });
                    } else {
                        debugger
                        response.text().then(text => {
                            setDeleteRequest(text);
                        });
                    }
                } else if (!response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        response.json().then(errors => {
                            setErrors(errors.message || errors);
                        });
                    } else {
                        response.text().then(text => {
                            setErrors(text);
                        });
                    }
                }
            })

    }

    return (
        <div>
            {error.length > 0 && (
                <ul className="errors">
                {error.map(((error, index) => <li key={index}>{error}</li>))}
            </ul>
            )}
            {deleteRequest.length > 0 && <ul  className="request">
                {deleteRequest.map((request, index) => <li key={index}>{request}</li>)}
            </ul>}
            <Stack>
            <div id={"folderHelp"} className={"form-text"}>Folder to Delete or Look Through.
                <Button id="button" onClick={selectFolderToDelete} colorPalette="purple" variant="surface">
                    Select Folder
                </Button>
                <Input mt={3} name={"sourceDir"} value={deleteRequest.sourceDir} readOnly
                       placeholder="Folder to Delete"/>
            </div>
                <div>
                <p>Enter keyword for files you want to delete!</p>
            <Input type="text" class="form-control" id="folderToCreate"
                   placeholder="Outline"
                   variant="outline"
                   aria-describedby={"folderHelp"}
                   name={"keyword"} value={deleteRequest.keyword}
                   onChange={handleKeywordChange}/>
                </div>
                <Button id="button" onClick={handleDelete} colorPalette="purple" variant="surface">
                    Delete
                </Button>

            </Stack>
        </div>
    )
}