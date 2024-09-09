import { Button } from '../ui/button';

const Registration = () => {
  return (
    <main className="flex items-center justify-start p-4 sm:p-6 w-[60vw] h-[80vh]">
      <section className="max-w-md w-full">
        <h1 className="text-2xl font-bold">Register to Vote</h1>
        <div className='mt-6'>
          <div className="bg-background p-4 border rounded-lg shadow">
            <p className="text-muted-foreground mb-4">
              To register, please click the button below to connect with the
              MACI Register Contracts.
            </p>
            <Button>Register with MACI Register Contracts</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Registration;
