import React from "react";
import './viewFiles.css'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const ViewFiles=()=>{

    const[pdfFile,setPdfFile]=React.useState(null);
    const[viewPdf,setViewPdf]=React.useState(null);

    const fileType=['application/pdf']
    const handleChange = (e) => {
        let selectedFile = e.target.files[0]
        if(selectedFile) {
            if(selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader()
                reader.readAsDataURL(selectedFile)
                reader.onload =(e)=>{
                setPdfFile(e.target.result)
                }
            }
            else{ 
                setPdfFile(null)
            }
        }
        else{
            console.log("select pdf");
        }
    }

    const handleSubmit = (e) =>{
            e.preventDefault();
            if(pdfFile !== null) {
            setViewPdf(pdfFile);
            }
            else {
            setViewPdf(null);
            }
    }
    const newplugin=defaultLayoutPlugin();
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" className="form-control" onChange={handleChange}/>
                <br/>
                <button type="submit">
                    View PDF
                </button>
            </form>
            <h2>PDF : </h2>
            <div className="pdf-container">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                {viewPdf && <>
                    <Viewer fileUrl={viewPdf} plugins={[newplugin]}/>
                </>}
                {!viewPdf && <>No PDF</>}
            </Worker>;
            </div>
        </div>
        
    )
} 
export default ViewFiles;
//SIDE-SIDE VIEW
{/* <Box
sx={{
		display: "flex",
flexDirection: "row",
scrollBehavior: "smooth",
scrollbarWidth: "10px",
overflowY: "scroll",
justifyContent: "space-between"
	}}>
<Box sx={{width:"50%",mt:"8rem",ml:"2rem"}}><ViewFiles/></Box>
<Box  sx={{width:"50%",mt:"8rem",ml:"2rem"}}><ViewFiles/></Box>
</Box> */}