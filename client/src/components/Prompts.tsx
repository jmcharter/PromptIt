import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { getPrompts } from '../api';
import { PromptData } from '../models/DataModels';
import Prompt from './Prompt';

interface Props {

}

const Prompts = (props: Props) => {
    const [prompts, setPrompts] = useState<[PromptData]>([{ _id: "", title: "", text: "", createdBy: { displayName: "", username: "" } }]);
    const [loading, setLoading] = useState<Boolean>(true);
    const fetchData = async () => {
        const res = await getPrompts();
        const data = res.data;
        setPrompts(data);
        console.log(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {!loading &&
                <Container
                    sx={{ mt: 2 }}
                >
                    <Box
                        sx={{ flexGrow: 1 }}
                    >
                        <Grid container spacing={1}>
                            {prompts && prompts.map(prompt =>
                            (
                                <Grid item xs={12} md={6}>
                                    <Prompt
                                        key={prompt._id}
                                        _id={prompt._id}
                                        title={prompt.title}
                                        text={prompt.text}
                                        user={prompt.createdBy.displayName}
                                    />
                                </Grid>
                            ))
                            }
                        </Grid>

                    </Box>
                </Container>
            }
        </>
    );
};

export default Prompts;
