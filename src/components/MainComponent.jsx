
import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { persistentAuthState } from '../mainStore';
import ReportForm from './ReportForm';

export default function MainComponent () {
  const $persistentAuthState = useStore(persistentAuthState);
  console.log("MainComponent", $persistentAuthState);


  return (
    <>
        <ReportForm />
    </>
    
  );
}