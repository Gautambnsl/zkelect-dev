import Authentication from '../components/Authentication/Authentication';
import Registration from '../components/Registration/Registration';
import Vote from '../components/Vote/Vote';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { tabName } = router.query;

  const renderTabContent = () => {
    switch (tabName) {
      case 'Vote':
        return <Vote />;
      case 'MACIRegistration':
        return <Registration />;
      case 'Authentication':
        return <Authentication />;
      default:
        return <div>Select a tab to view content</div>; // Or a default component
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      {renderTabContent()}
    </div>
  );
}
