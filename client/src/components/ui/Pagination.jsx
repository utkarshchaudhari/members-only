import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

function Pagination({ page, setPage, totalCount, pageSize }) {
  const maxPage = Math.ceil(totalCount / pageSize);

  const pageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage !== page && selectedPage <= maxPage)
      setPage(selectedPage);
  };

  return (
    <div className="pagination">
      <span
        className={page > 1 ? 'pagination__arrow-left' : 'pagination__disabled'}
        onClick={() => pageHandler(page - 1)}
      >
        <FontAwesomeIcon icon={faAngleLeft} style={{ color: '#6b7280' }} />
      </span>
      {[...Array(maxPage)].map((_, i) => (
        <span
          key={i}
          onClick={() => pageHandler(i + 1)}
          className={page === i + 1 ? 'pagination__selected' : ''}
        >
          {i + 1}
        </span>
      ))}
      <span
        className={
          page < maxPage ? 'pagination__arrow-right' : 'pagination__disabled'
        }
        onClick={() => pageHandler(page + 1)}
      >
        <FontAwesomeIcon icon={faAngleRight} style={{ color: '#6b7280' }} />
      </span>
    </div>
  );
}

export default Pagination;
