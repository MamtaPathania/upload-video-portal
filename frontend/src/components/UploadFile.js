

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import VideoPlayer from './VideoPlayer'
import {BsCloudUpload} from 'react-icons/bs'
import {AiFillPlayCircle} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
function UploadFile() {
  const navigate=useNavigate()
    const [file,setFile]=useState()
    const[videos,setVideos]=useState([])
    // console.log("file:",file)
    const handleChange=(e)=>{
         setFile(e.target.files[0])
         
    }
    useEffect(()=>{
        axios.get('http://localhost:8081/videos')
        // .then(res=>console.log(res.data))
        .then(res=>{
          console.log('Response data:', res.data); // Add this line for debugging

          setVideos(res.data)})

        .catch(err=>console.log(err))
    },[])
    const handleUpload=()=>{
      if (!file) {
        alert('Please select a video file to upload.');
        return;
      }
        const formdata=new FormData();
        formdata.append('video',file);
        axios.post('http://localhost:8081/upload',formdata)
        .then(res=>{
            if(res.data.status === "success"){
                alert("uploaded successfully")
                console.log("succeded")
            }else{
                console.log("failed")
            }
        })
        .catch(err=>console.log(err))
    }
  
    const handleClick=(id)=>{
   navigate(`/video/${id}`)
    }
  return (
    <>
    <div className='fixed top-0 right-0 left-0 z-10 flex justify-between bg-gray-700 text-white p-2'>
    <h1 className='font-serif mt-4 mb-4 flex items-center gap-32 px-3 text-4xl'>Video Upload</h1>
    <div className="flex items-center ">
    <BsCloudUpload size={50}/>
    </div>
    </div>
         
    <div className='flex justify-center items-center overflow-hidden mt-16 md:mt-18 lg:mt-24'>
    <div className='flex flex-col text-gray-300 outline-dashed outline-2 outline-offset-2 ... lg:m-8 m-16 md:m-12 md:w-[450px] h-[400px] w-[300px] lg:h-[400px] lg:w-[600px] rounded-2xl p-16'>
      <h1 className='text-gray-700 text-5xl text-center font-sans font-bold '>Send A Video</h1>

      <p className='text-center text-black lg:mt-8 mt-4 md:mt-5'>
       Select a file to Upload your videos...
      </p>
        
      <div className='flex justify-center items-center lg:ml-24 mt-8'>
      <input type="file" name="video" accept=".mp4" onChange={handleChange} />
      </div>

      <div className='flex justify-center items-center'>
      <button onClick={handleUpload} className=' mt-5 bg-cyan-500 rounded-full lg:mt-7 lg:p-2 text-white w-[300px] h-[55px] lg:w-[250px] lg:h-[60px] font-bold flex items-center justify-center'>
    <BsCloudUpload size={40} className="lg:mr-2 m-2 lg:p-2 md:p-3 p-1 text-cyan-500 bg-white rounded-full" /> {/* Add the icon and adjust the spacing with "mr-2" */}
    Upload Your Video
    </button>
    </div>

    </div>
    </div>


<div className='m-4 lg:m-8'>
  <h1 className='lg:ml-8 ml-2 md:ml-12 text-3xl lg:mt-8 mt-2 underline'>All Videos</h1>
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    {videos.map((video, index) => (
      <div key={index} className="group lg:w-84 lg:h-64 relative overflow-hidden transition-transform transform scale-100 hover:scale-105">
        <VideoPlayer video = {video.video}/>
        <div 
        onClick={()=>handleClick(video.id)}
        className="absolute inset-0 flex justify-center items-center bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
          <AiFillPlayCircle size={60} 
            color="black"
            onClick={()=>handleClick(video.id)}/>
        </div>
        
      </div>
    ))}
  </div>
</div>
<div className='mt-12'><p className='text-3xl lg:text-4xl md:text-5xl fixed bottom-0 right-0 left-0 z-10 bg-gray-700 h-[10px] w-full'></p>
</div>
    </>
    
  )
}

export default UploadFile
