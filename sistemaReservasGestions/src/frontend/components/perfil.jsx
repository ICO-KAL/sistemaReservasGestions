export default function Perfil({ onLogout, compact = false }) {
    return (
        <div className={`profile-summary${compact ? ' is-compact' : ''}`}>
            <span className="profile-avatar">AD</span>
            <span className="profile-details">
                <strong>Administradora</strong>
                <small>Gestión de reservas</small>
            </span>
            {!compact && <button className="profile-logout-button" onClick={onLogout} type="button">Cerrar sesión</button>}
            {compact && <button aria-label="Cerrar sesión" className="profile-logout-button" onClick={onLogout} type="button">↗</button>}
        </div>
    );
}