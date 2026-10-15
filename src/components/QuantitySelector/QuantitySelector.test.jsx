import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuantitySelector from './QuantitySelector';

describe('QuantitySelector', () => {
  it('по умолчанию отображает значение 1', () => {
    render(<QuantitySelector />);

    expect(screen.getByRole('textbox')).toHaveValue('1');
  });

  it('счётчик не может стать меньше 1 при нажатии «−»', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<QuantitySelector onChange={handleChange} />);

    const minus = screen.getByRole('button', { name: '−' });
    expect(minus).toBeDisabled();

    await user.click(minus);

    expect(screen.getByRole('textbox')).toHaveValue('1');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('после увеличения до 2 и двух уменьшений значение остаётся 1', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<QuantitySelector onChange={handleChange} />);

    await user.click(screen.getByRole('button', { name: '+' }));
    expect(screen.getByRole('textbox')).toHaveValue('2');

    const minus = screen.getByRole('button', { name: '−' });
    await user.click(minus);
    await user.click(minus);

    expect(screen.getByRole('textbox')).toHaveValue('1');
    expect(handleChange).toHaveBeenLastCalledWith(1);
  });

  it('ввод 0 или отрицательного числа приводится к 1', () => {
    render(<QuantitySelector />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '0' } });
    expect(input).toHaveValue('1');

    fireEvent.change(input, { target: { value: '-5' } });
    expect(input).toHaveValue('1');
  });
});
