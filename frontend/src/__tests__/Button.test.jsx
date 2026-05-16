import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

// ЛР 9: тест компонента кнопки.
describe('Button', () => {
    it('отображает переданный текст', () => {
        render(<Button>Нажми меня</Button>);
        expect(screen.getByRole('button', { name: 'Нажми меня' })).toBeInTheDocument();
    });

    it('вызывает onClick при нажатии', () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Клик</Button>);
        fireEvent.click(screen.getByRole('button', { name: 'Клик' }));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('не вызывает onClick если disabled', () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick} disabled>Отключено</Button>);
        fireEvent.click(screen.getByRole('button', { name: 'Отключено' }));
        expect(onClick).not.toHaveBeenCalled();
    });

    it('пробрасывает type="submit"', () => {
        render(<Button type="submit">Отправить</Button>);
        expect(screen.getByRole('button', { name: 'Отправить' })).toHaveAttribute('type', 'submit');
    });

    it('по умолчанию type="button"', () => {
        render(<Button>Кнопка</Button>);
        expect(screen.getByRole('button', { name: 'Кнопка' })).toHaveAttribute('type', 'button');
    });
});
