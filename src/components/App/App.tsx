import { keepPreviousData, useQuery } from '@tanstack/react-query'
import NoteList from '../NoteList/NoteList'
import css from './App.module.css'
import { fetchNotes } from '../../services/noteService'
import ReactPaginate from 'react-paginate'
import { useState } from 'react'

const App = () => {
    const [page, setPage] = useState(1);


    const {data} = useQuery({
        queryKey: ["task", page],
        queryFn: () => fetchNotes(page),
        placeholderData: keepPreviousData
        
    });
    console.log(data);
    
    
    




    return (
        <div className={css.app}>
	<header className={css.toolbar}>
		{/* Компонент SearchBox */}
		{data &&<ReactPaginate
                pageCount={data?.totalPages ?? 0}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
                renderOnZeroPageCount={null}
            />}
		{/* Кнопка створення нотатки */}
            </header>
            
            <NoteList notes={data?.notes ?? []} />
</div>
    )
}

export default App