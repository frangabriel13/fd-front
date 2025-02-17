import s from './Pagination.module.css';

const Pagination = ({ currentPage, totalProducts, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalProducts / pageSize);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={s.container}>
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <p>{currentPage} de {totalPages}</p>
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  )
};


export default Pagination;