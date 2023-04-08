import React, { Fragment, useState, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import worldMap from "data/worldMap.json";
import { motion } from "framer-motion";
import { geoWinkel3 } from "d3-geo-projection";
import CountryList from "../components/CountryList";
import SearchCountryList from "../components/SearchCountryList";
import SearchBar from "../components/SearchBar";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox,
} from "@material-tailwind/react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { List, WindowScroller } from "react-virtualized";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Map = ({ allCountries }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [hovered, setHovered] = useState([]);
  const [position, setPosition] = useState({
    coordinates: [5, 2],
    zoom: 1.25,
  });
  const [open, setOpen] = useState(0);

  const handleCountryClick = (geo) => {
    const NAME = geo.properties.SUBUNIT;

    selectedCountries.includes(NAME)
      ? setSelectedCountries(selectedCountries.filter((c) => c !== NAME))
      : setSelectedCountries([...selectedCountries, NAME]);
  };

  const handleMove = (geo) => {
    if (hovered || !geo.properties) return;

    setHovered(true);
  };
  const handleLeave = (geo) => {
    if (!geo.properties || selectedCountries.includes(geo.properties.SUBUNIT))
      return;
    setHovered(false);
  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
    if (open === value || value === 7) {
      setPosition({
        coordinates: [5, 2],
        zoom: 1.25,
      });
      return;
    }
    if (value === 1)
      setPosition({
        coordinates: [20, 2],
        zoom: 2.7,
      });
    if (value === 2)
      setPosition({
        coordinates: [100, 25],
        zoom: 2.8,
      });
    if (value === 3)
      setPosition({
        coordinates: [8, 52],
        zoom: 5,
      });
    if (value === 4)
      setPosition({
        coordinates: [-100, 40],
        zoom: 3,
      });
    if (value === 5)
      setPosition({
        coordinates: [130, -30],
        zoom: 3,
      });
    if (value === 6)
      setPosition({
        coordinates: [-65, -25],
        zoom: 2.7,
      });
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };
  const mapWidth = 800;
  const mapHeight = 600;
  const handleFilter = ({ constructor: { name } }) => {
    return name !== "MouseEvent" && name !== "wheel";
  };
  const projection = geoWinkel3()
    .translate([mapWidth / 2, mapHeight / 2])
    .scale(150);

  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="flex flex-col md:flex-row items-start justify-center">
      <div className="md:w-1/3 flex flex-col items-start justify-center mr-4 flex-1">
        <h2 className="text-2xl font-medium mb-4">Visited Countries</h2>
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

        <div className="h-[524px] w-full scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-100 overflow-y-scroll pr-4">
          {searchInput ? (
            <SearchCountryList
              searchInput={searchInput}
              selectedCountries={selectedCountries}
              setSelectedCountries={setSelectedCountries}
              initialCountries={allCountries}
            />
          ) : (
            <Fragment>
              <Accordion open={open === 1} animate={customAnimation}>
                <AccordionHeader onClick={() => handleOpen(1)}>
                  Africa
                </AccordionHeader>
                <AccordionBody>
                  <CountryList
                    region="Africa"
                    selectedCountries={selectedCountries}
                    setSelectedCountries={setSelectedCountries}
                    initialCountries={allCountries}
                  />
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)}>
                  Asia
                </AccordionHeader>
                <AccordionBody>
                  <CountryList
                    region="Asia"
                    selectedCountries={selectedCountries}
                    setSelectedCountries={setSelectedCountries}
                    initialCountries={allCountries}
                  />
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 3}>
                <AccordionHeader onClick={() => handleOpen(3)}>
                  Europe
                </AccordionHeader>
                <AccordionBody>
                  <CountryList
                    region="Europe"
                    selectedCountries={selectedCountries}
                    setSelectedCountries={setSelectedCountries}
                    initialCountries={allCountries}
                  />
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 4}>
                <AccordionHeader onClick={() => handleOpen(4)}>
                  North America
                </AccordionHeader>
                <AccordionBody>
                  <CountryList
                    region="North America"
                    selectedCountries={selectedCountries}
                    setSelectedCountries={setSelectedCountries}
                    initialCountries={allCountries}
                  />
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 5}>
                <AccordionHeader onClick={() => handleOpen(5)}>
                  Oceania
                </AccordionHeader>
                <AccordionBody>
                  <CountryList
                    region="Oceania"
                    selectedCountries={selectedCountries}
                    setSelectedCountries={setSelectedCountries}
                    initialCountries={allCountries}
                  />
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 6}>
                <AccordionHeader onClick={() => handleOpen(6)}>
                  South America
                </AccordionHeader>
                <AccordionBody>
                  <CountryList
                    region="South America"
                    selectedCountries={selectedCountries}
                    setSelectedCountries={setSelectedCountries}
                    initialCountries={allCountries}
                  />
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 7}>
                <AccordionHeader onClick={() => handleOpen(7)}>
                  Antarctica
                </AccordionHeader>
                <AccordionBody>
                  <CountryList
                    region="Antarctica"
                    selectedCountries={selectedCountries}
                    setSelectedCountries={setSelectedCountries}
                    initialCountries={allCountries}
                  />
                </AccordionBody>
              </Accordion>
            </Fragment>
          )}
        </div>
      </div>
      <ComposableMap
        className="w-full md:w-2/3 max-w-full mx-auto"
        projection={projection}
        width={mapWidth}
        height={mapHeight}
      >
        <defs>
          <pattern
            id="waves"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0,2.5 Q2.5,0 5,2.5 Q7.5,5 10,2.5"
              strokeWidth="1"
              stroke="#7b7b7b"
              strokeLinecap="round"
              fill="none"
            />
          </pattern>
        </defs>
        <g>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#a1e9fe" // Use the defined wave pattern as a fill
          />
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#waves)" // Use the defined wave pattern as a fill
          />
        </g>
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          minZoom={position.zoom}
          maxZoom={position.zoom}
          filterZoomEvent={handleFilter}
          translateExtent={[
            [0, 50],
            [mapWidth, mapHeight - 65],
          ]}
        >
          <Geographies geography={worldMap}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => (
                  <>
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleCountryClick(geo)}
                      className="transition-opacity"
                      onMouseMove={handleMove}
                      onMouseLeave={handleLeave}
                      style={{
                        default: {
                          fill: selectedCountries.includes(
                            geo.properties.SUBUNIT
                          )
                            ? "#DD4132"
                            : "#F4F5F7",
                          stroke: selectedCountries.includes(
                            geo.properties.SUBUNIT
                          )
                            ? "#9E1030"
                            : "#676767",
                          strokeWidth: selectedCountries.includes(
                            geo.properties.SUBUNIT
                          )
                            ? 0.75
                            : 0.5,
                          outline: "none",
                          transition: "all 250ms",
                        },
                        hover: {
                          fill: selectedCountries.includes(
                            geo.properties.SUBUNIT
                          )
                            ? "#FF6F61"
                            : "#dddddd",
                          stroke: selectedCountries.includes(
                            geo.properties.SUBUNIT
                          )
                            ? "#9E1030"
                            : "#454444",
                          strokeWidth: 0.75,
                          outline: "none",
                          transition: "all 250ms",
                        },
                        pressed: {
                          fill: "#DD4132",
                          stroke: "#9E1030",
                          strokeWidth: 0.75,
                          outline: "none",
                          transition: "all 250ms",
                        },
                      }}
                    />
                  </>
                ))}
              </>
            )}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;
