import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 10px 0;
    gap: 1.6rem;
  }
`;

const Input = styled.input`
  width: 300px;
  padding: 14px 30px;
  border: none;
  border-radius: 4rem;
  outline: none;
  font-size: 1.1rem;
`;

const Button = styled.button`
  padding: 14px 42px;
  margin-left: 10px;
  border: none;
  font-size: 0.89rem;
  letter-spacing: 0.08rem;
  background-color: #fff;
  color: #232323;
  cursor: pointer;
  border-radius: 4rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #232323;
    color: #fff;
  }
`;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
      setQuery("");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter city name"
      />
      <Button onClick={handleSearch}>Search</Button>
    </SearchContainer>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
