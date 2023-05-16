import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, cleanup} from '@testing-library/react';
import HomePanel from '../HomePanel';
import {MemoryRouter} from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views-react-18-fix';



// mock the hook (used like so in components :
// const { t } = useTranslation(namespaces);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key, i18n: { language: 'en', changeLanguage: jest.fn() } }),
}));

describe('Home tab panel', () => {

  beforeEach(() => {
    render(<MemoryRouter> <HomePanel /> </MemoryRouter>);
  });

  it("should render the tab buttons", () => {
    const emergencyTab = screen.getByTestId("emergency-tab");
    const communityTab = screen.getByTestId("community-tab");

    expect(emergencyTab).toBeInTheDocument();
    expect(communityTab).toBeInTheDocument();

  });

  it("should render the tab panel", () => {
    const tabPanel = screen.getByRole('tabpanel');

    expect(tabPanel).toBeInTheDocument();
  });

  it("should be able to click both tabs", () => {
    const emergencyTab = screen.getByTestId("emergency-tab");
    const communityTab = screen.getByTestId("community-tab");

    fireEvent.click(communityTab);
    fireEvent.click(emergencyTab);

  });

  // it("should handle indexes when a tab is clicked", () => {

  //   const emergencyTab = screen.getByTestId("emergency-tab");
  //   const communityTab = screen.getByTestId("community-tab");

  //   const handleChangeIndexMock = jest.fn();

  //   const swipeTab = render(<SwipeableViews onChangeIndex={handleChangeIndexMock} />);

  //   fireEvent.click(communityTab);

  // });


  // it("", () => {


  // });


});


