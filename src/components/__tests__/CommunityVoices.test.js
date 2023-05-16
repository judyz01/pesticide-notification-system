import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, cleanup} from '@testing-library/react';
import CommunityVoices from '../CommunityVoices';
import {MemoryRouter} from 'react-router-dom';



// mock the hook (used like so in components :
// const { t } = useTranslation(namespaces);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key, i18n: { language: 'en', changeLanguage: jest.fn() } }),
}));

describe('CommunityVoices panel', () => {

  beforeEach(() => {
    render(<MemoryRouter> <CommunityVoices /> </MemoryRouter>);
  });

  it("should render the community panel", () => {
    const communityTab = screen.getByTestId("community-panel");

    expect(communityTab).toBeInTheDocument();

  });

});


