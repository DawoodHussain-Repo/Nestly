import { ReactNode } from 'react';
import { Nav } from '@/components/nav';
import { MainFooter } from '@/components/main-footer';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <MainFooter />
    </>
  );
}
