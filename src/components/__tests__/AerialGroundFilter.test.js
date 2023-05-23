import '@testing-library/jest-dom'
import { render, screen, fireEvent, cleanup, getByLabelText} from '@testing-library/react';
import AerialGroundFilter from '../filter/AerialGroundFilter';
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

describe('Aerial Ground Filter', () => {

  beforeEach(() => {
    render(<AerialGroundFilter />);
  });

  it("should render the Aerial Ground Filter", () => {
    const aerialGroundFilter = screen.getByTestId("aerialground");

    expect(aerialGroundFilter).toBeInTheDocument();

  });


});


