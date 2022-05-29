import React, { useState , useEffect} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography, Box , ButtonGroup, Chip, ListItem, ListItemText, IconButton} from '@mui/material'
import { Close } from '@mui/icons-material';
import useAuth from '../../Contexts/useAuth';


const AddToCartDialog = ({open, handleClose, product, onAddToCart}) => {

    const{user} = useAuth();
    
    const[prQuantity, setPrQuantity] = useState(1);

    const [currentComb, setCurrentComb] = useState([]);

    const [skuid, setSkuid] = useState("");

    const [currentProductPrice, setCurrentProductPrice] = useState(1);

    const GetCombination = (val,index)=>{

        let newArr = [...currentComb]; 
        newArr[index] = val; 

        setCurrentComb(newArr);

    }

    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(()=>{
       
        setCartQuantity(0)
        if(skuid){
            console.log('ola')
            var result = user.cart?.items?.filter(obj => {
                console.log(obj)
                return obj.skuid === skuid
            })
            if(result.length) setCartQuantity(result[0]?.quantity)
            else ( setCartQuantity(0))
        }
        else{
            var result = user.cart?.items?.filter(obj => {
                console.log(obj)
                return obj.product_id._id === product._id
            })
            if(result?.length) setCartQuantity(result[0]?.quantity)
            else ( setCartQuantity(0))
        }
      
        
    },[skuid,product])

    useEffect(()=>{

        var newComb = "";

        currentComb.forEach((comb, x)=>{
            if(x < currentComb.length - 1)
            newComb += comb+"?";
            else newComb += comb
        })

        setSkuid(newComb)

        var result = product.variants?.prices?.filter(obj => {
            return obj.skuid === newComb
          })
        
        if(result) {

            setCurrentProductPrice(result[0])
        }
        
    },[currentComb])

    return (
        <Dialog open={open == product._id} onClose={handleClose}  fullWidth={true} maxWidth={'sm'}>
            <DialogTitle> 
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
                    {"Choose your options"}
                    <IconButton onClick={handleClose} sx={{p:0}} disableRipple>
                        <Close/>
                    </IconButton>
                </Stack>
                

            </DialogTitle>
                <DialogContent>
                    <Box padding={2}>
                        <Stack  spacing={2} alignItems={'center'}>
                            <img 
                                src={'https://tagmeapi.herokuapp.com/'+product.images[0]}
                                style={{objectFit:'cover',maxWidth: 350,maxHeight: 350 }}
                                alt={product.title} 
                            />
                            <Box>
                                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} marginBottom={2}>
                                    <ListItem disablePadding>
                                        <ListItemText primary={product.title} secondary={product.category}/>
                                    </ListItem>
                                    <Typography variant="h6">{currentProductPrice?.originalPrice || product.basePrice?.toFixed(2)}€</Typography>
                                </Stack>
                                
                               { product.variants.length ?
                                   <>
                                        <Box marginBottom={2}>
                                            {
                                                product.variants?.options?.map((item,index)=>{
                                                    return (
                                                        <div key={index}>
                                                            <Typography padding={1}>{item.name}</Typography>
                                                            {
                                                                item.values.map((val,ii) =>{
                                                                    
                                                                    return <Chip color="primary" label={val} key={ii} variant={ currentComb[index] == val ? "contained" : "outlined"} onClick={() => GetCombination(val, index)} />
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Box>
                                        <Stack direction="row" spacing={2} marginTop={1} alignItems={'center'}>
                                        { 
                                            (currentProductPrice?.availableQuantity > 0 && cartQuantity < currentProductPrice?.availableQuantity)
                                            ?    <>
                                                <ButtonGroup  disableElevation >
                                                    <Button variant="contained" color="info" disabled={prQuantity>1 ? false : true } onClick={()=>setPrQuantity(prQuantity-1)}>-</Button>
                                                    <Button disabled>{prQuantity}</Button>
                                                    <Button variant="contained" color="info" disabled={prQuantity < currentProductPrice.availableQuantity ? false : true} onClick={()=>setPrQuantity(prQuantity+1)} >+</Button>
                                                </ButtonGroup>
                                                <Button variant="outlined" color="secondary" fullWidth onClick={()=> {onAddToCart(product._id,prQuantity, skuid);handleClose() }}>Add to cart</Button>
                                                </>
                                            : <Button disabled variant="contained" color="secondary" fullWidth>This product is sould out.</Button>
                                        }
                                        </Stack>
                                    </>
                                    :  <Stack direction="row" spacing={2} marginTop={1} alignItems={'center'}>
                                    { 
                                        (product?.stock > 0 && cartQuantity < product?.stock)
                                        ?    <>
                                            <ButtonGroup  disableElevation >
                                                <Button variant="contained" color="info" disabled={prQuantity>1 ? false : true } onClick={()=>setPrQuantity(prQuantity-1)}>-</Button>
                                                <Button disabled>{prQuantity}</Button>
                                                <Button variant="contained" color="info" disabled={prQuantity < product?.stock ? false : true} onClick={()=>setPrQuantity(prQuantity+1)} >+</Button>
                                            </ButtonGroup>
                                            <Button variant="outlined" color="secondary" fullWidth onClick={()=> {onAddToCart(product._id,prQuantity, "default");handleClose() }}>Add to cart</Button>
                                            </>
                                        : <Button disabled variant="contained" color="secondary" fullWidth>This product is sould out.</Button>
                                    }
                                    </Stack>
                                }
                            </Box>
                            
                        </Stack>
                    </Box>
                </DialogContent>
        </Dialog>
    )
}

export default AddToCartDialog
