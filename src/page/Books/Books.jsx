import PageHero from '../../components/shared/PageHero';
import { Link } from 'react-router';
import BookCard from '../../components/books/bookCard';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';


const Books = () => {
  const axios = useAxios()
  const {data}=useQuery({
    queryKey: ['books'],
    queryFn: async ()=>{
      const books=await axios.get('/books')
      return books.data;
    }
  })
  console.log(data);
    return (
      <div>
        <header>
          <PageHero title="Books" />
        </header>
        <main className="w-4/5 mx-auto">
          <div className="mt-10">
            <p>Showing 1-20 of 100 Books</p>
          </div>
          <div className="grid grid-cols-11 gap-10 mt-3">
            <aside className="col-span-3">
              <div className="bg-base-200 px-8 rounded-lg mb-10 pt-3 pb-5">
                <h2 className="text-[22px] font-bold text-secondary mb-2">
                  Search
                </h2>
                <label className="input w-full bg-base-100">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input
                    type="search"
                    required
                    placeholder="Harry potter"
                    className=""
                  />
                </label>
                <button
                  to="/books"
                  className="bg-primary hover:bg-secondary text-white py-3 rounded-lg font-semibold duration-400 w-full mt-3"
                >
                  Search
                </button>
              </div>
              <div className="bg-base-200 px-8 rounded-lg mb-5 pt-3 pb-5">
                <h2 className="text-[22px] font-bold text-secondary mb-2">
                  Filtered By
                </h2>
                <select defaultValue="Pick a color" className="select">
                  <option>Newer</option>
                  <option>Older</option>
                  <option>Price (Low to High)</option>
                  <option>Price (High to Low)</option>
                </select>
                <button
                  to="/books"
                  className="bg-primary hover:bg-secondary text-white py-3 rounded-lg font-semibold duration-400 w-full mt-3"
                >
                  Filter
                </button>
              </div>
            </aside>
            <section className="col-span-8 grid grid-cols-3 gap-x-7 gap-y-10">
              {
                data?.map(book=><BookCard
                  key={book._id}
                  book={book}
                ></BookCard>)
              }
            </section>
          </div>
        </main>
      </div>
    );
};

export default Books;