import classnames from "classnames";
import { useMemo } from "react";
import "./Pagination.css"

type PropType = {
  totalCount: number;
  currentPage: number;
  onPageChange: (p:number) => void;
  siblingCount?: number;
};
const DOTS="...";

const range = (start:number , stop: number, step: number = 1): Array<any> => {  
  if ((start == 0 && stop == 0) || start > stop ) return new Array(0);
  return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step);  
}

type PaginationType={
  totalCount:number,
  siblingCount:number,
  currentPage:number
}
export const usePagination = ({
  totalCount,
  siblingCount = 1,
  currentPage
}:PaginationType) => {
  const paginationRange = useMemo(() => {
    //const totalPageCount = Math.ceil(props.totalCount / pageSize);    
    // Pages count is determined as 2*siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const minPageNumbers = siblingCount*2 + 5;
    
    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our paginationComponent, we return the range [1..totalPageCount]
    */
    if (minPageNumbers >= totalCount) {
      return range(1, totalCount);
    }
    
    /*
        Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalCount;

    /*
        Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange: any[] = range(1, leftItemCount);
      

      return [...leftRange, DOTS, totalCount];
    }

    /*
        Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalCount - rightItemCount + 1,
        totalCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
     
    /*
        Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, currentPage]);

  return paginationRange;
};
  


const Pagination: React.FunctionComponent<PropType> = (props: PropType) => {

  const {
    onPageChange,
    totalCount,
    siblingCount = 2,
    currentPage  
  } = props;

  const paginationRange = usePagination({    
    totalCount,
    siblingCount,
    currentPage,
  });

  if(!paginationRange) {
    console.log("no page to show");
    return <div></div>
  }
  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return <div></div>
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className='pagination-container'
    >
       {/* Left navigation arrow */}
      <li key={"-1"}
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li key={DOTS} className="pagination-item dots">&#8230;</li>;
        }
		
        // Render our Page Pills
        return (
          <li key={pageNumber}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li key={"-2"}
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};
 
export default Pagination