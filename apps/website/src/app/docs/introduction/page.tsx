export default function IntroductionPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Introduction</h1>
      <p>
        Welcome to the documentation for Mongolytics. This document provides all
        the information you need to get started with our self-hosted,
        open-source analytics solution for Next.js.
      </p>
      <h2>What is Mongolytics?</h2>
      <p>
        Mongolytics is a lightweight, privacy-focused analytics tool that you
        host yourself. It allows you to track website traffic and user behavior
        without sending any data to third-party companies. All data is stored
        directly in your own MongoDB database, giving you complete ownership and
        control.
      </p>
      <h2>Core Philosophy</h2>
      <ul>
        <li>
          <strong>Data Ownership:</strong> Your data is yours. Period.
        </li>
        <li>
          <strong>Simplicity:</strong> Easy to install and configure in any
          Next.js project.
        </li>
        <li>
          <strong>Performance:</strong> Designed to be non-blocking and have a
          negligible impact on your site&apos;s performance.
        </li>
      </ul>
    </article>
  );
}
