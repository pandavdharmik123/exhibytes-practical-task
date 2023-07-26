import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import {Stack} from "@mui/material";

const SkeletonLoading = () => (
    <div className="user-list">
      {Array(8)
        .fill(1)
        .map((value, index) => (
            <Stack key={index} spacing={1}>
                    <div className="user-card">
                            <div className="d-flex w-100 mb-1">
                                    <Skeleton variant="circular" width={40} height={40} />
                                    <div style={{ marginLeft: 8, gap: 2 }} className="d-flex flex-column">
                                            <Skeleton variant="rounded" width={130} height={19} />
                                            <Skeleton variant="rounded" width={65} height={19} />
                                    </div>
                            </div>
                            <Skeleton variant="rounded" width={195} height={42} />
                            <div className="w-100 d-flex mt-2 justify-content-around twubric-content">
                                    <Skeleton variant="rounded" width={59} height={59} />
                                    <Skeleton variant="rounded" width={59} height={59} />
                                    <Skeleton variant="rounded" width={59} height={59} />
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-2">
                                    <Skeleton variant="rounded" width={77} height={21} />
                                    <Skeleton variant="rounded" width={100} height={30} />
                            </div>
                    </div>
            </Stack>
      ))}
    </div>
)

export { SkeletonLoading }