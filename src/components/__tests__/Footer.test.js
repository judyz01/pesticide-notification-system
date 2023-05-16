import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, cleanup} from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {

  beforeEach(() => {
    render(<Footer />);
  });

  it("should render the footer", () => {
    const footer = screen.getByTestId("footer");

    expect(footer).toBeInTheDocument();
  });

});
