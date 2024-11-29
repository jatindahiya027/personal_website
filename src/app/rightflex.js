import Image from 'next/image';

export default function Rightflex(){
    return(
        <div className="shrink-0 w-72 bg-zinc-900 p-5 flex items-center h-screen flex-col rounded-r-lg">
          <Image
            src="/jatin2.png"
            alt="Vercel Logo"
            className="dark:invert mx-auto rounded-lg bg-black"
            width={200}
            height={60}
            priority
          />
          <h2 className="text-xl font-bold w-full text-left pt-10">
            Specialization
          </h2>
          <p className="w-full text-left">
            This is the fixed column content. It doesn't scroll.
          </p>
          <h2 className="text-xl font-bold w-full text-left pt-10">Based in</h2>
          <p className="w-full text-left">
            This is the fixed column content. It doesn't scroll.
          </p>
          <ul className="wrapper">
            <li className="icon twitter">
              <span className="tooltip">LinkedIn</span>
  
              <Image
                src="/linkedin.png"
                alt="Vercel Logo"
                width={18}
                height={18}
                priority
              />
            </li>
            <li className="icon twitter">
              <span className="tooltip">Twitter</span>
              <Image
                src="/twitter.png"
                alt="Vercel Logo"
                width={18}
                height={18}
                priority
              />
            </li>
  
            <li className="icon twitter">
              <span className="tooltip">Youtube</span>
  
              <Image
                src="/youtube.png"
                alt="Vercel Logo"
                width={18}
                height={18}
                priority
              />
            </li>
  
            <li className="icon twitter">
              <span className="tooltip">Threads</span>
  
              <Image
                src="/threads.png"
                alt="Vercel Logo"
                width={18}
                height={18}
                priority
              />
            </li>
            <li className="icon twitter">
              <span className="tooltip">Instagram</span>
  
              <Image
                src="/instagram.png"
                alt="Vercel Logo"
                width={18}
                height={18}
                priority
              />
            </li>
          </ul>
        </div>
        );
}