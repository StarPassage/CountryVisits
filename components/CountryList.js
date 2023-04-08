import React, { useState, useEffect } from "react";
import worldMap from "data/worldMap.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const CountryList = ({
  region,
  selectedCountries,
  setSelectedCountries,
  initialCountries,
}) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const filteredCountries = initialCountries
      .filter((country) => country.region === region)
      .map((country) => ({
        name: country.name,
        iso_code: country.iso_code.toLowerCase(),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    setCountries(filteredCountries);
  }, [initialCountries, region]);

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
                src={`./flags/${country.iso_code}.svg`}
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

export async function getStaticProps() {
  const res = await fetch(
    "http://localhost:3000/api/countriesByRegion?region=Asia"
  ); // Replace "Asia" with the desired region
  const initialCountries = await res.json();

  return {
    props: {
      initialCountries,
    },
  };
}

export default CountryList;
