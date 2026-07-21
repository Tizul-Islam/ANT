import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function ProductSkeletonCard({ isList = false }) {
  if (isList) {
    return (
      <div className="flex flex-col sm:flex-row gap-6 p-4 md:p-6 bg-white rounded-xl shadow-[0_4px_18px_rgba(0,0,0,0.06)] border border-gray-100">
        <div className="w-full sm:w-64 h-48 sm:h-56 rounded-xl overflow-hidden flex-shrink-0">
          <Skeleton height="100%" />
        </div>
        <div className="flex-1 flex flex-col pt-2">
          <div className="mb-2">
            <Skeleton width={80} height={20} className="mb-2" />
            <Skeleton width="80%" height={28} />
          </div>
          <Skeleton width="100%" count={2} className="my-1" />
          <div className="mt-4 flex items-center justify-between">
            <Skeleton width={100} height={32} />
            <Skeleton width={120} height={40} borderRadius={20} />
          </div>
        </div>
      </div>
    );
  }

  // Grid version
  return (
    <article className="group relative flex flex-col bg-white rounded-2xl shadow-[0_4px_18px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden h-full p-3 sm:p-4">
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4">
        <Skeleton height="100%" />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton width={60} height={16} />
        </div>
        <Skeleton width="90%" height={20} className="mb-2" />
        <div className="mt-auto pt-4 flex items-center justify-between">
          <Skeleton width={80} height={24} />
          <Skeleton width={32} height={32} borderRadius="50%" />
        </div>
      </div>
    </article>
  );
}

export function ShopSkeletonCard() {
  return (
    <article className="flex flex-col gap-3 bg-white rounded-xl shadow-[0_4px_18px_rgba(0,0,0,0.08)] border border-gray-100 p-4">
      <div className="overflow-hidden rounded-xl h-48 w-full">
        <Skeleton height="100%" />
      </div>
      <div className="flex-1">
        <Skeleton width="70%" height={20} className="mb-1" />
        <Skeleton width="90%" height={16} className="mb-2" />
        <Skeleton width="60%" height={14} />
      </div>
      <div>
        <Skeleton height={36} borderRadius={6} />
      </div>
    </article>
  );
}
