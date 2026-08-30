import { useQuery } from '@tanstack/react-query';
import { financeApi } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function FinancePage() {
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['finance-summary'],
    queryFn: () => financeApi.summary(),
  });

  const { data: accounts, isLoading: accountsLoading } = useQuery({
    queryKey: ['finance-accounts'],
    queryFn: financeApi.accounts,
  });

  const { data: transactions, isLoading: txLoading } = useQuery({
    queryKey: ['finance-transactions'],
    queryFn: () => financeApi.transactions(),
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Finance</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {summaryLoading ? '...' : `₹${Number(summary?.totalIncome ?? 0).toLocaleString('en-IN')}`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Total Expense</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {summaryLoading ? '...' : `₹${Number(summary?.totalExpense ?? 0).toLocaleString('en-IN')}`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Net Balance</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {summaryLoading ? '...' : `₹${Number(summary?.net ?? 0).toLocaleString('en-IN')}`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts */}
      <Card>
        <CardHeader><CardTitle>Accounts</CardTitle></CardHeader>
        <CardContent>
          {accountsLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : (
            <div className="space-y-2">
              {accounts?.map((acc) => (
                <div key={acc.id} className="flex justify-between border-b pb-2">
                  <span>{acc.name}</span>
                  <span className="font-medium">₹{Number(acc.balance).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
        <CardContent>
          {txLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : (
            <div className="space-y-2">
              {transactions?.slice(0, 10).map((tx) => (
                <div key={tx.id} className="flex justify-between border-b pb-2">
                  <div>
                    <span className="font-medium">{tx.description}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{tx.account?.name}</span>
                  </div>
                  <span className={tx.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}>
                    {tx.type === 'INCOME' ? '+' : '-'}₹{Number(tx.amount).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
