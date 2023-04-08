import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ searchInput, setSearchInput }) => {
  return (
    <div className="flex items-center w-full bg-white p-2">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="bg-transparent border-0 focus:outline-none w-full"
        placeholder="Search countries..."
      />
      <FontAwesomeIcon
        icon={faSearch}
        width={20}
        height={20}
        className="text-gray-400 ml-2"
      />
    </div>
  );
};
export default SearchBar;
