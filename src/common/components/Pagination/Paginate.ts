import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';



export const Pagination = ( pageCount: number ) => {
  
  const handlePageClick = (event: any) => {
   console.log(event.selected)
  };
/*
  let a = (        
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
      />   
  );*/
}

