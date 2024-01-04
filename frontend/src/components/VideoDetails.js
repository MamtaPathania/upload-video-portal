import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import {IoIosArrowRoundBack} from 'react-icons/io'
function VideoDetails() {
    const navigate=useNavigate()
  const { id } = useParams();
  console.log(id);
  const [selectedVideo, setSelectedVideo] = useState();
  console.log(selectedVideo);
  const playerRef = useRef(null);

  useEffect(() => {
    // Fetch video data for the selected video by 'id'
    fetch(`http://localhost:8081/videos/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch video data: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('API Response:', data);
        setSelectedVideo(data);
      })
      .catch((error) => {
        console.error('Error fetching video data: ', error);
      });
  }, [id]);

  return (
    <div>
        <IoIosArrowRoundBack size={40}onClick={()=>navigate('/video')} />
      <h1 className="flex justify-center items-center lg:mt-1 mt-4 lg:text-3xl underline font-serif text-4xl"> Video  </h1>
      <div className="flex justify-center items-center lg:mt-8 mt-10">
        {selectedVideo ? (
          <div className="w-full lg:w-3/4 xl:w-2/3 mb-8">
            <ReactPlayer 
              ref={playerRef}
              url={`http://localhost:8081/videos/${selectedVideo[0].video}`} // Access the video URL from the data
              controls={true}
              width="100%"
              height="100%"
            //   onProgress={handleVideoProgress}
            //   progress={selectedVideo.progress}
            />
          </div>
        ) : (
          <p>Video Not Found</p>
        )}
      </div>
    </div>
  );
}

export default VideoDetails;
