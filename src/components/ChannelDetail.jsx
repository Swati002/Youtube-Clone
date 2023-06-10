import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Box } from '@mui/material';
import ChannelCard from './ChannelCard';
import Videos from './Videos';

const ChannelDetail = () => {

  const {id} = useParams();
  const [channelDetail, setChannelDetail] = useState(null);

  const [videos, setVideos] = useState([]);


  useEffect(() => {
    //  The code sends a request to the API endpoint channels?part=snippet&id=${id} to fetch channel details. 
    //  The data?.items[0] is used to access the first item in the items array of the response data, with the '?' operator providing optional chaining to avoid errors if data or data.items are null or undefined.
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data)=> setChannelDetail(data?.items[0]));


    //  API request is made to fetch videos using the search endpoint with the channelId and part parameters. The response data is then stored in the videos state variable using the setVideos function. Once again, data?.itemsis used to access the first video item in the response.
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data)=> setVideos(data?.items));

  },[id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{background: 'linear-gradient(90deg, rgba(96,149,165,1) 22%, rgba(203,226,234,1) 63%, rgba(141,194,239,1) 100%, rgba(224,233,251,1) 100%)', zIndex: 10, height:'300px'}}>
        </div>
        <ChannelCard channelDetail={channelDetail} marginTop="-120px"/>
      </Box>

      <Box display="flex" p="2">
        <Box  p={2} sx={{overflowY: 'auto',height:'90vh', flex:'2', ml: {l : '100px', xl: '100px'}}}>
          <Videos videos={videos}/>
        </Box>
      </Box>
    </Box>
  )
}

export default ChannelDetail
