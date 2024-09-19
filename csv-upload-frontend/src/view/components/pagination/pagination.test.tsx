/**
*
* Pagination component test case
* @author - Faizal
* @date   - 19th September 2024
*
***/
// REACT IMPORT
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './index';

describe('Pagination Component', () => {
  
  const mockOnPageChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render pagination if totalPages is 1', () => {
    render(<Pagination totalPages={1} currentPage={1} onPageChange={mockOnPageChange} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should render correct pagination buttons', () => {
    render(<Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Last')).toBeInTheDocument();

    // Check page numbers
    expect(screen.getByText('5')).toHaveClass('active-pagination');
    expect(screen.getByText('4')).toHaveClass('inactive-pagination');
  });

  it('should call onPageChange when clicking next and prev', () => {
    render(<Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />);

    const nextButton = screen.getByText('Next');
    const prevButton = screen.getByText('Prev');

    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(6);

    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('should disable next button on the last page', () => {
    render(<Pagination totalPages={10} currentPage={10} onPageChange={mockOnPageChange} />);

    const nextButton = screen.getByText('Next');
    const lastButton = screen.getByText('Last');

    expect(nextButton).toBeDisabled();
    expect(lastButton).toBeDisabled();
  });

  it('should disable prev button on the first page', () => {
    render(<Pagination totalPages={10} currentPage={1} onPageChange={mockOnPageChange} />);

    const prevButton = screen.getByText('Prev');
    const firstButton = screen.getByText('First');

    expect(prevButton).toBeDisabled();
    expect(firstButton).toBeDisabled();
  });

  it('should render up to max 10 pages', () => {
    render(<Pagination totalPages={50} currentPage={25} onPageChange={mockOnPageChange} />);

    // Check that there are 10 page buttons
    const pageButtons = screen.getAllByRole('button');
    const pageNumbers = pageButtons.filter(btn => !['First', 'Prev', 'Next', 'Last'].includes(btn.textContent || ''));
    expect(pageNumbers).toHaveLength(10);

    // The current page should be active
    expect(screen.getByText('25')).toHaveClass('active-pagination');
  });
});
