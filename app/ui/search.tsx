'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  // FIX: This is a expensive function so fix this

  // function handleSearch(term:string) {
  //     console.log(`Searching... ${term}`);
  //     const params = new URLSearchParams(searchParams);
  //     if(term)
  //       params.set('query',term);
  //     else
  //       params.delete('query')
  //
  //     replace(`${pathName}?${params.toString()}`)
  //   }

  // In the handleSearch function You're updating the URL on every keystroke, and therefore querying your database on
  // every keystroke! This isn't a problem as our application is small, but imagine if your application had thousands
  // of users, each sending a new  request to your database on each keystroke.

  // Debouncing is a programming practice that limits the rate at which a function can fire. In our case, you only want
  // to query the database when the user has stopped typing.

  //NOTE: How Debouncing Works:

  // 1. Trigger Event: When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.
  // 2. Wait: If a new event occurs before the timer expires, the timer is reset.
  // 3. Execution: If the timer reaches the end of its countdown, the debounced function is executed

  //NOTE:  npm i use-debounce

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    
    params.set('page','1');
    
    if (term) params.set('query', term);
    else params.delete('query');

    replace(`${pathName}?${params.toString()}`);
  }, 300);

// This function will wrap the contents of handleSearch, and only run the code after a specific time once 
// the user has stopped typing (300ms).

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch((e.target as HTMLInputElement).value);
        }}
        // to sync input field and url
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
