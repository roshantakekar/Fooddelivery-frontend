import React from 'react'
import { Grid, Skeleton } from '@mui/material'

const GridLoader = () => {
    return (
        <>
            <Grid item  >
                <Skeleton variant="rectangular" width={350} height={140} style={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width={350} height={20} style={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width={350} height={20} />
            </Grid>
            <Grid item  >
                <Skeleton variant="rectangular" width={350} height={140} style={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width={350} height={20} style={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width={350} height={20} />
            </Grid>
            <Grid item  >
                <Skeleton variant="rectangular" width={350} height={140} style={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width={350} height={20} style={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width={350} height={20} />
            </Grid>
            <Grid item  >
                <Skeleton variant="rectangular" width={350} height={140} style={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width={350} height={20} style={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width={350} height={20} />
            </Grid>
            <Grid item  >
                <Skeleton variant="rectangular" width={350} height={140} style={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width={350} height={20} style={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width={350} height={20} />
            </Grid>
            <Grid item  >
                <Skeleton variant="rectangular" width={350} height={140} style={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width={350} height={20} style={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width={350} height={20} />
            </Grid>
        </>
    )
}

export default GridLoader