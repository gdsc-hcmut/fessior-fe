import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Fessior Tools - About',
  description: 'Fessior Community',
};

type AboutPageProps = {};

function AboutPage(props: AboutPageProps) {
  return <div data-testid='about-page'>AboutPage</div>;
}

export default AboutPage;
