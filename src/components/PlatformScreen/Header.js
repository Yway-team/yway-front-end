import React from 'react'
import { Typography, Avatar, Stack, Box, Button, Divider } from '@mui/material';
import { ReactComponent as Decor } from '../../images/platformDecor.svg';
import FavoriteButton from './FavoriteButton';
import { ReactComponent as LogoIcon } from '../../images/logoIconColorless.svg';
import { Settings, FavoriteRounded, HelpOutlineOutlined } from '@mui/icons-material';
import { useParams, useHistory } from 'react-router-dom';


const defaultImages = {
    thumbnailImg: "https://cse416-content.s3.us-east-2.amazonaws.com/thumbnail.png",
    bannerImg: "https://cse416-content.s3.us-east-2.amazonaws.com/Banner+Image.png"
}

export default function Header({
    bannerImg,
    thumbnailImg,
    platformName,
    favorites,
    numQuestions,
    numQuizzes,
    description,
    tags,
    id,
    color }) {

    const history = useHistory()
    color = color === '' || !color ? '#ff5a1d' : color;
    return (



        // <Box style={{ height: "300px", position: "relative", display: "flex", alignItems: "flex-end" }}>
        //     <Box style={{ height: "150px", width: "100%", overflow: "hidden", position: "absolute", top: "0px", zIndex: "-1" }}>
        //         <img style={{ width: "100%", zIndex: "-1" }} alt='cover' src={bannerImg ? bannerImg : defaultImages.bannerImg} />
        //     </Box>
        //     <Avatar alt="avatar" src={thumbnailImg ? thumbnailImg : defaultImages.thumbnailImg} */}
        //         sx={{ 
        //             height: 250,
        //             width: 250,
        //             border: '0.2rem solid',
        //             borderColor: 'common.white',
        //             marginLeft: "5%",
        //             display: "relative",
        //             bottom: "-30%"
        //         }}
        //         imgProps={{ style: { borderRadius: '50%' } }} />
        //     <Typography style={{ color: "black", fontSize: "50px", marginLeft: "30px" }}>
        //         {platformName}
        //     </Typography>

        //     <Box sx={{ display: "flex", alignItems: 'flex-end', position: "absolute", left: "0px", bottom: "0px", width: "100%" }}>
        //     </Box>
        // </Box>
        <>
            <Box Box sx={{ height: "120px", width: "100%", overflow: "hidden" }}>
                <img style={{ width: "100%", zIndex: "-1", objectPosition: '20% 100%' }} alt='cover' src={bannerImg ? bannerImg : defaultImages.bannerImg} />
            </Box>

            <Box sx={{ position: 'relative', width: '100%' }}>
                <Decor fill={color} sx={{ positon: 'absolute', left: 0, top: 0, zIndex: 1 }} />
                <Stack direction='row' alignItems='flex-start' justifyContent='flex-start'
                    sx={{ width: '100%', position: 'absolute', left: 0, top: 0, pt: 2, }} >
                    <Avatar alt="avatar" src={thumbnailImg ? thumbnailImg : defaultImages.thumbnailImg}
                        sx={{
                            height: 100,
                            width: 100,
                            border: 'solid 2px',
                            borderColor: 'grey.200',
                            ml: 7,
                        }}
                    />
                    <Stack direction='column' ml={5} mt={3} width='100%'>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <Typography sx={{
                                fontWeight: 700,
                                fontSize: 25,
                                color: 'common.black'
                            }}>
                                {platformName}
                            </Typography>
                            <Stack direction='row' alignItems='center' mr={5}>
                                <Button variant="text" startIcon={<Settings />} sx={{ mr: 4 }}
                                onClick={()=>history.push(`/platformSettings/${platformName}`)}
                                >
                                    Settings
                                </Button>
                                <FavoriteButton _id={id} title={platformName}/>
                            </Stack>
                        </Stack>
                        <Stack direction='row' justifyContent='flex-start' alignItems='center' flexGrow={1} mt={1} spacing={0} >
                            <FavoriteRounded sx={{ fill: color, height: 12, width: 12 }} />
                            <Typography sx={{ fontSize: 15, ml: 1, fontWeight: 500, color: 'grey.600' }}> {favorites} favorites</Typography>
                            <LogoIcon fill={color} style={{ height: 12, width: 12, marginLeft: 40 }} />
                            <Typography sx={{ fontSize: 15, ml: 1, fontWeight: 500, color: 'grey.600' }}> {numQuizzes} quizzes</Typography>
                            <HelpOutlineOutlined style={{ height: 15, width: 15, marginLeft: 40, fill: color }} />
                            <Typography sx={{ fontSize: 15, ml: 1, fontWeight: 500, color: 'grey.600' }}> {numQuestions} questions</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'grey.600', mt: 1 }}> {description} </Typography>
                    </Stack>
                </Stack>
            </Box>
            <Divider flexItem sx={{ mt: 3 }} />
        </>
    )
}
