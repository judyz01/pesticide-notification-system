import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, within, getByTestId, cleanup} from '@testing-library/react';
import Resources from '../Resources';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';



// mock the hook (used like so in components :
// const { t } = useTranslation(namespaces);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key, i18n: { language: 'en', changeLanguage: jest.fn() } }),
}));

describe('Reources', () => {

  beforeEach(() => {
    render(<MemoryRouter> <Resources /> </MemoryRouter>);
  });

  it("should render the resources panel", () => {
    const resources = screen.getByTestId("resources");

    expect(resources).toBeInTheDocument();

  });

  it("should be able to click the accordians", () => {
    const homeAccordian = screen.getByTestId("accordian-home");
    const workAccordian = screen.getByTestId("accordian-work");


    expect(homeAccordian).toBeInTheDocument();
    expect(workAccordian).toBeInTheDocument();

    fireEvent.click(homeAccordian);
    fireEvent.click(workAccordian);
    fireEvent.click(homeAccordian);

  });

  it("should be able to click the checkboxes", () => {
    const homeAccordian = screen.getByTestId("accordian-home");

    expect(homeAccordian).toBeInTheDocument();

    fireEvent.click(homeAccordian);

    const checkbox = screen.getByTestId('checkbox-list-label-1');
    fireEvent.click(checkbox);

    const pain = screen.getByTestId('CheckBoxIcon');
    fireEvent.click(pain);

  });





});


