/* eslint-disable react/jsx-closing-tag-location */
import { useContext, useEffect, useState } from 'react';
import PlanetContext from '../Context/PlanetContext';

export default function Table() {
  const { filteredPlanets } = useContext(PlanetContext);
  const [planetsFilter, setPlanetsFilter] = useState([]);

  useEffect(() => {
    setPlanetsFilter(filteredPlanets);
    // console.log(filteredPlanets);
  }, [filteredPlanets]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { planetsFilter.map((eachPlanet) => (
          <tr key={ eachPlanet.name }>
            <td>{eachPlanet.name}</td>
            <td>{eachPlanet.rotation_period}</td>
            <td>{eachPlanet.orbital_period}</td>
            <td>{eachPlanet.diameter}</td>
            <td>{eachPlanet.climate}</td>
            <td>{eachPlanet.gravity}</td>
            <td>{eachPlanet.terrain}</td>
            <td>{eachPlanet.surface_water}</td>
            <td>{eachPlanet.population}</td>
            <td>
              {
                eachPlanet.films.map((eachFilm) => (
                  <div key={ eachFilm }>
                    { eachFilm }
                  </div>))
              }
            </td>
            <td>{eachPlanet.created}</td>
            <td>{eachPlanet.edited}</td>
            <td>{eachPlanet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
