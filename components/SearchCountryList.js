import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";

const SearchCountryList = ({
  searchInput,
  selectedCountries,
  setSelectedCountries,
  initialCountries,
}) => {
  const [countries, setCountries] = useState(initialCountries);

  const filterCountries = (searchInput) => {
    return initialCountries
      .filter((country) =>
        country.name.toLowerCase().includes(searchInput.toLowerCase())
      )
      .map((country) => ({
        name: country.name,
        iso_code: country.iso_code.toLowerCase(),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  useEffect(() => {
    const filteredCountries = filterCountries(searchInput);
    setCountries(filteredCountries);
  }, [initialCountries, searchInput]);

  const handleCountryClick = (countryName) => {
    if (selectedCountries.includes(countryName)) {
      setSelectedCountries(selectedCountries.filter((c) => c !== countryName));
    } else {
      setSelectedCountries([...selectedCountries, countryName]);
    }
  };

  return (
    <ul>
      {countries.map((country) => (
        <li
          key={country.name}
          className="flex items-center justify-between p-3 bg-white shadow-md rounded-md cursor-pointer hover:bg-gray-200 transition-colors duration-150"
          onClick={() => handleCountryClick(country.name)}
        >
          <div className="flex items-center">
            <div className="w-6 h-4 mr-2">
              <img
                src={`./flags/${country.iso_code.toLowerCase()}.svg`}
                alt={`${country.name} flag`}
                className="w-full h-full"
              />
            </div>
            {country.name}
          </div>
          <div className="flex items-center">
            {selectedCountries.includes(country.name) && (
              <FontAwesomeIcon
                icon={faCheck}
                className="text-blue-500"
                width={15}
                height={15}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchCountryList;
