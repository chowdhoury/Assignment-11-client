import React from 'react';
import BookCard from '../../books/bookCard';

const Wishlist = () => {
    return (
      <div className="grid grid-cols-6 gap-x-7 gap-y-10">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    );
};

export default Wishlist;