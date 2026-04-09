import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { Popover, Transition } from '@headlessui/react'; // غيرنا Menu لـ Popover
import { Fragment } from 'react';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇪🇬' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const changeLanguage = (lng) => {
   i18n.changeLanguage(lng);
  };

  const currentLanguage = languages.find(l => l.code === (i18n.language.split('-')[0])) || languages[0];

  return (
    <Popover as="div" className="relative inline-block text-left font-sans">
      {({ open }) => (
        <>
          <Popover.Button className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all border border-slate-100 outline-none group">
            <Globe size={18} className={`text-brand-600 transition-transform ${open ? 'rotate-12' : ''}`} />
            <span className="font-bold text-sm hidden md:block">
              {currentLanguage.name}
            </span>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className={`absolute mt-2 w-40 origin-top-right rounded-2xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-[100] 
              ${i18n.language === 'ar' ? 'left-0' : 'right-0'}`}>
              <div className="p-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`${
                      i18n.language.startsWith(lang.code) ? 'bg-brand-50 text-brand-600' : 'text-slate-700 hover:bg-slate-50'
                    } flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                    {i18n.language.startsWith(lang.code) && (
                      <Check size={14} className="text-brand-600" />
                    )}
                  </button>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default LanguageSelector;