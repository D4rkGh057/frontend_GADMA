import React from 'react';

// Componente reutilizable para un solo esqueleto
const SkeletonComponent = () => {
  
    return (
    <div className="flex w-52 flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
};


// Componente reutilizable para renderizar múltiples esqueletos
export const SkeletonGrid = ({ count }) => {
    
  const skeletons = Array.from({ length: count }, (_, index) => (
    <SkeletonComponent key={index} />
  ));

  return (
    <div className="grid items-stretch grid-cols-1 gap-4 p-3 sm:grid-cols-2 lg:grid-cols-3">
      {skeletons}
    </div>
  );
};