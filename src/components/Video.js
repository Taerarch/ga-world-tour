import React from 'react'
import Webcam from "react-webcam";
import ReactDOM from 'react-dom'
import {storage} from './fire'

const WebcamCapture = (props) => {

  const webcamRef = React.useRef(null);
  const [url, setUrl] = React.useState("");

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc !== null){
      const uploadTask = storage.ref(`images/${props.user.uid}`);
      uploadTask.putString(imageSrc.split("").slice(23).join(""),"base64");
    }
    
  };

  
  const download = () => {
    const downloadTask = storage.ref(`images/${props.user.uid}`);
    if (downloadTask !== null){
      downloadTask.getDownloadURL().then((dlUrl)=>{
        setUrl(dlUrl)
        //grap a refcence to the user and attach to him
      })
    }
  }

  const refreshPage = () =>{
    window.location.reload(false);
  }

  return (
    <>
      <Webcam
          id= "webcam"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
      <button onClick={download}>Get photo</button>
      <button onClick={refreshPage}>Click to reload!</button>
      
      <img
        src={url || "http://via.placeholder.com/300"}
        id="image"
        alt= "profile"
      />
      
    </>
    );
  };
  
  ReactDOM.render(<WebcamCapture />, document.getElementById("root"));

  export default WebcamCapture
