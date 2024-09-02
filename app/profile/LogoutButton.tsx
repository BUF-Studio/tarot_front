'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import { handleSignOut } from '../lib/aws/cognito';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await handleSignOut();
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return <Button variant="contained" onClick={handleLogout}>Logout</Button>;
}