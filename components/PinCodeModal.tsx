import React, { useState } from 'react';
import { UserRole } from '../stores/useAppStore';

interface PinCodeModalProps {
    expectedRole: UserRole;
    onSuccess: () => void;
    onCancel: () => void;
}

const PinCodeModal: React.FC<PinCodeModalProps> = ({ expectedRole, onSuccess, onCancel }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const correctPin = import.meta.env.VITE_ADMIN_PIN || '1234';
        if (pin === correctPin) {
            onSuccess();
        } else {
            setError(true);
            setPin('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Auktorisering krävs</h2>
                    <p className="text-sm text-slate-400">
                        Ange PIN-kod för att logga in som <strong className="text-white capitalize">{expectedRole}</strong>.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => { setPin(e.target.value); setError(false); }}
                            placeholder="PIN-kod"
                            className={`w-full bg-slate-950 border ${error ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-center text-2xl tracking-widest text-white focus:outline-none focus:border-indigo-500 transition-colors`}
                            autoFocus
                        />
                        {error && <p className="text-red-400 text-xs text-center mt-2">Felaktig PIN-kod. Försök igen.</p>}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors"
                        >
                            Avbryt
                        </button>
                        <button
                            type="submit"
                            disabled={pin.length === 0}
                            className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
                        >
                            Lås upp
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PinCodeModal;
