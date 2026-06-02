import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FilterItem } from './FilterItem';

describe('Molecule: FilterItem', () => {
  const mockProps = {
    label: 'Pendientes',
    count: 5,
    isSelected: false,
    onToggle: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render the linked label and checkbox', () => {
    render(<FilterItem {...mockProps} />);

    // Search for the text, then scroll up until you find the <label> element.
    const labelContainer = screen.getByText('Pendientes').closest('label');
    const checkbox = screen.getByRole('checkbox');

    expect(labelContainer).toBeInTheDocument();

    // labelContainer is the <label> and has the 'for' attribute
    expect(checkbox).toHaveAttribute('id', labelContainer?.getAttribute('for'));
    expect(checkbox).not.toBeChecked();
  });

  it('badge in the DOM, if isSelected is false', () => {
    render(<FilterItem {...mockProps} isSelected={false} />);

    const badge = screen.getByText('5');

    // toBeVisible() instead toBeInTheDocument()
    // render not visible.
    expect(badge).not.toBeVisible();
  });

  it('badge visible if isSelected is true', () => {
    render(<FilterItem {...mockProps} isSelected={true} />);

    const badge = screen.getByText('5');
    expect(badge).toBeVisible();
  });

  it('not render the badge if the count is 0', () => {
    render(<FilterItem {...mockProps} isSelected={true} count={0} />);

    // queryByText for {count > 0 && ...}
    // remove elem DOM.
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('call onToggle in the click on the label (entire row)', () => {
    render(<FilterItem {...mockProps} />);

    // label, click in text
    fireEvent.click(screen.getByText('Pendientes'));

    expect(mockProps.onToggle).toHaveBeenCalledTimes(1);
  });

  it('display the overflow count if it exceeds the limit', () => {
    render(<FilterItem {...mockProps} isSelected={true} count={1500} />);
    expect(screen.getByText('999+')).toBeVisible();
  });
});
