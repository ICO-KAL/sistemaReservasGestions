import { useState } from 'react';
import Calendario from './calendario.jsx';
import ResumenCheckout from './resumenCheckout.jsx';
import TimeSlots from './timeSlots.jsx';

export default function Registro({ products = [], initialProduct = '', onSubmit, onCancel }) {
    const [customer, setCustomer] = useState('');
    const [product, setProduct] = useState(initialProduct);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [step, setStep] = useState('details');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function confirmReservation() {
        setIsSubmitting(true);
        try {
            await onSubmit({ customer: customer.trim(), product, date, time });
        } finally {
            setIsSubmitting(false);
        }
    }

    if (step === 'summary') {
        return (
            <ResumenCheckout
                customer={customer.trim()}
                date={date}
                isSubmitting={isSubmitting}
                onBack={() => setStep('details')}
                onConfirm={confirmReservation}
                product={products.find((item) => item.id === product)?.name || product}
                time={time}
            />
        );
    }

    return (
        <form
            className="booking-form"
            onSubmit={(event) => {
                event.preventDefault();
                setStep('summary');
            }}
        >
            <section className="panel booking-fields">
                <p className="section-eyebrow">NUEVA RESERVA</p>
                <h2>Datos de la reserva</h2>
                <label className="booking-field">
                    <span>Nombre del cliente</span>
                    <input autoComplete="name" maxLength={80} onChange={(event) => setCustomer(event.target.value)} placeholder="Escribe el nombre del cliente" required value={customer} />
                </label>
                <label className="booking-field">
                    <span>Producto o servicio</span>
                    {products.length ? (
                        <select onChange={(event) => setProduct(event.target.value)} required value={product}>
                            <option disabled value="">Selecciona un producto</option>
                            {products.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                        </select>
                    ) : (
                        <input maxLength={100} onChange={(event) => setProduct(event.target.value)} placeholder="Escribe el producto o servicio" required value={product} />
                    )}
                </label>
                <div className="booking-selection-label">Fecha</div>
                <Calendario onSelectDate={setDate} selectedDate={date} />
                <TimeSlots onChange={setTime} value={time} />
                <div className="booking-actions">
                    <button className="secondary-button" onClick={onCancel} type="button">Cancelar</button>
                    <button className="primary-button" disabled={!date || !time} type="submit">Continuar</button>
                </div>
            </section>
        </form>
    );
}