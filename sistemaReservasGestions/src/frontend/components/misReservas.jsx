import { useMemo, useState } from 'react';

export default function MisReservas({ reservations = [], onCancel, compact = false }) {
    const [filter, setFilter] = useState('Todas');
    const visibleReservations = useMemo(
        () => reservations.filter((reservation) => filter === 'Todas' || reservation.status === filter),
        [filter, reservations],
    );

    return (
        <section className="reservation-list" aria-label="Mis reservas">
            {!compact && (
                <div className="reservation-filter" aria-label="Filtrar reservas">
                    {['Todas', 'Pendiente', 'Confirmada', 'Cancelada'].map((status) => (
                        <button
                            aria-pressed={filter === status}
                            className={`filter-chip${filter === status ? ' is-active' : ''}`}
                            key={status}
                            onClick={() => setFilter(status)}
                            type="button"
                        >
                            {status}
                        </button>
                    ))}
                </div>
            )}
            {visibleReservations.length === 0 ? (
                <div className="empty-reservations">
                    <span className="empty-reservations-icon" aria-hidden="true">▦</span>
                    <div>
                        <strong>{reservations.length ? 'No hay reservas en este estado' : 'Aún no hay reservas'}</strong>
                        <p>{reservations.length ? 'Prueba seleccionando otro filtro.' : 'Cuando registres una reserva, aparecerá aquí.'}</p>
                    </div>
                </div>
            ) : compact ? (
                <div className="reservation-compact-list">
                    {visibleReservations.map((reservation) => (
                        <article className="reservation-compact-item" key={reservation.id}>
                            <span className="reservation-compact-date">{reservation.date.slice(8, 10)}<small>{reservation.time}</small></span>
                            <span className="reservation-compact-info"><strong>{reservation.customer}</strong><small>{reservation.product || '—'}</small></span>
                            <span className={`status-pill status-${reservation.status.toLowerCase()}`}>{reservation.status}</span>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="reservation-table-wrap">
                    <table className="reservation-table">
                        <thead>
                            <tr><th>Cliente</th><th>Servicio</th><th>Fecha y hora</th><th>Estado</th><th><span className="visually-hidden">Acciones</span></th></tr>
                        </thead>
                        <tbody>
                            {visibleReservations.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td data-label="Cliente">{reservation.customer}</td>
                                    <td data-label="Servicio">{reservation.product || '—'}</td>
                                    <td data-label="Fecha y hora">{reservation.date} · {reservation.time}</td>
                                    <td data-label="Estado"><span className={`status-pill status-${reservation.status.toLowerCase()}`}>{reservation.status}</span></td>
                                    <td data-label="Acciones">
                                        {reservation.status !== 'Cancelada' && (
                                            <button className="table-action" onClick={() => onCancel?.(reservation.id)} type="button">Cancelar</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}