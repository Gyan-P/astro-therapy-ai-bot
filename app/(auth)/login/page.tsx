'use client';

import Link from 'next/link';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from '@/components/toast';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

import { login, type LoginActionState } from '../actions';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [providers, setProviders] = useState<Record<string, any> | null>(null);
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: 'idle',
    },
  );

  useEffect(() => {
    if (state.status === 'failed') {
      toast({
        type: 'error',
        description: 'Invalid credentials!',
      });
    } else if (state.status === 'invalid_data') {
      toast({
        type: 'error',
        description: 'Failed validating your submission!',
      });
    } else if (state.status === 'success') {
      setIsSuccessful(true);
      router.refresh();
    }
  }, [state.status]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('email') as string);
    formAction(formData);
  };

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      console.log('🧪 OAuth Providers:', res); // 👈 Add this
      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Sign In</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Use your email and password to sign in
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>Sign in</SubmitButton>
                      {providers && (
              <div className="mt-6 space-y-2">
                {Object.values(providers).map((provider) => {
                  if (provider.id === 'credentials') return null; // Skip email/password
                  return (
                    <button
                      key={provider.name}
                      onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:text-white"
                    >
                      Continue with {provider.name}
                    </button>
                  );
                })}
              </div>
            )}
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign up
            </Link>
            {' for free.'}
          </p>
          
        </AuthForm>
      </div>
    </div>
  );
}

// 'use client';
// import { useEffect, useState } from 'react';
// import { getProviders, signIn } from 'next-auth/react';

// export default function AstroProfilePage() {
//   const [form, setForm] = useState({ date: '', time: '', place: '' });
//   const [traits, setTraits] = useState<any>(null);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     const res = await fetch('/api/astro-profile', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });
//     const data = await res.json();
//     setTraits(data);
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
//       <h1 className="text-2xl font-semibold mb-4">Get Your Astro Profile</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="date"
//           className="w-full p-2 border rounded"
//           onChange={(e) => setForm({ ...form, date: e.target.value })}
//           required
//         />
//         <input
//           type="time"
//           className="w-full p-2 border rounded"
//           onChange={(e) => setForm({ ...form, time: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           className="w-full p-2 border rounded"
//           placeholder="Place of Birth"
//           onChange={(e) => setForm({ ...form, place: e.target.value })}
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Generate Profile
//         </button>
//       </form>

//       {traits && (
//         <div className="mt-6 p-4 border bg-gray-100 rounded">
//           <h2 className="text-xl font-semibold mb-2">Your Traits</h2>
//           <pre className="text-sm">{JSON.stringify(traits, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

