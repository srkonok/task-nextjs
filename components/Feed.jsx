"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Preloader from "./Preloader";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [dataCount,setDataCount]=useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page
  const [isLoading, setIsLoading] = useState(true); // Add a loading state


  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    
    fetchPosts(currentPage);
    
  }, [currentPage]);

  const fetchPosts = async () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const response = await fetch("/api/prompt");
    const data = await response.json();
    const paginatedData = data.slice(startIndex, endIndex);
    setDataCount(data);
    setAllPosts(paginatedData);
    setIsLoading(false);
  };

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.title) ||
        regex.test(item.tags) ||
        regex.test(item.body)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(dataCount.length / itemsPerPage)) {
      setCurrentPage(newPage);
      fetchPosts(newPage); // Fetch data for the new page
    }
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
        {/* Conditionally render the preloader while loading data */}
      {isLoading ? (
        <Preloader />
      ) : (
        // Render the data when loading is complete
        <PromptCardList
          data={searchText ? searchedResults : allPosts}
          handleTagClick={handleTagClick}
        />
      )}

      {/* Pagination Controls */}
      <div className='pagination-controls'>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className='flex flex-col px-5'>{currentPage}</span>
      <button 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= Math.ceil(dataCount.length / itemsPerPage)}
        >
        Next
      </button>


    </div>
    </section>
  );
};

export default Feed;
