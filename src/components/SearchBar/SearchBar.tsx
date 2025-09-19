import styles from './SearchBar.module.css'
import toast, { Toaster } from 'react-hot-toast';

interface SearchBarProps{
    onSubmit: (submitValue: string) => void
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
    const handleSubmit = (formData: FormData) => {
        const inputValue = (formData.get("query") as string).trim();
        if (inputValue === "") {
            toast.error("Please enter your search query")
            return
        }
        onSubmit(inputValue);
    }

    return <header className={styles.header}>
        <Toaster />
  <div className={styles.container}>
    <a
      className={styles.link}
      href="https://www.themoviedb.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by TMDB
    </a>
    <form action={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="text"
        name="query"
        autoComplete="off"
        placeholder="Search movies..."
        autoFocus
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  </div>
</header>
}

export default SearchBar