import { Stack, Typography } from '@mui/material'
import React from 'react'

const AddLogo = () => {
  return (
    <Stack width={'100%'} direction={'column'} spacing={2}>
        <Typography style={{color: '#75E4AA'}}>Add Logo</Typography>

        <Stack direction={'column'} backgroundColor={'#140F1F'} spacing={1} width={'100%'} justifyContent={'center'} alignItems={'center'} borderRadius={'15px'} border={'1px dashed #435475'} padding={4}>
            <Typography style={{color: '#BAC4D7'}}>Drag and Drop image, or {' '} <span style={{color: '#FF0144', textDecoration: 'underline'}}> Browse </span></Typography>
            <Typography style={{color: '#7689B0', fontSize: '13px'}}>Submit 200x200 image in .jpg or .png format</Typography>
        </Stack>
    </Stack>
  )
}

export default AddLogo