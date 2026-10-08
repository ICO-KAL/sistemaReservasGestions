import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './css/login.css';

export default function Login({ onAuthenticated }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isClosingRegistration, setIsClosingRegistration] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const registrationDialogRef = useRef(null);

    useLayoutEffect(() => {
        if (!isRegistering) return undefined;

        const dialog = registrationDialogRef.current;
        if (!dialog) return undefined;

        if (!dialog.open) dialog.showModal();

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const animationDuration = prefersReducedMotion ? 0.55 : 0.9;

        gsap.set(dialog, {
            transformOrigin: 'center center',
            scale: 0.08,
            rotation: 14,
            opacity: 0,
            filter: 'blur(8px)',
            clipPath: 'circle(42% at 50% 50%)',
            borderRadius: '50%',
        });

        const openingAnimation = gsap.timeline();
        openingAnimation.to(dialog, {
            scale: 0.72,
            rotation: -8,
            opacity: 1,
            filter: 'blur(2px)',
            clipPath: 'circle(46% at 50% 50%)',
            borderRadius: '34%',
            duration: animationDuration * 0.58,
            ease: prefersReducedMotion ? 'power1.out' : 'power2.out',
        });
        openingAnimation.to(dialog, {
            scale: 1.035,
            rotation: 2,
            filter: 'blur(0px)',
               clipPath: 'inset(0% round 10px)',
            borderRadius: '4px',
            duration: animationDuration * 0.27,
            ease: 'power2.out',
        });
        openingAnimation.to(dialog, {
            scale: 1,
            rotation: 0,
               clipPath: 'inset(0% round 8px)',
            borderRadius: '8px',
            duration: animationDuration * 0.15,
            ease: 'power1.out',
        });

        return () => gsap.killTweensOf(dialog);
    }, [isRegistering]);

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
                closeRegistration();
                setPassword('');
                setIsError(false);
                setMessage('Tu cuenta está lista. Inicia sesión para continuar.');
            } else {
                sessionStorage.setItem('token', result.token);
                setIsError(false);
                onAuthenticated();
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

    function openRegistration() {
        setIsRegistering(true);
        setIsClosingRegistration(false);
        setShowPassword(false);
        setMessage('');
    }

    function closeRegistration() {
        if (isClosingRegistration) return;

        const dialog = registrationDialogRef.current;
        if (!dialog?.open) {
            setIsRegistering(false);
            return;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const animationDuration = prefersReducedMotion ? 0.55 : 0.9;
        gsap.killTweensOf(dialog);

        setIsClosingRegistration(true);

        const closeAnimation = gsap.timeline({
            onComplete: () => {
                dialog.close();
                setIsRegistering(false);
                setIsClosingRegistration(false);
            },
        });
        closeAnimation.to(dialog, {
            scale: 0.72,
            rotation: -8,
            filter: 'blur(2px)',
            clipPath: 'circle(46% at 50% 50%)',
            borderRadius: '34%',
            duration: animationDuration * 0.3,
            ease: 'power1.inOut',
        });
        closeAnimation.to(dialog, {
            scale: 0.08,
            rotation: 14,
            opacity: 0,
            filter: 'blur(8px)',
            clipPath: 'circle(42% at 50% 50%)',
            borderRadius: '50%',
            duration: animationDuration * 0.7,
            ease: prefersReducedMotion ? 'power1.in' : 'power2.in',
        });
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
                        <p className="eyebrow">QUÉ BUENO VERTE</p>
                        <h2>Bienvenido de nuevo</h2>
                        <p>Ingresa tus datos para acceder a tu cuenta.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
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
                                    autoComplete="current-password"
                                    name="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="Ingresa tu contraseña"
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
                            {isSubmitting ? 'Un momento...' : 'Iniciar sesión'}
                        </button>
                    </form>

                    {message && !isRegistering && (
                        <p className={`form-message${isError ? ' is-error' : ' is-success'}`} role="status">
                            {message}
                        </p>
                    )}

                    <p className="mode-switch">
                        ¿Aún no tienes una cuenta?{' '}
                        <button onClick={openRegistration} type="button">Crea una cuenta</button>
                    </p>
                </div>
            </section>

            {isRegistering && (
                <dialog
                    ref={registrationDialogRef}
                    className={`registration-dialog${isClosingRegistration ? ' is-closing' : ''}`}
                    onCancel={(event) => {
                        event.preventDefault();
                        closeRegistration();
                    }}
                    onClick={(event) => {
                        if (event.target === event.currentTarget) closeRegistration();
                    }}
                    aria-labelledby="registration-title"
                >
                    <button
                        aria-label="Cerrar registro"
                        className="registration-close"
                        onClick={closeRegistration}
                        type="button"
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                    <div className="form-heading">
                        <p className="eyebrow">EMPIEZA HOY</p>
                        <h2 id="registration-title">Crea tu cuenta</h2>
                        <p>Completa tus datos para comenzar.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
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
                                    autoComplete="new-password"
                                    minLength={8}
                                    name="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="Mínimo 8 caracteres"
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
                            {isSubmitting ? 'Un momento...' : 'Crear cuenta'}
                        </button>
                    </form>

                    <p className="mode-switch">
                        ¿Ya tienes una cuenta?{' '}
                        <button onClick={closeRegistration} type="button">Inicia sesión</button>
                    </p>
                </dialog>
            )}
        </main>
    );
}