'use client'

import { useActionState, useState } from "react";
import { authenticate } from "../(queries)/auth";

const LoginForm: React.FC = () => {
    const [logging, setLogging] = useState<boolean>(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    async function login(e: React.FormEvent) {
        e.preventDefault();

        if (logging || !password) return
        setLogging(true);

        try {
            debugger;
            // await signIn('credentials', e.target);

        } catch (err) {
            console.error(err);
            setLogging(false);
            return;
        }


    }

    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="flex flex-col col-span-8 md:col-span-6 gap-4 md:col-start-2 items-center md:items-start w-full">
            <h1 className="text-7xl text-center font-bold text-indigo-800">Hola!</h1>
            <form className="flex flex-col space-y-2 text-indigo-100" action={formAction}>
                <input value={email} className="bg-transparent border border-indigo-500 rounded-md p-2 grow" placeholder="email"
                    name="email" type="email" onChange={e => setEmail(e.target.value)} />

                <input value={password}
                    className="bg-transparent border border-indigo-500 rounded-md p-2 grow" name="password" placeholder="password"
                    type="password" onChange={e => setPassword(e.target.value)} />

                <button type="submit" disabled={!password || !email || isPending} color="black" className="w-full text-left p-2 bg-purple-800 hover:bg-purple-700 active:bg-indigo-700 rounded-md">
                    Login
                </button>
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    )}
                </div>
            </form>

        </div>
    )
}

export default LoginForm;