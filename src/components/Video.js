import React from 'react'
import Webcam from "react-webcam";
import ReactDOM from 'react-dom'
// eslint-disable-next-line
import {storage} from './fire'

const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
  
    return (
      <>
        <Webcam
            id= "webcam"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
        />
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
            <img
              src={imgSrc}
              id="image"
              alt= "profile"
          />
        )}
      </>
    );
  };
  
  ReactDOM.render(<WebcamCapture />, document.getElementById("root"));

  export default WebcamCapture
  
  // https://www.npmjs.com/package/react-webcam
  
  
 
  