export default function SocialMediaLinks() {
    const socialMediaLinks = [
      { name: 'GitHub', link: 'https://github.com/Alstudd' },
      { name: 'LinkedIn', link: 'https://www.linkedin.com/in/alston-soares-724a641b9/' },
      { name: 'Devfolio', link: 'https://devfolio.co/@Alstudd17' },
    ];
    return (
    <div className="flex flex-col">

      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md px-4 py-8 w-full space-y-4 bg-white dark:bg-background shadow-lg rounded-lg flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center mb-4">Social Media Links</h1>

          <ul className="space-y-2">
            {socialMediaLinks.map(({ name, link }) => (
              <li key={name}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
