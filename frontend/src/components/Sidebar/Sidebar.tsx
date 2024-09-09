import { useRouter } from 'next/router';
import { VoteIcon, UserIcon, UserPlusIcon } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();

  const handleRedirect = (tabName: string) => {
    router.push({
      pathname: '/',
      query: { tabName },
    });
  };

  return (
    <div className="flex flex-1">
      <aside className="hidden h-screen w-64 shrink-0 border-r bg-muted/40 p-4 sm:block">
        <nav className="grid gap-2">
          <button
            onClick={() => handleRedirect('Vote')}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <VoteIcon className="h-4 w-4" />
            Vote
          </button>
          <button
            onClick={() => handleRedirect('MACIRegistration')}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <UserPlusIcon className="h-4 w-4" />
            MACI Registration
          </button>
          <button
            onClick={() => handleRedirect('Authentication')}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <UserIcon className="h-4 w-4" />
            Authentication
          </button>
        </nav>
      </aside>
    </div>
  );
}
