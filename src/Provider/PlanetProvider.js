import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import PlanetContex from '../Context/PlanetContext';
// cc
export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchNameInput, setSearchNameInput] = useState('');
  const [searchNumberInput, setSearchNumberInput] = useState(0);
  const [selectColuna, setSelectColuna] = useState('population');
  const [selectOperador, setSelectOperador] = useState('maior que');
  const [selectOrdenar, setSelectOrdenar] = useState('');
  const [sortInput, setSortInput] = useState('');
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [appliedColumn, setAppliedColumn] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const value = {
    planets,
    loading,
    setLoading,
    filteredPlanets,
    setFilteredPlanets,
    searchNameInput,
    setSearchNameInput,
    searchNumberInput,
    setSearchNumberInput,
    selectColuna,
    setSelectColuna,
    selectOperador,
    setSelectOperador,
    selectOrdenar,
    setSelectOrdenar,
    sortInput,
    setSortInput,
    appliedFilters,
    setAppliedFilters,
    appliedColumn,
    setAppliedColumn,
  };

  useEffect(() => {
    async function fetchPlanets() {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setPlanets(data);
      setLoading(false);
    }
    fetchPlanets();
  }, []);

  useEffect(() => {
    if (!loading && planets.results) {
      const filtered = planets.results
        .filter((eachPlanet) => eachPlanet.name.toLowerCase()
          .includes(searchNameInput.toLowerCase()));
      setFilteredPlanets(filtered);
    }
  }, [planets, searchNameInput, loading]);

  return (
    <PlanetContex.Provider value={ value }>
      {children}
    </PlanetContex.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
