import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, cleanup} from '@testing-library/react';
import Emergency from '../Emergency';
import {MemoryRouter} from 'react-router-dom';



// mock the hook (used like so in components :
// const { t } = useTranslation(namespaces);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key, i18n: { language: 'en', changeLanguage: jest.fn() } }),
}));

describe('Emergency panel', () => {

  beforeEach(() => {
    render(<MemoryRouter> <Emergency /> </MemoryRouter>);
  });

  it("should render the emergency panel", () => {
    const emergencyTab = screen.getByTestId("emergency-panel");

    expect(emergencyTab).toBeInTheDocument();
  });

});


