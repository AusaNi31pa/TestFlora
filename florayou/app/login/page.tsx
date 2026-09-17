export default function LoginPage() {
	return (
		<main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-white px-8 py-8 text-[#285b0f] sm:px-8">
			<div className="pointer-events-none absolute -left-32 top-[-12%] h-96 w-96 rounded-full bg-[#FFD478]/40 blur-[100px]" />
			<div className="pointer-events-none absolute right-[-12%] top-[4%] h-[28rem] w-[28rem] rounded-full bg-[#B5C99A]/40 blur-[110px]" />
			<div className="pointer-events-none absolute bottom-[-18%] left-[2%] h-[28rem] w-[28rem] rounded-full bg-[#B5C99A]/40 blur-[110px]" />
			<div className="pointer-events-none absolute bottom-[-16%] right-[6%] h-96 w-96 rounded-full bg-[#FFD478]/40 blur-[100px]" />
			<section className="relative z-10 grid w-full max-w-[880px] overflow-hidden rounded-[19px] border border-[#bdd09d] bg-white shadow-[0_8px_30px_rgba(68,91,47,0.06)] sm:min-h-[550px] sm:grid-cols-[1.02fr_1fr]" aria-label="Login form">
				<div className="flex flex-col items-center justify-center px-7 py-10 sm:px-10 sm:py-8">
					<h1 className="mb-6 ml-7 text-[48px] font-normal tracking-[-0.02em] text-[#296503]">LOGIN</h1>
					<form className="ml-10 flex w-full max-w-[300px] flex-col" aria-label="Login">
						<label className="mb-0.5 text-[20px] text-[#adc69a]" htmlFor="email">Email</label>
						<div className="mb-3 flex h-11 items-center rounded-full border-2 border-[#B5C99A] px-4 text-[#B5C99A] focus-within:border-[#296503]">
							<svg className="mr-2 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
								<rect x="3" y="5" width="18" height="14" rx="2" />
								<path d="m4 7 8 6 8-6" />
							</svg>
							<input className="min-w-0 flex-1 bg-transparent text-[12px] text-[#607c4e] outline-none placeholder:text-[#d2dfc7]" id="email" name="email" type="email" placeholder="Enter Your Email" autoComplete="email" required />
						</div>
						<label className="mb-0.5 text-[20px] text-[#B5C99A]" htmlFor="password">Password</label>
						<div className="flex h-11 items-center rounded-full border-2 border-[#B5C99A] px-4 text-[#B5C99A] focus-within:border-[#6b9c4c]">
							<svg className="mr-2 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
								<rect x="5" y="10" width="14" height="10" rx="2" />
								<path d="M8 10V7a4 4 0 0 1 8 0v3" />
								<circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
							</svg>
							<input className="min-w-0 flex-1 bg-transparent text-[12px] text-[#607c4e] outline-none placeholder:text-[#d2dfc7]" id="password" name="password" type="password" placeholder="Enter Your Password" autoComplete="current-password" required />
						</div>
						<label className="mt-3 ml-3 flex items-center gap-1 text-[10px] text-[#296503]">
							<input className="h-3 w-3 mb-1 accent-[#4b891d]" type="checkbox" name="remember" />
							<span>Forgot Password?</span>
						</label>
						<button className="mx-auto mt-2 h-10 w-[120px] rounded-full bg-gradient-to-r from-[#296503] to-[#B5C99A] text-[18px] text-white shadow-sm transition hover:brightness-95" type="submit">Login</button>
					</form>
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
