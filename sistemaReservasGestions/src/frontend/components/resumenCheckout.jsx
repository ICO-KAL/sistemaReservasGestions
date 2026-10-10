export default function ResumenCheckout({ customer, product, date, time, onBack, onConfirm, isSubmitting = false }) {
    return (
        <section className="panel checkout-panel" aria-labelledby="checkout-title">
            <p className="section-eyebrow">CONFIRMA LOS DATOS</p>
            <h2 id="checkout-title">Resumen de reserva</h2>
            <dl className="checkout-summary">
                <div><dt>Cliente</dt><dd>{customer || '—'}</dd></div>
                <div><dt>Producto o servicio</dt><dd>{product || '—'}</dd></div>
                <div><dt>Fecha</dt><dd>{date || '—'}</dd></div>
                <div><dt>Horario</dt><dd>{time || '—'}</dd></div>
            </dl>
            <div className="checkout-actions">
                <button className="secondary-button" onClick={onBack} type="button">Volver</button>
                <button className="primary-button" disabled={isSubmitting} onClick={onConfirm} type="button">
                    {isSubmitting ? 'Guardando…' : 'Confirmar reserva'}
                </button>
            </div>
        </section>
    );
}