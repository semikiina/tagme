import React, { useState } from 'react'
import {Grid, Container, Paper, Typography, Stack, Box, Select, MenuItem, FormControl, InputLabel, Button, Checkbox, OutlinedInput, ListItemText} from '@mui/material';

const Filters = ({SortProducts, setFilter , categorys, setDefProducts, defProducts, filter, order}) => {

    const [filterCategory, setFilterCategory] = useState([]);


    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setFilterCategory(
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    return (
        <>
            <Stack padding={2} spacing={2} direction="row">
                
                <FormControl  size="small">
                    <InputLabel id="orderbyid">Order By</InputLabel>
                    <Select
                        labelId="orderbyid"
                        label="Order By"
                        value={order}
                        onChange={SortProducts}
                        >
                        <MenuItem value={1}>Recommended</MenuItem>
                        <MenuItem value={2}>Price Low to High</MenuItem>
                        <MenuItem value={3}>Price High to Low</MenuItem>
                        <MenuItem value={4}>New Arrivals</MenuItem>
                    </Select>
                </FormControl>
                <FormControl  sx={{ m: 1, width: 300 }}  size="small">
                    <InputLabel id="categoryid">Category</InputLabel>
                    <Select
                        labelId="categoryid"
                        label="Category"
                        multiple
                        value={filterCategory}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        >
                            {
                                categorys?.map((cat)=>{
                                    return (
                                        <MenuItem value={cat} key={cat}>
                                            <Checkbox checked={filterCategory.indexOf(cat) > -1} />
                                            <ListItemText primary={cat} />
                                        </MenuItem>
                                    )
                                })

                            }
                    </Select>
                </FormControl>
                <Button color="error" onClick={()=>setDefProducts(defProducts +1)}>Clear all Filters</Button>
            </Stack>
        </>
    )
}

export default Filters
