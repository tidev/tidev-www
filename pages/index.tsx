import Head from 'next/head';
import Image from 'next/image';
import Hero from '../components/home/hero';
import About from '../components/home/about';
import Team from '../components/home/team';
import Companies from '../components/home/companies';

export default function Home() {
    return (
        <section>
            <Hero />
            <About />
            <Team />
            <Companies />
        </section>
    );
}
