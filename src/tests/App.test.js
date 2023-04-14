import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import PlanetProvider from '../Provider/PlanetProvider';
import testData from '../../cypress/mocks/testData.js';

describe('Teste do componente App', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ 
      json: jest.fn().mockResolvedValue(testData)
    })
  }); 

  test('Teste se os filtros e o botão estão sendo renderizados', async () => {
    render (<PlanetProvider><App /></PlanetProvider>);

    //considerar os dois carregando que tem antes de renderizar
    const name = await screen.findByTestId('name-filter');
    expect(name).toBeVisible();

    const column = screen.getByTestId('column-filter');
    expect(column).toBeVisible();

    const comparison = screen.getByTestId('comparison-filter');
    expect(comparison).toBeVisible();

    const value = screen.getByTestId('value-filter');
    expect(value).toBeVisible();

    const button = screen.getByTestId('button-filter');
    expect(button).toBeVisible();
  });
  
  test('Teste se a tabela está sendo renderizada', () => {
    render (<PlanetProvider><App /></PlanetProvider>);
  
    const name = screen.getByText('Name');
    const RotationPeriod = screen.getByText('Rotation Period');

    expect(name).toBeVisible();
    expect(RotationPeriod).toBeVisible();
  });

  test('Teste se o filtro de nome funciona', async () => {
    render (<PlanetProvider><App /></PlanetProvider>);

    // waitFor(async () => {
      const name = await screen.findByTestId('name-filter');
      userEvent.type(name, 'Tatoo');
      const tatooine = await screen.findByRole('cell', { name: /tatooine/i });
      expect(tatooine).toBeInTheDocument();   
    // }, {timeout: 5000});
  });
  
  test('Teste se o botão de remover odos os filtros funciona e atualiza a lista de planetas', async () => {
    render (<PlanetProvider><App /></PlanetProvider>);

  // waitFor(async () => {
    // aplicando filtro diameter
    const selectColuna = await screen.findByTestId('column-filter');
    userEvent.selectOptions(selectColuna, 'diameter');

    const selectOperador = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(selectOperador, 'menor que');

    const searchNumberInput = await screen.findByTestId('value-filter');
    userEvent.type(searchNumberInput, '8900');

    const filterBtn = screen.getByRole('button', {  name: /filtrar/i})
    userEvent.click(filterBtn);

    const hoth = await screen.findByRole('cell', { name: /hoth/i });
    await waitFor(() => {
      expect(hoth).toBeInTheDocument();
    });

      
    // deletando todos os filtros
    const deleteAllBtn = screen.getByRole('button', {  name: /remover todas filtragens/i})
    userEvent.click(deleteAllBtn);
  
    const tatooine = await screen.findByRole('cell', { name: /tatooine/i });
    expect(tatooine).toBeInTheDocument();
  
  // }, {timeout: 5000}); 
  });

  test('Teste se o botão de deletar filtros está funcionando', async () => {
    render (<PlanetProvider><App /></PlanetProvider>);

  // waitFor(async () => {
    // aplicando filtro diameter
    const selectColuna = await screen.findByTestId('column-filter');
    userEvent.selectOptions(selectColuna, 'diameter');

    const selectOperador = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(selectOperador, 'menor que');

    const searchNumberInput = await screen.findByTestId('value-filter');
    userEvent.type(searchNumberInput, '8900');

    const filterBtn = screen.getByRole('button', {  name: /filtrar/i})
    userEvent.click(filterBtn);

    const hoth = await screen.findByRole('cell', { name: /hoth/i });
    await waitFor(() => {
      expect(hoth).toBeInTheDocument();
    });

    // aplicando filtro surface_water
    userEvent.selectOptions(selectColuna, 'surface_water');
    userEvent.selectOptions(selectOperador, 'igual a');
    userEvent.type(searchNumberInput, '8');
    userEvent.click(filterBtn);

    const deleteBtn = screen.getAllByRole('button', {  name: /x/i});
    expect(deleteBtn).toHaveLength(2);

    // deletando filtro 
    userEvent.click(deleteBtn[0]);
    const deleteBtnAfterClick = screen.getAllByRole('button', {  name: /x/i});
    screen.logTestingPlaygroundURL()
    expect(deleteBtnAfterClick).toHaveLength(1);
  
  // }, {timeout: 5000}); 

  });
});

 // test('Teste se o filtro coluna funciona junto com o filtro comparison e o input de números e se o botão de excluir filtro funciona e atualiza a filtragem dos planetas depois de ser executado ', async () => {
  //   render (<PlanetProviderMock><App /></PlanetProviderMock>);

  // // waitFor(async () => {
  //   // aplicando filtro diameter
  //   const selectColuna = await screen.findByTestId('column-filter');
  //   userEvent.selectOptions(selectColuna, 'diameter');

  //   const selectOperador = await screen.findByTestId('comparison-filter');
  //   userEvent.selectOptions(selectOperador, 'menor que');

  //   const searchNumberInput = await screen.findByTestId('value-filter');
  //   userEvent.type(searchNumberInput, '8900');

  //   const filterBtn = screen.getByRole('button', {  name: /filtrar/i})
  //   userEvent.click(filterBtn);

  //   const hoth = await screen.findByRole('cell', { name: /hoth/i });
  //   await waitFor(() => {
  //     expect(hoth).toBeInTheDocument();
  //   });

  //   const coruscant = screen.queryByText('Coruscant');
  //   expect(coruscant).not.toBeInTheDocument();

  //   // aplicando filtro surface_water
  //   userEvent.selectOptions(selectColuna, 'surface_water');
  //   userEvent.selectOptions(selectOperador, 'igual a');
  //   userEvent.type(searchNumberInput, '8');
  //   userEvent.click(filterBtn);

  //   const endor = await screen.findByRole('cell', { name: /endor/i });
  //   await waitFor(() => {
  //     expect(endor).toBeInTheDocument();
  //   });
  //   expect(hoth).not.toBeInTheDocument();

  //   // deletando filtro surface_water
  //   const deleteBtn = screen.getByRole('button', {  name: /x/i});
  //   expect(deleteBtn).toBeVisible();
  //   userEvent.click(deleteBtn);
    
  //   expect(hoth).toBeInTheDocument();
   
  //   // deletando todos os filtros
  //   const deleteAllBtn = screen.getByRole('button', {  name: /remover todas filtragens/i})
  //   userEvent.click(deleteAllBtn);
  
  //   const tatooine = await screen.findByRole('cell', { name: /tatooine/i });
  //   expect(tatooine).toBeInTheDocument();
  
  // // }, {timeout: 5000}); 
  
  // });

// const table = screen.getByRole('table');
// const tbody = table.querySelector('tbody');
// const rows = tbody.querySelectorAll('tr');
// expect(rows).toHaveLength(3);