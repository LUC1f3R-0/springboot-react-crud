import { Button } from '@mui/material'
import React from 'react'

const BUTTON = (prop) => {
    return (
        <Button variant="contained" color={prop.color} onClick={prop.onClick}>
            {prop.value}
        </Button>
    );
};


export default BUTTON