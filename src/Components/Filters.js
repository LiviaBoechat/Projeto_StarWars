import { useContext } from 'react';
import PlanetContext from '../Context/PlanetContext';

export default function Filters() {
  const { planets,
    // loading,
    filteredPlanets,
    setFilteredPlanets,
    searchNameInput,
    setSearchNameInput,
    selectColuna,
    setSelectColuna,
    selectOperador,
    setSelectOperador,
    searchNumberInput,
    setSearchNumberInput,
    selectOrdenar,
    setSelectOrdenar,
    setSortInput,
    appliedFilters,
    setAppliedFilters,
    appliedColumn,
    setAppliedColumn,
  } = useContext(PlanetContext);

  const planetKeys = planets.length === 0 || !planets.results ? []
    : Object.keys(planets.results[0]).filter((key) => key !== 'residents');

  function handleClick() {
    const newFilter = [...appliedFilters, {
      column: selectColuna,
      operator: selectOperador,
      value: searchNumberInput,
    }];
    setAppliedFilters(newFilter);

    newFilter.forEach((eachFilter) => {
      const valor = Number(eachFilter.value);

      if (eachFilter.operator === 'menor que') {
        const filterLessThan = filteredPlanets
          .filter((eachPlanet) => Number(eachPlanet[eachFilter.column]) < valor);
        setFilteredPlanets(filterLessThan);
      }
      if (eachFilter.operator === 'maior que') {
        const filterMoreThan = filteredPlanets
          .filter((eachPlanet) => Number(eachPlanet[eachFilter.column]) > valor);
        setFilteredPlanets(filterMoreThan);
      }
      if (eachFilter.operator === 'igual a') {
        const filterSameAs = filteredPlanets
          .filter((eachPlanet) => Number(eachPlanet[eachFilter.column]) === valor);
        setFilteredPlanets(filterSameAs);
      }
    });
    const applyColumn = appliedColumn
      .filter((eachColumn) => eachColumn !== selectColuna);
    // setAppliedColumn é usado p/ excluir os elementos da coluna já utilizados no click
    setAppliedColumn(applyColumn);
    // setSelectColuna é p/ atualizar o estado inicial qd o click é dado e aquele elemento some do array. Usou o applyColumn[0] criado acima em vez do estado appliedCollumn para ser + rápida resposta
    setSelectColuna(applyColumn[0]);
  }

  function handleClickAll() {
    setAppliedFilters([]);
    setAppliedColumn(['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']);
    setFilteredPlanets(planets.results);
  }

  // if (loading) {
  //   return <h1>Carregando...</h1>;
  // }

  return (
    <form>
      <label htmlFor="search_NameInput" data-testid="name-filter">
        <input
          id="search_NameInput"
          type="text"
          name="searchNameInput"
          value={ searchNameInput }
          onChange={ ({ target }) => setSearchNameInput(target.value) }
        />
      </label>
      <label htmlFor="selectColuna">
        <select
          data-testid="column-filter"
          name="selectColuna"
          id="selectColuna"
          value={ selectColuna }
          onChange={ ({ target }) => setSelectColuna(target.value) }
        >
          { appliedColumn.map((eachColumn) => (
            <option key={ eachColumn }>
              { eachColumn }
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="selectOperador">
        <select
          data-testid="comparison-filter"
          name="selectOperador"
          id="selectOperador"
          value={ selectOperador }
          onChange={ ({ target }) => setSelectOperador(target.value) }
        >
          <option>menor que</option>
          <option>maior que</option>
          <option>igual a</option>
        </select>
      </label>
      <button
        id="filter_button"
        data-testid="button-filter"
        type="button"
        onClick={ () => handleClick() }
      >
        Filtrar
      </button>
      <label htmlFor="searchNumberInput">
        <input
          data-testid="value-filter"
          id="searchNumberInput"
          type="number"
          name="searchNumberInput"
          value={ searchNumberInput }
          onChange={ ({ target }) => setSearchNumberInput(target.value) }
        />
      </label>
      <label htmlFor="selectOrdenar">
        <select
          name="selectOrdenar"
          id="selectOrdenar"
          value={ selectOrdenar }
          onChange={ ({ target }) => setSelectOrdenar(target.value) }
        >
          { planetKeys.map((eachPlanet) => (
            <option
              key={ eachPlanet }
              value={ eachPlanet }
            >
              {eachPlanet}
            </option>
          ))}
        </select>
      </label>
      <input
        type="radio"
        name="sort"
        value="asc"
        label="Crescente"
        onClick={ ({ target }) => setSortInput(target.value) }
      />
      <input
        type="radio"
        name="sort"
        value="desc"
        label="Decrescente"
        onClick={ ({ target }) => setSortInput(target.value) }
      />
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => handleClickAll() }
      >
        Remover todas filtragens
      </button>

    </form>
  );
}

// { appliedColumn.length === 0 && (
//   <>
//     <option>population</option>
//     <option>orbital_period</option>
//     <option>diameter</option>
//     <option>rotation_period</option>
//     <option>surface_water</option>
//   </>
// )}
