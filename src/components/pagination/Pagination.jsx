import s from './Pagination.module.css';

const Pagination = ({ currentPage, totalProducts, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalProducts / pageSize);
  const pageRange = 5;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = Math.min(totalPages, startPage + pageRange - 1);

    if (endPage - startPage + 1 < pageRange) {
      startPage = Math.max(1, endPage - pageRange + 1);
    }
    const pages = [];

    for(let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }; 

  return (
    <div className={s.container}>
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className={s.btn}
      >
        Anterior
      </button>
      {currentPage > Math.floor(pageRange / 2) + 1 && (
        <>
          <button 
            onClick={() => handlePageChange(1)} 
            className={s.btn}
          >
            1
          </button>
          <span className={s.span}>...</span>
        </>
      )}
      {getPageNumbers().map(page => (
        <button 
          key={page} 
          onClick={() => handlePageChange(page)} 
          className={`${s.btn} ${page === currentPage ? s.active : ''}`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages - Math.floor(pageRange / 2) && (
        <>
          <span className={s.span}>...</span>
          <button 
            onClick={() => handlePageChange(totalPages)} 
            className={s.btn}
          >
            {totalPages}
          </button>
        </>
      )}
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className={s.btn}
      >
        Siguiente
      </button>
    </div>
  )
};


export default Pagination;