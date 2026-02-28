import { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, placeholder = "Buscar productos..." }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() && onSearch) {
            onSearch(searchTerm.trim());
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        inputRef.current?.focus();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`search-bar ${isFocused ? 'search-bar--focused' : ''}`}
        >
            <div className="search-bar__container">
                {/* Search Icon */}
                <div className="search-bar__icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </div>

                {/* Input Field */}
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="search-bar__input"
                    aria-label="Buscar"
                />

                {/* Clear Button */}
                {searchTerm && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="search-bar__clear"
                        aria-label="Limpiar búsqueda"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}

                {/* Search Button */}
                <button
                    type="submit"
                    className="search-bar__submit"
                    aria-label="Buscar"
                    disabled={!searchTerm.trim()}
                >
                    <span>Buscar</span>
                </button>
            </div>

            {/* Focus Ring Effect */}
            <div className="search-bar__ring"></div>
        </form>
    );
};

export default SearchBar;
