import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Calendario from './components/calendario.jsx';
import DetalleProducto from './components/detalleProducto.jsx';
import MisReservas from './components/misReservas.jsx';
import PanelAdministracion from './components/panelAdminstracion.jsx';
import Perfil from './components/perfil.jsx';
import Productos from './components/productos.jsx';
import Registro from './components/registro.jsx';
import './css/dashboard.css';

function Icon({ name, size = 18 }) {
    let shape;
    if (name === 'grid') {
        shape = <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>;
    } else if (name === 'calendar') {
        shape = <><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M7.5 3v4M16.5 3v4M3.5 9.5h17" /><path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" /></>;
    } else if (name === 'box') {
        shape = <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4.5 7.7 7.5 4.4 7.5-4.4M12 12v8.5" /></>;
    } else if (name === 'users') {
        shape = <><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" /><circle cx="10" cy="8" r="3.5" /><path d="M17 11a3.5 3.5 0 0 0 0-6.8M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.3" /></>;
    } else if (name === 'settings') {
        shape = <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.8-.7a8 8 0 0 1-1.6.9l-.3 1.9h-2.8l-.3-1.9a8 8 0 0 1-1.6-.9l-1.8.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.9l-1.4-1.2 1.4-2.4 1.8.7a8 8 0 0 1 1.6-.9l.3-1.9h2.8l.3 1.9a8 8 0 0 1 1.6.9l1.8-.7 1.4 2.4-1.4 1.2a7 7 0 0 1-.1 1.8Z" transform="translate(-1 -1)" /></>;
    } else if (name === 'bell') {
        shape = <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>;
    } else {
        shape = <><path d="M5 12h14M13 6l6 6-6 6" /></>;
    }

    return (
        <svg aria-hidden="true" fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24" width={size}>
            {shape}
        </svg>
    );
}

