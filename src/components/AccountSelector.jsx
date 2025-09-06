import React from 'react';
import { ChevronDown, Building } from 'lucide-react';

const AccountSelector = ({ accounts, selectedAccount, onSelectAccount, loading }) => {
  const selectedAccountData = accounts.find(acc => acc.id === selectedAccount);

  return (
    <div className="relative">
      <select
        value={selectedAccount || ''}
        onChange={(e) => onSelectAccount(e.target.value)}
        disabled={loading || accounts.length === 0}
        className="w-full p-3 pl-10 border border-border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
      >
        {accounts.length === 0 ? (
          <option value="">No hay cuentas disponibles</option>
        ) : (
          accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} - {account.currency} ({account.account_status})
            </option>
          ))
        )}
      </select>
      
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Building size={20} className="text-text-secondary" />
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDown size={20} className="text-text-secondary" />
      </div>

      {selectedAccountData && (
        <div className="mt-2 text-sm text-text-secondary">
          <p>Saldo: ${(selectedAccountData.balance / 100).toFixed(2)} {selectedAccountData.currency}</p>
          <p>Total gastado: ${(selectedAccountData.amount_spent / 100).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default AccountSelector;
