import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';

function Pagination({ page, setPage, totalCount, pageSize }) {
  const maxPage = Math.ceil(totalCount / pageSize);

  const pageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage !== page && selectedPage <= maxPage)
      setPage(selectedPage);
  };

  return (
    <>
      <ReactPaginate
        containerClassName="pagination"
        pageLinkClassName="page__item"
        activeLinkClassName="page__item-selected"
        onPageChange={(page) => pageHandler(page.selected + 1)}
        pageCount={maxPage}
        breakLabel="..."
        breakLinkClassName="page__item"
        previousLabel={
          <FontAwesomeIcon icon={faAngleLeft} style={{ color: '#6b7280' }} />
        }
        previousLinkClassName="page__item pagination__arrow-left"
        nextLabel={
          <FontAwesomeIcon icon={faAngleRight} style={{ color: '#6b7280' }} />
        }
        nextLinkClassName="page__item pagination__arrow-right"
        disabledClassName="pagination__disabled"
      />
    </>
  );
}

export default Pagination;
