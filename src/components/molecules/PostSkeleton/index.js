import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css'
import './styles.css'

const PostSkeleton = () => (
    <SkeletonTheme
        baseColor='#111'
        duration={1}
        highlightColor="#151515"
    >
        <div className="skeleton-user-cont">
            <div className="skeleton-user-info">
                <Skeleton className='skeleton-user-avatar' />
                <Skeleton />
            </div>
            <Skeleton className='skeleton-text' />
            <Skeleton className='skeleton-pic' />
        </div>
    </SkeletonTheme>
);

export default PostSkeleton;
