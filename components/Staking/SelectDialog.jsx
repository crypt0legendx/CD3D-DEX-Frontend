import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@material-ui/core";
import {Stack, Typography} from "@mui/material";


import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles({
  dialog: {
    "& .MuiPaper-root": {
    background: 'transparent',
      width: "450px",
      height: "650px",
    },
  },
});

const SelectDialog = (props) => {
  const { children, onClose, ...other } = props;
  const classes = useStyles();

  const searchHandler = () =>{
      
  }

  return (
    <Dialog className={classes.dialog} sx={{ m: 0, p: 2 }} {...other}>
      <DialogTitle sx={{color: '#75E4AA'}}>
        Select Token
        {/* {children} */}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: '#75E4AA',
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>

      <Stack direction={"column"} width={"100%"} padding={2}>
        <Stack
          sx={{
            width: '100%',
            flexDirection: 'row',
            backgroundColor: '#1B132F',
            borderRadius: '10px',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 , color: '#435475'}}
            placeholder="Enter the token symbol or address"
            onChange={searchHandler}
            // inputProps={{ "aria-label": "Enter the token symbol or address" }}
          />
          <IconButton type="submit" sx={{ p: "6px", backgroundColor: '#800022', margin: '6px', borderRadius: '10px' }} aria-label="search">
            <SearchIcon sx={{color: 'white'}}/>
          </IconButton>
        </Stack>

        <Stack direction={'column'} width={'100%'}>
          <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} padding={4} color={'white'}>
                <Typography>ETH</Typography>
                <Typography>Ether</Typography>
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} padding={4} color={'white'}>
                <Typography>ETH</Typography>
                <Typography>Ether</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default SelectDialog;
