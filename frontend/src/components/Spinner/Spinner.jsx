import './Spinner.scss';

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center spinner">
      <div className="spinner-border" role="status">
        <span className="visually-hiden">Loading ...</span>
      </div>
    </div>
  );
};

export default Spinner;
