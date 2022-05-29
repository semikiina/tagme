import React from 'react'
import { Dialog, DialogTitle, DialogContent, ListItemButton, Divider, ListItemAvatar, Avatar, List, ListItemText, Typography } from '@mui/material'

const DrawerAlert = ({open,handleClose,storeList, ChangeCurrentStore}) => {



    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle sx={{textAlign:'center'}}>Change store</DialogTitle>
            <DialogContent>
                <List>
                    {
                        storeList?.map((store) => {
                            return <ListItemButton key={store._id} onClick={() => {ChangeCurrentStore(store._id); handleClose()}}>
                                <ListItemAvatar>
                                    <Avatar src={'https://tagmeapi.herokuapp.com/'+store.store_image} />
                                </ListItemAvatar>
                                <ListItemText primary={store.store_name}  />
                            </ListItemButton>
                        })
                        
                    }
                </List>
                <Divider></Divider>
                <Typography variant='subtitle2' paddingTop={2}>Sign In or Sign Up to a store <b style={{ cursor: 'pointer'}} onClick={()=>window.location.href= "../newStore"}>here</b>.</Typography>
            </DialogContent>
        </Dialog>
    )
}

export default DrawerAlert
