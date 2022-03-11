import { useEffect, useState } from "react";
import TokenService from "../service/storage.service";
import cn from "classnames";
import { useAppActions } from "../hooks/useAppActions";
import { useAppSelector } from "../redux/store";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    margin: "50px 0",
  },
  pageNum: {
    fontSize: "x-large",
    margin: "0 10px",
  },
  active: {
    fontWeight: "bold",
    textDecoration: "underline",
  },
  list: {
    display: "flex",
    listStyle: "none",
  },
}));

const Pagination = ({ portionSize = 3 }) => {
  const classes = useStyles();
  const { setCurrentPage, getPosts } = useAppActions();
  const { pageSize, totalPagesCount, currentPage } = useAppSelector(
    ({ posts }) => posts
  );

  const pagesCount = Math.ceil((totalPagesCount as number) / pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);

  useEffect(() => {
    setPortionNumber(Math.ceil(currentPage / portionSize));
  }, [currentPage, portionSize]);

  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const handlePageChanged = (page: number) => {
    if (currentPage !== page) {
      TokenService.setPaginationCurrentPostPage(page);
      setCurrentPage(page);
      getPosts(page, pageSize);
    }
  };

  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        <Button
          variant="contained"
          disabled={portionNumber <= 1}
          onClick={() => setPortionNumber(portionNumber - 1)}
        >
          prev
        </Button>
        {pages
          .filter(
            (page) =>
              page >= leftPortionPageNumber && page <= rightPortionPageNumber
          )
          .map((page, index) => (
            <li
              className={cn(
                { [classes.active]: currentPage === page },
                classes.pageNum
              )}
              key={index}
              style={{ padding: "0 5px", cursor: "pointer" }}
              onClick={() => handlePageChanged(page)}
            >
              {page}
            </li>
          ))}
        <Button
          variant="contained"
          disabled={portionCount <= portionNumber}
          onClick={() => setPortionNumber(portionNumber + 1)}
        >
          next
        </Button>
      </ul>
    </div>
  );
};

export default Pagination;
