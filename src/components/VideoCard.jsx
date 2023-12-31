import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Card, CardContent, CardMedia } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle,demoChannelUrl, demoChannelTitle } from '../utils/contants'
const  VideoCard = ({video:{id:{videoId}, snippet}}) => { 
  // {video:{id:{videoId}, snippet}} -> represent a structure with information about a video, including its ID and additional details stored under the snippet key. 
  return (
    <Card  sx={{width:{md:'340px', xs:'100%'}  ,boxShadow:'none', borderRadius:'0'}}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia image={snippet?.thumbnails?.high?.url}
          alt={snippet?.title}
          sx={{width:358, height:180}}
        />
      </Link>

      <CardContent sx={{backgroundColor: '#1e1e1e', height: '106px', width:'326px'}}>
      
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography variant='subtitle1' fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0,60) || demoVideoTitle.slice(0,60)}
          </Typography>
        </Link>

        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
          <Typography variant='subtitle2' fontWeight="bold" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{fontSize:12, color:'gray', ml:'5px'}}/>
          </Typography>
        </Link>

      </CardContent>
    </Card>
  )  
}

export default VideoCard
