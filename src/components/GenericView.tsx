import { ReactNode, useEffect, useState } from "react";

type Option = {
  id: number;
  label: string;
  content: ReactNode | string;
};

type GenericViewProps = {
  title: string;
  options: Option[];
  localStorageKey?: string;
};

export const GenericView = ({
  title,
  options,
  localStorageKey = 'genericViewSelectedOption',
}: GenericViewProps) => {
  const [selected, setSelected] = useState<Option>(() => {
    const savedOption = localStorage.getItem(localStorageKey);
    return savedOption
      ? options.find(opt => opt.id === JSON.parse(savedOption).id) || options[0]
      : options[0];
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify({
      id: selected.id,
      label: selected.label
    }));
  }, [selected, localStorageKey]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="w-full flex justify-between items-center md:justify-center mb-4 md:mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-blue-600 hover:bg-blue-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block w-full text-center`}>
            <div className="inline-flex flex-wrap justify-center gap-4">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelected(option);
                    setIsMenuOpen(false);
                  }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow
                    ${selected.id === option.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mx-auto max-w-xl md:max-w-6xl text-center">
          <div className="text-gray-600 text-lg">
            {typeof selected.content === 'string' ? (
              <p>{selected.content}</p>
            ) : (
              selected.content
            )}
          </div>
        </div>
      </div>
    </div>
  );
};