
"use client";

function SearchRecipes({ search, onSearchChange }) {
  return (
    <div className="search-recipes">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        type="text"
        placeholder="Search recipes..."
        className="search-recipes-input"
      />
    </div>
  );
}

export default SearchRecipes;
