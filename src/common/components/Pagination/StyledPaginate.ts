import ReactPaginate from "react-paginate";
import styled from "styled-components";

export const StyledPaginateContainer = styled.div`
  display:flex;
  flex-direction: row;

  .pagination {
    color: ${({ theme }) => theme.colors.grey};
    list-style-type: none;
    cursor: pointer;

    li {
      display:inline-block;
      padding: 10px 16px 6px 16px;
      margin-right: 10px;      

      a{
        width: 40px;
        height: 40px;
      }
    }   
  }
  .break-me {
    cursor: default;
  }
  .active {
    border-color: transparent;
    background-color: ${({ theme }) => theme.colors.red};
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.white};
  }
  
`