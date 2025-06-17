import React from 'react';

const SkeletonLoader = () => {
  return (
    <div role="status" className="animate-pulse space-y-8 max-w-3xl mx-auto p-4">
      {/* Page Header Skeleton */}
      <div className="h-6 bg-gray-300 rounded-md dark:bg-gray-300 w-1/3"></div>

      {/* Subheading Skeleton */}
      <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-300 w-1/2"></div>

      {/* Paragraph Skeleton */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-300 w-full"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-300 w-11/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-300 w-10/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-300 w-8/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-300 w-9/12"></div>
      </div>

      {/* Tags/Badges Skeleton */}
      <div className="flex space-x-3 mt-4">
        <div className="h-6 w-20 bg-gray-200 rounded-full dark:bg-gray-300"></div>
        <div className="h-6 w-16 bg-gray-200 rounded-full dark:bg-gray-300"></div>
        <div className="h-6 w-24 bg-gray-200 rounded-full dark:bg-gray-300"></div>
      </div>

      {/* Page Header Skeleton */}
      <div className="h-6 bg-gray-300 rounded-md dark:bg-gray-300 w-1/3"></div>

      {/* Subheading Skeleton */}
      <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-300 w-1/2"></div>

      {/* Paragraph Skeleton */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-300 w-full"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-300 w-11/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-300 w-10/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-300 w-8/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-300 w-9/12"></div>
      </div>

      {/* Tags/Badges Skeleton */}
      <div className="flex space-x-3 mt-4">
        <div className="h-6 w-20 bg-gray-200 rounded-full dark:bg-gray-300"></div>
        <div className="h-6 w-16 bg-gray-200 rounded-full dark:bg-gray-300"></div>
        <div className="h-6 w-24 bg-gray-200 rounded-full dark:bg-gray-300"></div>
      </div>


    </div>
  );
};

export default SkeletonLoader;
