"use client";
import { useState } from 'react';

export default function AboutMe() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col">

      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md px-4 py-8 w-full space-y-6 bg-white dark:bg-background shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center">About Me</h1>

          <p className="text-lg text-gray-700 dark:text-gray-400">
            I&apos;m a passionate Web Developer, Open Source Contributor, and Blockchain Enthusiast. With over 10 national-level hackathons under my belt, I&apos;ve emerged as a winner in 4. My expertise lies in frontend development, and I&apos;m continuously enhancing my backend skills. I&apos;ve built various projects using technologies like React.js, Next.js, Prisma, MongoDB, Python, Flask, Node.js, Express.js, etc.
          </p>

          {expanded && (
            <div className="bg-gray-100 dark:bg-slate-500 px-4 py-2 rounded-lg">
              <p className="text-gray-700 dark:text-white">
                My dream is to build innovative solutions that bring value to people&apos;s lives, and I&apos;m eager to collaborate with like-minded individuals to make this dream a reality. Let&apos;s connect and discuss how we can work together to bring ideas to life and have a positive influence on society.
              </p>
            </div>
          )}

          <button
            className="text-blue-500 hover:underline focus:outline-none"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        </div>
      </main>

    </div>
  );
}
