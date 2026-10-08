import { useMemo, useState } from 'react';

function toDateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function Calendario({ reservations = [], selectedDate, onSelectDate, compact = false }) {
    const [visibleMonth, setVisibleMonth] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingDays = (new Date(year, month, 1).getDay() + 6) % 7;
    const monthLabel = useMemo(
        () => new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' }).format(visibleMonth),
        [visibleMonth],
    );
    const reservationsByDate = new Set(
        reservations
            .filter((reservation) => reservation.status !== 'Cancelada')
            .map((reservation) => reservation.date),
    );
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    function moveMonth(offset) {
        setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
    }

    return (
        <section className={`panel calendar-panel${compact ? ' is-compact' : ''}`} aria-labelledby="calendar-title">
            <div className="panel-heading">
                <div>
                    <p className="section-eyebrow">ORGANIZA TU AGENDA</p>
                    <h2 id="calendar-title">Calendario</h2>
                </div>
                <div className="calendar-month-controls">
                    <button aria-label="Mes anterior" className="calendar-month-button" onClick={() => moveMonth(-1)} type="button">‹</button>
                    <span className="calendar-month">{monthLabel}</span>
                    <button aria-label="Mes siguiente" className="calendar-month-button" onClick={() => moveMonth(1)} type="button">›</button>
                </div>
            </div>
            <div className="calendar-grid" aria-label={`Calendario de ${monthLabel}`}>
                {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
                    <span className="calendar-weekday" key={`${day}-${index}`}>{day}</span>
                ))}
                {Array.from({ length: leadingDays }, (_, index) => (
                    <span aria-hidden="true" className="calendar-blank" key={`blank-${index}`} />
                ))}
                {days.map((day) => {
                    const dateKey = toDateKey(year, month, day);
                    const now = new Date();
                    const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
                    const hasReservation = reservationsByDate.has(dateKey);
                    return (
                        <button
                            aria-current={isToday ? 'date' : undefined}
                            aria-label={`${day} de ${monthLabel}${hasReservation ? ', tiene reservas' : ''}`}
                            aria-pressed={selectedDate === dateKey}
                            className={`calendar-day${isToday ? ' is-today' : ''}${selectedDate === dateKey ? ' is-selected' : ''}${hasReservation ? ' has-reservation' : ''}`}
                            key={dateKey}
                            onClick={() => onSelectDate?.(dateKey)}
                            type="button"
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
            <div className="calendar-footnote">
                <span className="calendar-legend-dot" />
                <span>Fechas con reservas</span>
            </div>
        </section>
    );
}