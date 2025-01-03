import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from './AxiosInterceptor';

function Search({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState([]);
  const navigate = useNavigate(); 
  const location = useLocation(); 

  useEffect(() => {
    const debounceFunc = setTimeout(() => {
      if (query) {
        searchAPI(query);
      } else {
        setShowResult([]);
      }
    }, 1000);

    return () => clearTimeout(debounceFunc);
  }, [query]);

  useEffect(() => {
    if (location.pathname.startsWith('/show/')) {
      setQuery("");
      onSearch(""); 
    }
  }, [location]);

  const searchAPI = async (searchTerm) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/show/search?${searchTerm}`);
      const data1 = response.data;
      setShowResult(data1.data.rows || []);
    } catch (err) {
      setError("No result Found");
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleItemClick = (show) => {
    navigate(`/show/${show.id}`);
  };

  return (
    <div className="search-container">
      <div className="navbar-search">
        <input
          type="text"
          value={query}
          placeholder="🔍 Search for Movies, Events, Plays, etc."
          onChange={handleInputChange}
        />
      </div>
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {showResult.length > 0 && (
        <ul className="searchResults">
          {showResult.map((item) => (
            <li key={item.id} onClick={() => handleItemClick(item)}>
              {item.showName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
