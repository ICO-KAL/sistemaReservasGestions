import { useState } from 'react';
import './css/login.css';

export default function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage('');
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/${isRegistering ? 'register' : 'login'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    isRegistering ? { name, email, password } : { email, password },
                ),
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || result.Error || 'No se pudo completar la solicitud.');
            }

            if (isRegistering) {
                setIsRegistering(false);
                setPassword('');
                setIsError(false);
                setMessage('Tu cuenta está lista. Inicia sesión para continuar.');
            } else {
                sessionStorage.setItem('token', result.token);
                setIsError(false);
                setMessage('Sesión iniciada correctamente.');
            }
        } catch (error) {
            setIsError(true);
            setMessage(
                error instanceof TypeError
                    ? 'No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.'
                    : error.message,
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    function toggleMode() {
        setIsRegistering((currentMode) => !currentMode);
        setShowPassword(false);
        setMessage('');
    }

    return (
        <main className="login-page">
            <section className="login-shell" aria-label="Acceso a Reserva">
                <div className="login-intro">
                    <a className="brand" href="/" aria-label="Reserva, inicio">
                        <span className="brand-mark" aria-hidden="true">*</span>
                        <span>reserva</span>
                    </a>

                    <div className="intro-copy">
                        <p className="eyebrow">TODO EN SU LUGAR</p>
                        <h1>Tu espacio,<br />bien organizado.</h1>
                        <p className="intro-description">
                            Gestiona recursos, reservas y disponibilidad desde un solo lugar.
                        </p>
                    </div>

                    <p className="intro-footer">Una mejor forma de recibir.</p>
                    <span className="intro-orbit intro-orbit-one" aria-hidden="true" />
                    <span className="intro-orbit intro-orbit-two" aria-hidden="true" />
                </div>

                <div className="login-panel">
                    <div className="mobile-brand" aria-hidden="true">
                        <span className="brand-mark">*</span>
                        <span>reserva</span>
                    </div>

                    <div className="form-heading">
                        <p className="eyebrow">{isRegistering ? 'EMPIEZA HOY' : 'QUÉ BUENO VERTE'}</p>
                        <h2>{isRegistering ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}</h2>
                        <p>
                            {isRegistering
                                ? 'Completa tus datos para comenzar.'
                                : 'Ingresa tus datos para acceder a tu cuenta.'}
                        </p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        {isRegistering && (
                            <label className="field">
                                <span>Nombre</span>
                                <input
                                    autoComplete="name"
                                    maxLength={50}
                                    name="name"
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="Tu nombre"
                                    required
                                    value={name}
                                />
                            </label>
                        )}

                        <label className="field">
                            <span>Correo electrónico</span>
                            <input
                                autoComplete="email"
                                name="email"
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="nombre@correo.com"
                                required
                                type="email"
                                value={email}
                            />
                        </label>

                        <label className="field">
                            <span>Contraseña</span>
                            <span className="password-wrap">
                                <input
                                    autoComplete={isRegistering ? 'new-password' : 'current-password'}
                                    minLength={isRegistering ? 8 : undefined}
                                    name="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder={isRegistering ? 'Mínimo 8 caracteres' : 'Ingresa tu contraseña'}
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                />
                                <button
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                    className="password-toggle"
                                    onClick={() => setShowPassword((visible) => !visible)}
                                    type="button"
                                >
                                    {showPassword ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </span>
                        </label>

                        {message && (
                            <p className={`form-message${isError ? ' is-error' : ' is-success'}`} role="status">
                                {message}
                            </p>
                        )}

                        <button className="submit-button" disabled={isSubmitting} type="submit">
                            {isSubmitting
                                ? 'Un momento...'
                                : isRegistering
                                    ? 'Crear cuenta'
                                    : 'Iniciar sesión'}
                        </button>
                    </form>

                    <p className="mode-switch">
                        {isRegistering ? '¿Ya tienes una cuenta?' : '¿Aún no tienes una cuenta?'}{' '}
                        <button onClick={toggleMode} type="button">
                            {isRegistering ? 'Inicia sesión' : 'Crea una cuenta'}
                        </button>
                    </p>
                </div>
            </section>
        </main>
    );
}