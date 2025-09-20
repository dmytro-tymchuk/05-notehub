import ReactPaginate from "react-paginate"
import css from "./Pagination.module.css"

type Props = {
  pageCount: number;
  page: number;
  onChange: (page: number) => void;
};

const Pagination = ({ pageCount, page, onChange }: Props) => {
    return (<ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => onChange(selected + 1)}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
                renderOnZeroPageCount={null}
            />)
}

export default Pagination