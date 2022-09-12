import { CheckCircle } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player';
import { useParams, Link } from 'react-router-dom';
import {fetchFromAPI} from '../utils/fetchFromAPI'

import { Videos } from './';

const VideoDetail = () => { 

  const [videoDetail, setVideoDetail] = useState(null);

  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {
      fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then(data => setVideoDetail(data.items[0]));

      fetchFromAPI(`search?part=snippet&type=video&relatedToVideoId=${id}`)
      .then(data => setVideos(data.items))

  }, [id]);

  if (!videoDetail?.snippet) return 'Loading...';

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer 
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              className="react-player"
            />

            <Typography fontWeight="bold" variant="h5" p={2} color="#fff">
                {title}
            </Typography>

            <Stack 
              direction="row" 
              justifyContent="space-between" 
              sx={{ color: '#fff' }}
              py={1}
              px={2}
            >

            <Link to={`channel/${channelId}`}>
              <Typography variant={{ sm: 'subtitle1', md: 'h6' }} color="#fff">
                 {channelTitle}
                 
                 <CheckCircle sx={{
                    fontSize: '12px',
                    color: 'gray',
                    ml: '5px'
                 }} />

              </Typography>
            </Link>

            <Stack direction="row" gap="20px">

              <Typography variant="body1" color="gray">
                {parseInt(viewCount).toLocaleString()} views
              </Typography>

              <Typography variant="body1" color="gray">
                {parseInt(likeCount).toLocaleString()} likes
              </Typography>

            </Stack>

            </Stack>

          </Box>
        
        </Box>

{/* Related Videos */}
        
        <Box px={2} py={{md: 1, xs: 5}} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column" />
        </Box>

      </Stack>
    </Box>
  )
}

export default VideoDetail