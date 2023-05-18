import '@testing-library/jest-dom'
import { render, screen, fireEvent, cleanup, getByLabelText} from '@testing-library/react';
import Navbar from '../Navbar';
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

describe('Navbar', () => {

  beforeEach(() => {
    render(<MemoryRouter> <Navbar /> </MemoryRouter>);
  });

  it("should render the navigation buttons", () => {
    const homeTab = screen.getByTestId("Home");
    const archiveTab = screen.getByTestId("Archive");
    const resourcesTab = screen.getByTestId("Resources");

    expect(homeTab).toBeInTheDocument();
    expect(archiveTab).toBeInTheDocument();
    expect(resourcesTab).toBeInTheDocument();

  });

  it("should render the davis logo image", () => {
    const davisLogo = screen.getByTestId("davis-logo");
    expect(davisLogo).toBeInTheDocument();
  });


  it("should render the language button", () => {
    const languageButton = screen.getByTestId("language");
    expect(languageButton).toBeInTheDocument();
  });

  it("should show hamburger menu when screen size is below 600", () => {

    const menuIcon = screen.getByTestId("menu-icon");


    global.innerWidth = 599;
    global.dispatchEvent(new Event('resize'));

    expect(menuIcon).toBeVisible();

    expect(screen.getByTestId("Home")).toBeTruthy();
    expect(screen.getByTestId("Archive")).toBeTruthy();
    expect(screen.getByTestId("Resources")).toBeTruthy();
  });

  it("should be able to resize window width", () => {
    global.innerWidth = 599;
    global.dispatchEvent(new Event('resize'));

    global.innerWidth = 1200;
    global.dispatchEvent(new Event('resize'));

  });

  it("should be able to click all the navigation tabs", () => {

    const homeTab = screen.getByTestId("Home");
    const archiveTab = screen.getByTestId("Archive");
    const resourcesTab = screen.getByTestId("Resources");

    expect(homeTab).toBeInTheDocument();
    expect(archiveTab).toBeInTheDocument();
    expect(resourcesTab).toBeInTheDocument();

    fireEvent.click(homeTab);
    fireEvent.click(archiveTab);
    fireEvent.click(resourcesTab);
  });

  it("should be able to click the language button", () => {
    const languageButton = screen.getByTestId("language");
    expect(languageButton).toBeInTheDocument();

    fireEvent.click(languageButton);
    expect(languageButton).toBeVisible();

  });

  it("should be able to click the menu icon in mobile view", () => {
    global.innerWidth = 599;
    global.dispatchEvent(new Event('resize'));

    const menuIcon = screen.getByTestId("menu-icon");
    expect(menuIcon).toBeVisible();

    fireEvent.click(menuIcon);

  });

  // it("should be able to make menu disappear by clicking away", () => {
  //   // const onClickAway = jest.fn();

  //   global.innerWidth = 599;
  //   global.dispatchEvent(new Event('resize'));

  //   // render(<ClickAwayListener onClickAway={() => setShowMenu(false)}/>);

  //   const menuIcon = screen.getByTestId("menu-icon");
  //   fireEvent.click(menuIcon);

  //   fireEvent.click(window);

  //   // expect(onClickAway).toHaveBeenCalled();
  // });


});


