
import reactLogo from './assets/react.svg'

import './App.css'
import './components/FileRequestCard.jsx'
import FileRequestCard from "./components/FileRequestCard.jsx";
import {Flex, Icon} from "@chakra-ui/react";
import DeleteFilesCard from "@/components/DeleteFilesCard.jsx";
import {  defineConfig } from "@chakra-ui/react"

function App() {
  return (
    <>
      <div>
        <Icon href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo"  />
        </Icon>
      </div>
      <h1>File Sorter!</h1>

        <Flex gap="4" justify={"center"}>
            <div className="card">
                <FileRequestCard />
            </div>
            <div className="card">
                <DeleteFilesCard />
            </div>
        </Flex>
    </>
  )
}

export default App
