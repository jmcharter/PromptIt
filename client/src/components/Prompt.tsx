import { Box, Card, CardContent, CardActionArea, Typography } from '@mui/material';
import React from 'react';

interface Props {
    _id: string;
    title: string;
    text: string;
    user: string;
}

const Prompt: React.FC<Props> = ({ _id, title, text, user }) => {
    return (
        <Box sx={{ width: 500 }}>
            <Card color="#666">
                <CardActionArea sx={{ textAlign: "left" }}>
                    <CardContent>
                        <Typography
                            variant="h4"
                            gutterBottom
                            component="div"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="h5"
                        >
                            by {user}
                        </Typography>
                    </CardContent>
                </CardActionArea>

            </Card>
        </Box>
    );
};

export default Prompt;
