import React from 'react';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-slate-800/50 rounded-xl ${className}`} />
);

export const CardSkeleton = () => (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex flex-col h-full">
        <Skeleton className="h-48 w-full rounded-none" />
        <div className="p-5 flex-1 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <div className="flex gap-2 mt-auto">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
            </div>
        </div>
    </div>
);

export const ListSkeleton = ({ count = 6 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(count)].map((_, i) => (
            <CardSkeleton key={i} />
        ))}
    </div>
);

export default Skeleton;
