import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import ReactPaginate from "react-paginate";
import styles from "../styles/paginate.module.scss";
import { useEffect, useState } from "react";
import { pageInfo } from "@/types/common.type";

export interface IPaginationCustomProps {
  pageInfo: pageInfo;
  getPaginatedTableRows: (selected: number) => void;
  onChangePerPage: (perPage: number) => void;
}

export default function PaginationCustom(props: IPaginationCustomProps) {
  const { pageInfo, getPaginatedTableRows, onChangePerPage } = props;
  const pageCount = Math.ceil(pageInfo.total / pageInfo.itemPerPage);
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const handlePageClick = async (e: { selected: number }) => {
    if (!hasMounted) return;
    getPaginatedTableRows(e.selected);
  };
  const handleChangePerPage = (e: any) => {
    const perPage = parseInt(e.target.value);
    onChangePerPage(perPage);
  };
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return (
    <Box className='flex justify-between items-center px-5'>
      <Box>
        <Typography className='text-grayLight !font-manrope'>
          Hiển thị {pageInfo.page * pageInfo.itemPerPage + 1} -{" "}
          {pageInfo.page * pageInfo.itemPerPage + pageInfo.itemPerPage >
          pageInfo.total
            ? pageInfo.total
            : pageInfo.page * pageInfo.itemPerPage + pageInfo.itemPerPage}{" "}
          /Tổng {pageInfo.total} bản ghi
        </Typography>
      </Box>
      <Box className='flex items-center'>
        <Stack className='mr-5 items-center' direction={"row"}>
          <Typography className='text-grayLight !mr-2 !font-manrope'>
            Hiển thị
          </Typography>
          <Select
            value={pageInfo.itemPerPage}
            onChange={handleChangePerPage}
            sx={{
              "& .MuiSelect-select": {
                padding: "13px 14px",
              },
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </Stack>
        <ReactPaginate
          activeClassName={`${styles["item"]} ${styles["active"]} `}
          breakClassName={`${styles["item"]} ${styles["break-me"]} `}
          breakLabel={"..."}
          containerClassName={`${styles["pagination"]}`}
          disabledClassName={`${styles["disabled-page"]}`}
          marginPagesDisplayed={2}
          nextClassName={`${styles["item"]} ${styles["next"]} `}
          nextLabel={<KeyboardArrowRightIcon />}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          initialPage={0}
          forcePage={pageInfo.page}
          pageClassName={`${styles["item"]} ${styles[" pagination-page"]}`}
          pageRangeDisplayed={2}
          previousClassName={`${styles["item"]} ${styles["previous"]}`}
          previousLabel={<KeyboardArrowLeftIcon />}
        />
      </Box>
    </Box>
  );
}
