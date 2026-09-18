'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const emailPattern = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$';
const passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$';
const rememberedCredentialsKey = 'flora-you-remembered-credentials';
const accessTokenKey = 'flora-you-access-token';
const refreshTokenKey = 'flora-you-refresh-token';

type RememberedCredentials = {
	email: string;
	password: string;
};

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [loginError, setLoginError] = useState('');
	const [loginSuccess, setLoginSuccess] = useState('');
	const hasLoadedRememberedCredentials = useRef(false);

	useEffect(() => {
		const savedCredentials = localStorage.getItem(rememberedCredentialsKey);
		if (!savedCredentials) {
			hasLoadedRememberedCredentials.current = true;
			return;
		}

		try {
			const credentials = JSON.parse(savedCredentials) as RememberedCredentials;
			setEmail(credentials.email ?? '');
			setPassword(credentials.password ?? '');
			setRemember(true);
		} catch {
			localStorage.removeItem(rememberedCredentialsKey);
		}
		hasLoadedRememberedCredentials.current = true;
	}, []);

	useEffect(() => {
		if (!hasLoadedRememberedCredentials.current) return;

		if (remember && email && password) {
			localStorage.setItem(rememberedCredentialsKey, JSON.stringify({ email, password }));
		} else if (!remember) {
			localStorage.removeItem(rememberedCredentialsKey);
		}
	}, [email, password, remember]);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!event.currentTarget.reportValidity()) return;

		setIsSubmitting(true);
		setLoginError('');
		setLoginSuccess('');

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:30000'}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});
			const result = await response.json().catch(() => null);

			if (!response.ok) {
				throw new Error(result?.message ?? 'Email or password is incorrect');
			}

			if (result?.access_token) localStorage.setItem(accessTokenKey, result.access_token);
			if (result?.refresh_token) localStorage.setItem(refreshTokenKey, result.refresh_token);
			router.push('/home');
		} catch (error) {
			setLoginError(error instanceof Error ? error.message : 'Unable to connect to the server');
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-white px-8 py-8 text-[#285b0f] sm:px-8">
			<div className="pointer-events-none absolute -left-32 top-[-12%] h-96 w-96 rounded-full bg-[#FFD478]/40 blur-[100px]" />
			<div className="pointer-events-none absolute right-[-12%] top-[4%] h-[28rem] w-[28rem] rounded-full bg-[#B5C99A]/40 blur-[110px]" />
			<div className="pointer-events-none absolute bottom-[-18%] left-[2%] h-[28rem] w-[28rem] rounded-full bg-[#B5C99A]/40 blur-[110px]" />
			<div className="pointer-events-none absolute bottom-[-16%] right-[6%] h-96 w-96 rounded-full bg-[#FFD478]/40 blur-[100px]" />
			<section className="relative z-10 grid w-full max-w-[880px] overflow-hidden rounded-[19px] border border-[#bdd09d] bg-white shadow-[0_8px_30px_rgba(68,91,47,0.06)] sm:min-h-[550px] sm:grid-cols-[1.02fr_1fr]" aria-label="Login form">
				<div className="flex flex-col items-center justify-center px-7 py-10 sm:px-10 sm:py-8">
					<h1 className="mb-6 ml-10 text-[48px] font-normal tracking-[-0.02em] text-[#296503]">LOGIN</h1>
					<form className="ml-10 flex w-full max-w-[300px] flex-col" aria-label="Login" onSubmit={handleSubmit}>
						<label className="mb-0.5 text-[20px] text-[#adc69a]" htmlFor="email">Email</label>
						<div className="mb-3 flex h-11 items-center rounded-full border-2 border-[#B5C99A] px-4 text-[#B5C99A] focus-within:border-[#296503]">
							<svg className="mr-2 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
								<rect x="3" y="5" width="18" height="14" rx="2" />
								<path d="m4 7 8 6 8-6" />
							</svg>
							<input className="min-w-0 flex-1 bg-transparent text-[12px] text-[#607c4e] outline-none placeholder:text-[#d2dfc7]" id="email" name="email" type="email" placeholder="Enter Your Email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} pattern={emailPattern} title="Enter a valid email such as name@example.com" required />
						</div>
						<label className="mb-0.5 text-[20px] text-[#B5C99A]" htmlFor="password">Password</label>
						<div className="flex h-11 items-center rounded-full border-2 border-[#B5C99A] px-4 text-[#B5C99A] focus-within:border-[#6b9c4c]">
							<svg className="mr-2 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
								<rect x="5" y="10" width="14" height="10" rx="2" />
								<path d="M8 10V7a4 4 0 0 1 8 0v3" />
								<circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
							</svg>
							<input className="min-w-0 flex-1 bg-transparent text-[12px] text-[#607c4e] outline-none placeholder:text-[#d2dfc7]" id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter Your Password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} pattern={passwordPattern} title="Use at least 8 characters with uppercase, lowercase, number, and special character" required />
							<button className="ml-2 shrink-0 text-[#B5C99A] transition hover:text-[#296503]" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)}>
								{showPassword ? (
									<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
										<path d="M3 3 21 21" />
										<path d="M10.58 10.59a2 2 0 0 0 2.83 2.83" />
										<path d="M9.88 5.08A10.48 10.48 0 0 1 12 4.86c5.19 0 8.44 4.72 9 7.14a10.82 10.82 0 0 1-2.21 4.1M6.6 6.6C4.63 7.86 3.42 9.77 3 12c.56 2.42 3.81 7.14 9 7.14a9.85 9.85 0 0 0 4.12-.9" />
									</svg>
								) : (
									<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
										<path d="M2.5 12s3.25-6 9.5-6 9.5 6 9.5 6-3.25 6-9.5 6-9.5-6-9.5-6Z" />
										<circle cx="12" cy="12" r="2.5" />
									</svg>
								)}
							</button>
						</div>
						<label className="mt-3 ml-3 flex items-center gap-1 text-[10px] text-[#296503]">
							<input className="h-3 w-3 mb-1 accent-[#4b891d]" type="checkbox" name="remember" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
							<span>Remember Password</span>
						</label>
						{loginError && <p className="mt-2 text-center text-[11px] text-red-600" role="alert">{loginError}</p>}
						{loginSuccess && <p className="mt-2 text-center text-[11px] text-[#296503]" role="status">{loginSuccess}</p>}
						<button className="mx-auto mt-2 h-10 w-[120px] rounded-full bg-gradient-to-r from-[#296503] to-[#B5C99A] text-[18px] text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Login'}</button>
					</form>
					<a className="ml-10 mt-4 flex h-11 w-full max-w-[300px] items-center justify-center gap-2 rounded-full border-2 border-[#B5C99A] text-[14px] text-[#607c4e] transition hover:border-[#296503] hover:text-[#296503]" href={`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:30000'}/auth/google`}>
						<svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
							<path fill="#4285F4" d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.26Z" />
							<path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.22l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.75Z" />
							<path fill="#FBBC05" d="M6.54 13.97a5.85 5.85 0 0 1 0-3.74V7.7H3.3a9.75 9.75 0 0 0 0 8.8l3.24-2.53Z" />
							<path fill="#EA4335" d="M12 6.2c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.37 14.63 2.25 12 2.25a9.74 9.74 0 0 0-8.7 5.45l3.24 2.53C7.31 7.92 9.46 6.2 12 6.2Z" />
						</svg>
						<span>Continue with Google</span>
					</a>
					<a className="mt-2 ml-10 text-[14px] text-[#296503] underline-offset-2 hover:underline" href="/signin">Create Your Account</a>
				</div>
				<div className="relative mx-auto h-[280px] w-[260px] self-center sm:mx-0 sm:h-full sm:w-full" aria-label="Floral arrangement">
					<div className="absolute left-[10%] top-[6%] z-0 h-[90%] w-[58%] rounded-[120px] border-2 border-[#b7cc9b]" />
					<div className="absolute inset-y-0 left-50 w-[43%] h-[85%] rounded-br-[150px] rounded-bl-[150px] bg-[#b7cc9b]" />
					<div className="absolute left-[14%] top-[8%] z-10 h-[85%] w-[50%] overflow-hidden rounded-[120px] p-2">
						<div className="h-full w-full rounded-[120px] bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/736x/4f/5e/e5/4f5ee5b9d8d100b30e4ebc3f50c282c4.jpg')" }} />
					</div>
					<div className="absolute right-[27%] top-[20%] h-[110px] w-px bg-white" />
					<img className="absolute right-[20.3%] top-[12%] h-10 w-15 object-cover opacity-90" src="/Logo.png" alt="" aria-hidden="true" />
					<span className="absolute right-[7%] top-[55%] rotate-90 text-[30px] tracking-[0.18em] text-white/90" style={{ fontFamily: '"Playfair Display", serif' }}>Flora You.</span>
				</div>
			</section>
		</main>
	);
}
