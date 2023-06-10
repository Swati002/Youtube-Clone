import React from 'react'
import { useState, useEffect } from 'react'
import {Box, Stack, Typography} from '@mui/material'
import Sidebar from './Sidebar'
import Videos from './Videos'
import {fetchFromAPI} from '../utils/fetchFromAPI'

// flexDirection:{sx:"column", md:"row"  flexdirection is col for small devices and row for others
const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState ('New');

  const [videos, setVideos] = useState([]);


  /* whenever the selectedCategory value changes, the code below fetches  the data from an API based on the selected category and updates the state of the component with the received video items. */
  useEffect(() => {
    const data = fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data)=>setVideos(data.items))
  }, [selectedCategory]);
  
  return (
    <Stack sx={{flexDirection:{sx:"column", md:"row"}}}>

      <Box sx={{height:{sx:'auto', md:'92vh'}, borderRight:'1px solid #3d3d3d', px: {sx:'0', md:'2' }}}>

         
      <Sidebar 
        selectedCategory = {selectedCategory}
        setSelectedCategory = {setSelectedCategory}
      />

      <Typography className='copyright' variant='body2' sx={{mt:1.5, color:'#fff'}}>
        Copyright @ 2023 Swati Goel
      </Typography>
      </Box>

      <Box p={2} sx={{overflowY: 'auto',height:'90vh', flex:'2', ml: {l : '100px', xl: '100px'}}}>
        
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{color:'white'}}>
        {selectedCategory} <span style={{color:'#F31503'}}>
            videos
          </span>
        </Typography>

        <Videos videos={videos}/>

      </Box>

    </Stack>
  )
}

export default Feed
