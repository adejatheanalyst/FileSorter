import {Button, Flex, HStack, Input, Stack} from "@chakra-ui/react";
import {useState} from "react";
import { open } from '@tauri-apps/plugin-dialog';

export default function FileRequestCard(){
    const [createFolderRequest, setCreateFolderRequest] = useState(
        {sourceDir:"", destFolderName: ""});
    const [errors, setErrors] = useState([])
    const[request, setRequest] = useState({
        sourceDir:'',
        destDir:'',
        keyword:''
    })
    // function to create a folder
    const handleCreateFolder = () =>{
        fetch("http://localhost:8080/api/files",{ // api call to backend using fetch
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createFolderRequest)
        })
        .then(response => {
            if(response.ok) {
                response.json().then(folderName => {
                    setCreateFolderRequest(folderName)
                })
            }else{
                    response.json().then(errors =>{
                        console.log(errors)
                        setErrors(errors)
                    })
                }
            })
    }
    const handleCreateChange = (evt) => {
        setCreateFolderRequest(prevState => ({
            ...prevState,
            destFolderName: evt.target.value
        }));
    };


        const handleKeywordChange = (evt) => {
            setRequest(prevState => ({
                ...prevState,
                keyword: evt.target.value
            }))
        };


        const selectFolder = async () => {
            const selected = await open({
                directory: true,
                multiple: false,
            });

            if (selected && typeof selected === 'string') {
                setCreateFolderRequest(prevState => ({
                    ...prevState,
                    sourceDir: selected
                }));

                setRequest(prevState => ({
                    ...prevState,
                    sourceDir: selected
                }))
            }
        };
        const selectFolderToMove = async () => {
            const selected = await open({
                directory: true,
                multiple: false,
            });

            if (selected && typeof selected === 'string') {
                setRequest(prevState => ({
                    ...prevState
                    , destDir: selected
                }))
            }
        };

        function handleSubmit(evt) {
            evt.preventDefault()
            fetch("http://localhost:8080/api/files", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            })
                .then(response => {
                    if (response.ok) {
                        response.json().then(request => {
                            console.log(request)
                            setRequest(request)
                        })
                    } else {
                        response.json().then(error => {
                            console.log(error)
                            setErrors(error)
                        })
                    }
                })
        }

        return (
            <div>
                {errors.length > 0 && <ul id ="errors" class="errors">
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>}
                {request.length > 0 && <ul id ="request" class="request">
                    {request.map(requests => <li key={requests}>{requests}</li>)}
                </ul>}
                <form onSubmit={handleSubmit}>
                    <div class={"mb-3"}>
                        <div id={"folderHelp"} className={"form-text"}>Select Folder to Organize.
                        </div>
                        <Button id="button" onClick={selectFolder} colorPalette="purple" variant="surface">
                            Select Folder
                        </Button>
                        <Input mt={3} name={"sourceDir"} value={createFolderRequest.sourceDir} readOnly
                               placeholder="Selected folder path"/>
                        {createFolderRequest.length > 0 && <ul id ="request" class="request">
                            {createFolderRequest.map(requests => <li key={requests}>{requests}</li>)}
                        </ul>}
                    </div>
                    <label htmlFor="folderToCreate" className={"form-label"}> Enter Folder name to Create</label>
                    <HStack>
                        <Input type="text" class="form-control" id="folderToCreate"
                               placeholder="Outline"
                               variant="outline"
                               aria-describedby={"folderHelp"}
                               name={"destFolderName"} value={createFolderRequest.destFolderName}
                               onChange={handleCreateChange}/>
                        <Button size={"xs"} colorPalette="purple" variant="surface"
                                onClick={handleCreateFolder}>Create</Button>
                    </HStack>
                    <div>
                        <p>Enter Keyword of files you want to move.</p>
                        <div>Keyword: filename, .jpg, .exe, etc</div>
                        <Flex gap={"4"} direction={"column"}>
                            <Input placeholder="Outline" variant="outline" aria-describedby={"folderHelp"}
                                   name={"keyword"} value={request.keyword} onChange={handleKeywordChange}/>
                            <div id={"folderHelp"} className={"form-text"}>Move files here.
                                <Button onClick={selectFolderToMove} colorPalette="purple" variant="surface">
                                    Select Folder
                                </Button>
                                <Input mt={3} name={"destDir"} value={request.destDir} readOnly
                                       placeholder="Move files here"/>
                            </div>
                            <Button  id="button" type={"submit"} colorPalette="purple" variant="surface">
                                Move files
                            </Button>
                        </Flex>
                    </div>

                </form>
            </div>
        )
}