import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../styles/InfoBox.css"

export default function InfoBox({title, cases, total, active, isRed}) {

    return (

        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
                    {cases}
                </h2>
                <Typography className="infoBox__total">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
        
    )

}
