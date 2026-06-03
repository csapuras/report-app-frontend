
import { useStore } from '@nanostores/react';
import { persistentAuthState } from '../mainStore';
import ReportForm from '@components/ReportForm';

export default function MainComponent () {
  const $persistentAuthState = useStore(persistentAuthState);
  console.log("MainComponent", $persistentAuthState);

  
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Submit an Outage Report</h1>
        <ReportForm />
    </>
  );
}