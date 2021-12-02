import React from 'react'
import { Typography, Avatar, Box } from '@mui/material'

const defaultImages = {
    thumbnailImg: "https://cse416-content.s3.us-east-2.amazonaws.com/thumbnail.png",
    bannerImg: "https://cse416-content.s3.us-east-2.amazonaws.com/Banner+Image.png"
}

export default function Header({bannerImg, thumbnailImg, platformName}) {

    return (
        <Box style={{ height: "300px", position: "relative", display: "flex", alignItems: "flex-end" }}>
            <Box style={{ height: "100%", width: "100%", overflow: "hidden", position: "absolute", top: "0px", zIndex: "-1" }}>
                <img style={{ width: "100%", zIndex: "-1" }} alt='cover' src={bannerImg?bannerImg:defaultImages.bannerImg} />
            </Box>
            <Avatar alt="avatar" src={thumbnailImg?thumbnailImg:defaultImages.thumbnailImg}
                sx={{
                    height: 250,
                    width: 250,
                    border: '0.2rem solid',
                    borderColor: 'common.white',
                    marginLeft: "5%",
                    display: "relative",
                    bottom: "-30%"
                }}
                imgProps={{ style: { borderRadius: '50%' } }} />
            <Typography style={{ color: "black", fontSize: "50px", marginLeft: "30px" }}>
                {platformName}
            </Typography>

            <Box sx={{ display: "flex", alignItems: 'flex-end', position: "absolute", left: "0px", bottom: "0px", width: "100%" }}>
            </Box>
        </Box>
    )
}
