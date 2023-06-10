import { Box, Stack } from '@mui/material';
import React from 'react'
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

const Videos = ({videos, direction}) => {

  if(!videos?.length) return 'Loading...';

  // console.log(videos);
  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" gap={2}>

      {videos.map((item, idx) => (
        <Box key = {idx}>
        {/* item can be either video or channel, we have to display video and channel cards accordingly */} 
        {/* item.id.videoId  ==> if item id is video id then we get video card  */}
          {item.id.videoId && <VideoCard video={item}/>}
          {item.id.channelId && <ChannelCard channelDetail={item}/>}
        </Box>
      ))}

    </Stack>
  )
}

export default Videos

