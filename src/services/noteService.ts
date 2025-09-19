import axios from "axios"
import type { Note } from "../types/note"

export { fetchNotes }

export type NoteResponse = {
    notes: Note[],
    totalPages: number
}

const fetchNotes = async (page:number):Promise<NoteResponse> => {
    const res = await axios.get<NoteResponse>(`https://notehub-public.goit.study/api/notes?page=${page}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })
    return res.data
    
}