// import React, { useState, useEffect } from 'react';

function VideoPlayer({video}) {
  return (
    
        <video  className="lg:m-7 m-4 md:m-5 sm:m-6">
  <source
    src={`http://localhost:8081/videos/${video}`}
    type="video/mp4"
  />
  Your browser does not support the video tag.
</video>
    
    

  );
}
export default VideoPlayer