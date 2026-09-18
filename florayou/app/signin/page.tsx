'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const emailPattern = '^[^\\s@]+@[^\\s@]+\\.com$';
const passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$';

export default function SigninPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [registerError, setRegisterError] = useState('');
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		confirmPasswordRef.current?.setCustomValidity(
			confirmPassword && confirmPassword !== password ? 'Passwords do not match' : '',
		);
	}, [password, confirmPassword]);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!event.currentTarget.reportValidity()) return;

		setIsSubmitting(true);
		setRegisterError('');

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:30000'}/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});
			const result = await response.json().catch(() => null);

			if (!response.ok) {
				throw new Error(result?.message ?? 'Unable to create account');
			}

			router.push('/login');
		} catch (error) {
			setRegisterError(error instanceof Error ? error.message : 'Unable to connect to the server');
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
				<Link className="absolute right-5 top-4 z-20 inline-flex items-center gap-1 text-[13px] text-[#6b9c4c] transition hover:text-[#296503]" href="/login">
					<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
						<path d="M19 12H5" />
						<path d="m12 19-7-7 7-7" />
					</svg>
					Back to Login
				</Link>
				<div className="relative order-1 mx-auto h-[280px] w-[260px] self-center sm:order-1 sm:mx-0 sm:h-full sm:w-full" aria-label="Floral arrangement">
					<div className="absolute left-[10%] top-[6%] z-0 h-[90%] w-[58%] rounded-[120px] border-2 border-[#b7cc9b]" />
					<div className="absolute inset-y-0 left-50 h-[85%] w-[43%] rounded-bl-[150px] rounded-br-[150px] bg-[#b7cc9b]" />
					<div className="absolute left-[14%] top-[8%] z-10 h-[85%] w-[50%] overflow-hidden rounded-[120px] p-2">
						<div className="h-full w-full rounded-[120px] bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/736x/4f/5e/e5/4f5ee5b9d8d100b30e4ebc3f50c282c4.jpg')" }} />
					</div>
					<div className="absolute right-[27%] top-[20%] h-[105px] w-px bg-white" />
					<img className="absolute right-[20.3%] top-[12%] h-10 w-15 object-cover opacity-90" src="/Logo.png" alt="" aria-hidden="true" />
					<span className="absolute right-[7%] top-[55%] rotate-90 text-[30px] tracking-[0.18em] text-white/90" style={{ fontFamily: '"Playfair Display", serif' }}>Flora You.</span>
				</div>
				<div className="order-2 flex flex-col items-center justify-center px-7 py-10 sm:order-2 sm:px-10 sm:py-8">
					<h1 className="mb-1 mr-9 text-[48px] font-normal tracking-[-0.02em] text-[#296503]">Create Account</h1>
					<form className="mr-10 flex w-full max-w-[300px] flex-col" aria-label="Create account" onSubmit={handleSubmit}>
						<label className="mb-0.5 text-[20px] text-[#adc69a]" htmlFor="signin-email">Email</label>
						<div className="mb-3 flex h-11 items-center rounded-full border-2 border-[#B5C99A] px-4 text-[#B5C99A] focus-within:border-[#296503]">
							<svg className="mr-2 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
								<rect x="3" y="5" width="18" height="14" rx="2" />
								<path d="m4 7 8 6 8-6" />
							</svg>
							<input className="min-w-0 flex-1 bg-transparent text-[12px] text-[#607c4e] outline-none placeholder:text-[#d2dfc7]" id="signin-email" name="email" type="email" placeholder="Enter Your Email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} pattern={emailPattern} title="Enter a valid email such as name@example.com" required />
						</div>
						<label className="mb-0.5 text-[20px] text-[#B5C99A]" htmlFor="signin-password">Password</label>
						<div className="flex h-11 items-center rounded-full border-2 border-[#B5C99A] px-4 text-[#B5C99A] focus-within:border-[#6b9c4c]">
							<svg className="mr-2 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
								<rect x="5" y="10" width="14" height="10" rx="2" />
								<path d="M8 10V7a4 4 0 0 1 8 0v3" />
								<circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
							</svg>
							<input className="min-w-0 flex-1 bg-transparent text-[12px] text-[#607c4e] outline-none placeholder:text-[#d2dfc7]" id="signin-password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter Your Password" autoComplete="new-password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} pattern={passwordPattern} title="Use at least 8 characters with uppercase, lowercase, number, and special character" required />
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
						<label className="mb-0.5 mt-3 text-[20px] text-[#B5C99A]" htmlFor="signin-confirm-password">Confirm Password</label>
						<div className="flex h-11 items-center rounded-full border-2 border-[#B5C99A] px-4 text-[#B5C99A] focus-within:border-[#6b9c4c]">
							<svg className="mr-2 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
								<rect x="5" y="10" width="14" height="10" rx="2" />
								<path d="M8 10V7a4 4 0 0 1 8 0v3" />
								<circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
							</svg>
							<input ref={confirmPasswordRef} className="min-w-0 flex-1 bg-transparent text-[12px] text-[#607c4e] outline-none placeholder:text-[#d2dfc7]" id="signin-confirm-password" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Your Password" autoComplete="new-password" minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} pattern={passwordPattern} title="Password confirmation must match and meet the password requirements" required />
							<button className="ml-2 shrink-0 text-[#B5C99A] transition hover:text-[#296503]" type="button" aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'} onClick={() => setShowConfirmPassword((visible) => !visible)}>
								{showConfirmPassword ? (
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
						{registerError && <p className="mt-3 text-center text-[11px] text-red-600" role="alert">{registerError}</p>}
						<button className="mx-auto mt-3 h-10 w-[120px] rounded-full bg-gradient-to-r from-[#296503] to-[#B5C99A] text-[18px] text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Sign In'}</button>
					</form>
				</div>
			</section>
		</main>
	);
}
