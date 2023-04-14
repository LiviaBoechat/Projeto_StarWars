import { useContext } from 'react';
import PlanetContext from '../Context/PlanetContext';

export default function Table() {
  const { planets,
    appliedFilters,
    // filteredPlanets,
    setAppliedFilters,
    appliedColumn,
    setFilteredPlanets,
    setAppliedColumn } = useContext(PlanetContext);

  function handleClick(deletedFilter) {
    const arrayRemaniningFilter = appliedFilters
      .filter((eachFilter) => eachFilter.column !== deletedFilter.column);
    setAppliedFilters(arrayRemaniningFilter);
    setAppliedColumn([...appliedColumn, deletedFilter.column]);

    let newFilteredPlanets = planets.results;

    arrayRemaniningFilter.forEach((eachFilter) => {
      const valor = Number(eachFilter.value);

      if (eachFilter.operator === 'menor que') {
        newFilteredPlanets = newFilteredPlanets
          .filter((eachPlanet) => Number(eachPlanet[eachFilter.column]) < valor);
        setFilteredPlanets(newFilteredPlanets);
        console.log(newFilteredPlanets);
      }
      if (eachFilter.operator === 'maior que') {
        newFilteredPlanets = newFilteredPlanets
          .filter((eachPlanet) => Number(eachPlanet[eachFilter.column]) > valor);
        setFilteredPlanets(newFilteredPlanets);
        console.log(newFilteredPlanets);
      }
      if (eachFilter.operator === 'igual a') {
        newFilteredPlanets = newFilteredPlanets
          .filter((eachPlanet) => Number(eachPlanet[eachFilter.column]) === valor);
        setFilteredPlanets(newFilteredPlanets);
        console.log(newFilteredPlanets);
      }
    });
    setFilteredPlanets(newFilteredPlanets);
  }

  // if (loading) {
  //   return <h1>Carregando...</h1>;
  // }

  return (
    <div>
      {appliedFilters.length > 0 && appliedFilters.map((eachFilter) => (
        <div key={ eachFilter.column } data-testid="filter">
          <p>
            { eachFilter.column }
            {'\n'}
            { eachFilter.operator }
            {'\n'}
            { eachFilter.value }
          </p>
          <button
            id="filter_button"
            type="button"
            onClick={ () => handleClick(eachFilter) }
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
