import Calendario from './calendario.jsx';
import MisReservas from './misReservas.jsx';

function MetricCard({ icon, label, value, note }) {
    return (
        <article className="metric-card" data-reveal>
            <div className="metric-topline">
                <span>{label}</span>
                <span className="metric-icon" aria-hidden="true">{icon}</span>
            </div>
            <strong className="metric-value">{value}</strong>
            <span className="metric-note">{note}</span>
        </article>
    );
}

export default function PanelAdministracion({
    dateLabel,
    reservations,
    reservationsToday,
    reservationsThisMonth,
    pendingReservations,
    productsCount,
    selectedDate,
    onSelectDate,
    onCancelReservation,
    onCreateReservation,
    onSeeReservations,
    onOpenCalendar,
}) {
    const selectedDateReservations = selectedDate
        ? reservations.filter((reservation) => reservation.date === selectedDate)
        : reservations;

    return (
        <section aria-labelledby="page-title">
            <div className="page-intro" data-reveal>
                <div>
                    <p className="section-eyebrow">RESUMEN DE ACTIVIDAD</p>
                    <h1 id="page-title">Buenos días, Administradora</h1>
                    <p className="page-description">{dateLabel} <span className="date-separator">·</span> Aquí tienes el estado de tus reservas.</p>
                </div>
                <button className="primary-button" onClick={onCreateReservation} type="button"><span aria-hidden="true">+</span> Nueva reserva</button>
            </div>

            <div className="metrics-grid">
                <MetricCard icon="▦" label="Reservas de hoy" value={reservationsToday} note="Reservas para hoy" />
                <MetricCard icon="▦" label="Reservas del mes" value={reservationsThisMonth} note="Reservas este mes" />
                <MetricCard icon="◷" label="Pendientes" value={pendingReservations} note="Por confirmar" />
                <MetricCard icon="◇" label="Productos disponibles" value={productsCount} note="Productos registrados" />
            </div>

            <div className="dashboard-panels">
                <section className="panel activity-panel" data-reveal>
                    <div className="panel-heading">
                        <div><p className="section-eyebrow">SEGUIMIENTO</p><h2>Actividad de reservas</h2></div>
                        <button className="text-button" onClick={onSeeReservations} type="button">Ver reservas <span aria-hidden="true">→</span></button>
                    </div>
                    <MisReservas compact onCancel={onCancelReservation} reservations={reservations.slice(-3).reverse()} />
                </section>
                <Calendario compact onSelectDate={onSelectDate} reservations={reservations} selectedDate={selectedDate} />
            </div>

            <section className="panel upcoming-panel" data-reveal>
                <div className="panel-heading">
                    <div><p className="section-eyebrow">AGENDA</p><h2>Reservas {selectedDate ? `del ${selectedDate}` : 'recientes'}</h2></div>
                    <button className="text-button" onClick={onOpenCalendar} type="button">Abrir calendario <span aria-hidden="true">→</span></button>
                </div>
                <MisReservas compact onCancel={onCancelReservation} reservations={selectedDateReservations.slice(-4).reverse()} />
            </section>
        </section>
    );
}