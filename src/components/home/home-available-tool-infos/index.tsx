import ToolStatisticsTemplate from '../tool-statistics-template';

export function ShortenerDescription() {
  return (
    <div>
      <p className='mb-[8px] leading-[28px]'>
        <b>URL Shortener</b> is one of the first community projects developed by{' '}
        <b>Fessior Community</b> that serves the purpose of simplifying complex
        URLs (links to web pages) into short or branded links to enhance the
        brand identity of GDSC or partner organizations.
      </p>
      <p className='leading-[28px]'>
        In addition to the basic feature of URL shortening, users only need to
        log in with their Google accounts to access{' '}
        <b>advanced management features</b> completely free of charge. These
        features include:
      </p>
      <ul className='list-inside list-disc'>
        <li>
          Shorten URLs with a <b>custom slug</b>.
        </li>
        <li>
          <b>Branded links</b> for partner organizations.
        </li>
        <li>
          Shorten links’ <b>statistics</b>: total clicks, clicks per day, time
          of creation...
        </li>
        <li>
          <b>Manage</b> your list of shortened URLs; filter, edit, delete, and
          tag.
        </li>
      </ul>
    </div>
  );
}
export function ShortenerStatistics() {
  return (
    <ToolStatisticsTemplate
      statistics={[
        <>
          More than <b>700</b> users
        </>,
        <>
          <b>160.000</b> clicks
        </>,
        <>
          <b>3500</b> URLs generated
        </>,
      ]}
    />
  );
}

export function QRGeneratorDescription() {
  return (
    <div>
      <p className='mb-[8px] leading-[28px]'>
        Forget the struggles of typing complex web addresses on tiny screens.
        Our powerful <b>QR Generator</b> simplifies everything! Transform any
        website address, social media link, or URL into a scannable QR code in
        seconds. With a quick scan, users unlock instant access to your content,
        no more laborious typing or memorizing required.
      </p>
      <p className='font-[700] leading-[28px]'>How it works:</p>
      <ul className='mb-[8px] list-inside list-disc'>
        <li>Simply input the address you want to share</li>
        <li>Pick from a variety of stylish and customizable options</li>
        <li>Get your high-resolution QR code ready to use</li>
      </ul>
      <p className='leading-[28px]'>
        Share it on flyers, posters, business cards, social media, or even
        product packaging. Watch your website traffic soar as people
        conveniently access your content with a scan.
      </p>
    </div>
  );
}
export function QRGeneratorStatistics() {
  return null;
}

export function CertificateDescription() {
  return (
    <div>
      <p className='mb-[8px] leading-[28px]'>
        Proudly display your participation and achievements in{' '}
        <b>Google Developer Student Clubs (GDSC)</b> with our official
        certificate generator. This personalized recognition signifies your
        dedication to learning and development within the GDSC community.
      </p>
      <p className='font-[700] leading-[28px]'>Features included:</p>
      <ul className='mb-[8px] list-inside list-disc'>
        <li>A variety of stylish templates</li>
        <li>
          Personalization with your name, program details, and completion date
        </li>
        <li>
          Suitability for framing, adding to your portfolio, or showcasing on
          your resume
        </li>
      </ul>
      <p className='leading-[28px]'>
        Share your accomplishment with pride and let the world know you&apos;re
        a part of something special!
      </p>
    </div>
  );
}
export function CertificateStatistics() {
  return null;
}

export function CalendarDescription() {
  return (
    <div>
      <p className='mb-[8px] leading-[28px]'>
        <b>Never miss an exciting GDSC event again!</b> Dive into our
        interactive <b>GDSC Calendar</b>, your comprehensive guide to workshops,
        hackathons, talks, and more happening worldwide.
      </p>
      <p className='mb-[8px] leading-[28px]'>
        Connect with fellow learners, expand your knowledge, and unlock new
        opportunities - all within the vibrant GDSC community.
      </p>
      <p className='font-[700] leading-[28px]'>Core features include:</p>
      <ul className='list-inside list-disc'>
        <li>Event creation and management</li>
        <li>Color coding and categories</li>
        <li>Filter by location, date, or category</li>
      </ul>
    </div>
  );
}
export function CalendarStatistics() {
  return null;
}

export function CodeWithMeDescription() {
  return (
    <div>
      <p className='mb-[8px] leading-[28px]'>
        Break down the barriers of physical distance and unlock the power of
        real-time collaboration with our innovative <b>Code with me</b>{' '}
        platform. Invite your friends, classmates, or teammates to share your
        code editor in a secure and seamless online environment.
      </p>
      <p className='mb-[8px] leading-[28px]'>
        Ideal for <b>pair programming, group projects</b>, or even just getting
        valuable insights on your code from different perspectives,{' '}
        <b>Code with me</b> fosters effective communication, accelerates
        problem-solving, and injects a dose of fun into the development process.
      </p>
      <p className='font-[700] leading-[28px]'>Core features include:</p>
      <ul className='list-inside list-disc'>
        <li>Simultaneous editing the codebase</li>
        <li>Integrated live chat functionality</li>
        <li>Whiteboard and annotation tools</li>
      </ul>
    </div>
  );
}
export function CodeWithMeStatistics() {
  return null;
}

export function QNADescription() {
  return (
    <div>
      <p className='mb-[8px] leading-[28px]'>
        Stuck on a coding problem or have a burning question about web
        development? Don&apos;t fret! The <b>GDSC Q&A forum</b> is your one-stop
        shop for answers and support.
      </p>
      <p className='mb-[8px] leading-[28px]'>
        <b>Ask anything, big or small:</b> Whether you&apos;re facing a tricky
        coding conundrum or curious about a specific GDSC program, post your
        question and tap into the collective wisdom of the forum.
      </p>
      <p className='font-[700] leading-[28px]'>Core features include:</p>
      <ul className='list-inside list-disc'>
        <li>Post questions and get answers from community members</li>
        <li>Browse existing threads to find solutions</li>
        <li>Connect with experienced developers and GDSC members</li>
        <li>Learn from diverse perspectives and share your knowledge</li>
      </ul>
    </div>
  );
}
export function QNAStatistics() {
  return null;
}
