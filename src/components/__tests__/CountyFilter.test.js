import '@testing-library/jest-dom'
import { render, screen, fireEvent, cleanup, getByLabelText} from '@testing-library/react';
import CountyFilter from '../filter/CountyFilter';
import {MemoryRouter} from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';


jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  }
}));

describe('County Filter', () => {

  beforeEach(() => {
    render(<MemoryRouter> <CountyFilter /> </MemoryRouter>);
  });

  it("should render the County Filter", () => {
    const countyFilter = screen.getByTestId("county");

    expect(countyFilter).toBeInTheDocument();

  });


});


