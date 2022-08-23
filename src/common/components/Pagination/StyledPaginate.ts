import ReactPaginate from "react-paginate";
import styled from "styled-components";

export const StyledPaginateContainer = styled.div`
  display: flex;
  width: 100%;

  .pagination {
    color: ${({ theme }) => theme.colors.grey};
    list-style-type: none;
    cursor: pointer;
    padding-inline-start: 0;
    display: flex;
    width: 100%;
    text-align: center;
    padding-left: 0px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      padding-left: 6px;
    }

    li {
      display: list-item;
      padding: 10px 16px 6px 16px;
      margin-right: 16px;
      font-size: 14px;
      line-height: 24px;
      @media (max-width: ${({ theme }) => theme.mobile}) {
        padding: 2px 9px;
        font-size: 15px;
        margin-right: 10px;
      }

      a {
        width: 40px;
        height: 40px;

        @media (max-width: ${({ theme }) => theme.mobile}) {
          width: 28px;
          height: 28px;
        }
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
`;
