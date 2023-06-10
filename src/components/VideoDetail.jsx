import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import {Box, Typography, Stack} from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import Videos from './Videos'
import {fetchFromAPI} from '../utils/fetchFromAPI'

const VideoDetail = () => {

  const [VideoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);

  const {id} = useParams();

  useEffect(()=>{

    // first first from api is to fetch video displayed on lhs while second fetch api is to fetch right sidebar recommended videos
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => setVideoDetail(data.items[0]));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data) => setVideos(data.items));

  },[id]);
   
  if(!VideoDetail?.snippet) return 'Loading...';

  // const {snippet} = VideoDetail;
  // snippet = videoDetail.snippet (destructring)

  const {snippet : {title, channelId, channelTitle}, statistics:{viewCount, likeCount}} = VideoDetail; 
  //=> title = videoDetail.snippet.title
  //=> viewCount = videoDetail.statistics.viewCount


  return (
    <Box minHeight="95vh">
      <Stack direction={{xs: 'column', md:'row'}}>
      <Box flex={1}>
        <Box sx={{width:'100%', position:'sticky', top:'86px'}}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls/>
          <Typography variant='h5' fontWeight="bold" p={2} color="#FFF">
            {/* {VideoDetail.snippet.title} */}
            {/* {snippet.title} */}
            {title}
          </Typography>

          <Stack direction="row" justifyContent="space-between" sx={{color:"#fff"}} py={1} px={2}>
            <Link to={`/channel/${channelId}`}>
            <Typography width= "100%" variant={{sm:'subtitle1', md:'h6'}}  color='#fff'>
              {channelTitle}
              <CheckCircle sx={{fontSize:12, color:'gray', ml:'5px'}}/>
            </Typography>
            </Link>

            <Stack direction="row" gap="20px" alignItems="center">

              <Typography variant="body1" sx={{opacity:0.7}}>
              {parseInt(viewCount).toLocaleString()}  Views
              </Typography>

              <Typography variant="body1" sx={{opacity:0.7}}>
              {parseInt(likeCount).toLocaleString()}  Likes
              </Typography>

            </Stack>

          </Stack>

        </Box>
      </Box>


      {/* right side recommended videos */}

      {/* <Box px={2} py={{md:1, xs:5}} justifyContent="center" alignItems="center" >
      
        <Videos videos={videos} direction="column"/> 
      
      </Box> */}

      </Stack>
    </Box>
  )
}

export default VideoDetail
