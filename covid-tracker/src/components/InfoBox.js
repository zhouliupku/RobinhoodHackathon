import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function InfoBox({title, cases, total }) {

    return (

        <Card>
            <CardContent>
                <Typography>
                    {title}
                </Typography>
                <h2>
                    {cases}
                </h2>
                <Typography>
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
        
    )

}