export default function Dashoard({ onLogout }) {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [reservations, setReservations] = useState([]);
    const [products] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [toast, setToast] = useState('');
    const pageRef = useRef(null);
    const today = new Date();
    const dateLabel = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric' }).format(today);
    const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const monthKey = todayKey.slice(0, 7);
    const activeReservations = reservations.filter((reservation) => reservation.status !== 'Cancelada');
    const reservationsToday = activeReservations.filter((reservation) => reservation.date === todayKey).length;
    const reservationsThisMonth = activeReservations.filter((reservation) => reservation.date.startsWith(monthKey)).length;
    const pendingReservations = activeReservations.filter((reservation) => reservation.status === 'Pendiente').length;

    useLayoutEffect(() => {
        const page = pageRef.current;
        if (!page) return undefined;

        const elements = page.querySelectorAll('[data-reveal]');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const animation = gsap.from(elements, {
            y: prefersReducedMotion ? 0 : 14,
            opacity: prefersReducedMotion ? 1 : 0,
            duration: prefersReducedMotion ? 0 : 0.5,
            stagger: prefersReducedMotion ? 0 : 0.06,
            ease: 'power2.out',
            clearProps: 'all',
        });

        return () => animation.kill();
    }, [activeSection]);

    function notify(message) {
        setToast(message);
        window.setTimeout(() => setToast(''), 2800);
    }

    function openSection(section) {
        setActiveSection(section);
        setIsMobileNavOpen(false);
        setSelectedProduct(null);
    }

    function createReservation(details) {
        setReservations((current) => [
            ...current,
            {
                id: crypto.randomUUID(),
                ...details,
                status: 'Pendiente',
            },
        ]);
        setActiveSection('reservas');
        notify('Reserva agregada a la lista.');
    }

    function cancelReservation(id) {
        setReservations((current) => current.map((reservation) => (
            reservation.id === id ? { ...reservation, status: 'Cancelada' } : reservation
        )));
    }

    return (
        <div className="dashboard-app">
            {isMobileNavOpen && (
                <button aria-label="Cerrar menú" className="sidebar-backdrop" onClick={() => setIsMobileNavOpen(false)} type="button" />
            )}
            <aside className={`sidebar${isMobileNavOpen ? ' is-open' : ''}`} aria-label="Navegación principal">
                <a className="dashboard-brand" href="#dashboard" onClick={() => openSection('dashboard')}>
                    <span className="dashboard-brand-mark"><Icon name="calendar" size={20} /></span>
                    <span className="dashboard-brand-copy"><strong>Reserva</strong><small>SISTEMA DE RESERVAS</small></span>
                </a>
                <div className="workspace-label">
                    <span className="workspace-label-icon"><Icon name="calendar" size={16} /></span>
                    <span>Panel de administración</span>
                </div>
                <p className="sidebar-label">MENÚ PRINCIPAL</p>
                <nav className="sidebar-nav">
                    <button aria-current={activeSection === 'dashboard' ? 'page' : undefined} className={`nav-item${activeSection === 'dashboard' ? ' is-active' : ''}`} onClick={() => openSection('dashboard')} type="button"><Icon name="grid" /><span>Dashboard</span></button>
                    <button aria-current={activeSection === 'reservas' || activeSection === 'registro' ? 'page' : undefined} className={`nav-item${activeSection === 'reservas' || activeSection === 'registro' ? ' is-active' : ''}`} onClick={() => openSection('reservas')} type="button"><Icon name="calendar" /><span>Reservas</span></button>
                    <button aria-current={activeSection === 'calendario' ? 'page' : undefined} className={`nav-item${activeSection === 'calendario' ? ' is-active' : ''}`} onClick={() => openSection('calendario')} type="button"><Icon name="calendar" /><span>Calendario</span></button>
                    <button aria-current={activeSection === 'productos' || activeSection === 'detalleProducto' ? 'page' : undefined} className={`nav-item${activeSection === 'productos' || activeSection === 'detalleProducto' ? ' is-active' : ''}`} onClick={() => openSection('productos')} type="button"><Icon name="box" /><span>Productos</span></button>
                    <button aria-current={activeSection === 'perfil' ? 'page' : undefined} className={`nav-item${activeSection === 'perfil' ? ' is-active' : ''}`} onClick={() => openSection('perfil')} type="button"><Icon name="users" /><span>Perfil</span></button>
                </nav>
                <Perfil compact onLogout={onLogout} />
            </aside>

            <div className="dashboard-main">
                <header className="topbar">
                    <button aria-label="Abrir menú" className="mobile-menu-button" onClick={() => setIsMobileNavOpen(true)} type="button"><span /><span /><span /></button>
                    <div className="topbar-location"><span className="location-pin"><Icon name="calendar" size={14} /></span><span>Panel de administración <span className="location-divider">·</span> Reservas</span></div>
                    <div className="topbar-actions">
                        <button aria-label="Notificaciones" className="icon-button" onClick={() => notify('No hay notificaciones nuevas.')} type="button"><Icon name="bell" size={18} /></button>
                        <button aria-label="Cerrar sesión" className="topbar-avatar" onClick={onLogout} type="button">AD</button>
                    </div>
                </header>

                <main className="workspace" ref={pageRef}>
                    {activeSection === 'dashboard' && (
                        <PanelAdministracion
                            dateLabel={dateLabel}
                            onCancelReservation={cancelReservation}
                            onCreateReservation={() => openSection('registro')}
                            onOpenCalendar={() => openSection('calendario')}
                            onSeeReservations={() => openSection('reservas')}
                            onSelectDate={setSelectedDate}
                            pendingReservations={pendingReservations}
                            productsCount={products.length}
                            reservations={reservations}
                            reservationsThisMonth={reservationsThisMonth}
                            reservationsToday={reservationsToday}
                            selectedDate={selectedDate}
                        />
                    )}
                    {activeSection === 'reservas' && (
                        <section aria-labelledby="page-title">
                            <div className="page-intro" data-reveal>
                                <div><p className="section-eyebrow">GESTIÓN DE RESERVAS</p><h1 id="page-title">Reservas</h1><p className="page-description">Consulta y administra las reservas.</p></div>
                                <button className="primary-button" onClick={() => openSection('registro')} type="button"><span aria-hidden="true">+</span> Nueva reserva</button>
                            </div>
                            <section className="panel content-panel" data-reveal><MisReservas onCancel={cancelReservation} reservations={reservations} /></section>
                        </section>
                    )}
                    {activeSection === 'registro' && (
                        <section aria-labelledby="page-title">
                            <div className="page-intro" data-reveal><div><p className="section-eyebrow">GESTIÓN DE RESERVAS</p><h1 id="page-title">Nueva reserva</h1><p className="page-description">Completa los datos para agregar una reserva.</p></div></div>
                            <Registro initialProduct={selectedProduct?.id || ''} onCancel={() => openSection('reservas')} onSubmit={createReservation} products={products} />
                        </section>
                    )}
                    {activeSection === 'calendario' && (
                        <section aria-labelledby="page-title">
                            <div className="page-intro" data-reveal><div><p className="section-eyebrow">ORGANIZA TU AGENDA</p><h1 id="page-title">Calendario</h1><p className="page-description">Consulta las fechas de tus reservas.</p></div></div>
                            <Calendario onSelectDate={setSelectedDate} reservations={reservations} selectedDate={selectedDate} />
                            <section className="panel content-panel calendar-reservations"><div className="panel-heading"><div><p className="section-eyebrow">AGENDA</p><h2>{selectedDate ? `Reservas del ${selectedDate}` : 'Todas las reservas'}</h2></div></div><MisReservas onCancel={cancelReservation} reservations={selectedDate ? reservations.filter((reservation) => reservation.date === selectedDate) : reservations} /></section>
                        </section>
                    )}
                    {activeSection === 'productos' && (
                        <section aria-labelledby="page-title">
                            <div className="page-intro" data-reveal><div><p className="section-eyebrow">RECURSOS Y PRODUCTOS</p><h1 id="page-title">Productos</h1><p className="page-description">Productos disponibles para asociar con una reserva.</p></div></div>
                            {selectedProduct
                                ? <DetalleProducto onBack={() => setSelectedProduct(null)} onReserve={() => setActiveSection('registro')} product={selectedProduct} />
                                : <Productos onAdd={() => notify('La gestión de productos estará disponible al conectar los datos.')} onSelect={setSelectedProduct} products={products} />}
                        </section>
                    )}
                    {activeSection === 'perfil' && (
                        <section aria-labelledby="page-title">
                            <div className="page-intro" data-reveal><div><p className="section-eyebrow">CUENTA</p><h1 id="page-title">Perfil</h1><p className="page-description">Información de tu cuenta.</p></div></div>
                            <section className="panel profile-page-panel" data-reveal><Perfil onLogout={onLogout} /></section>
                        </section>
                    )}
                </main>
            </div>

            {toast && <div className="toast-message" role="status">{toast}</div>}
        </div>
    );
}
