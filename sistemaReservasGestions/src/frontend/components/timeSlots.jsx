const availableTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

export default function TimeSlots({ value, onChange }) {
    return (
        <fieldset className="booking-fieldset">
            <legend>Horario</legend>
            <div className="time-slot-grid">
                {availableTimes.map((time) => (
                    <button
                        aria-pressed={value === time}
                        className={`time-slot${value === time ? ' is-selected' : ''}`}
                        key={time}
                        onClick={() => onChange(time)}
                        type="button"
                    >
                        {time}
                    </button>
                ))}
            </div>
        </fieldset>
    );
}