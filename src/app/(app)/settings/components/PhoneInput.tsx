"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search, X, Check } from "lucide-react";

interface Country {
  code: string;
  name: string;
  dial: string;
}

const COUNTRIES: Country[] = [
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "GH", name: "Ghana", dial: "+233" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "ET", name: "Ethiopia", dial: "+251" },
  { code: "TZ", name: "Tanzania", dial: "+255" },
  { code: "UG", name: "Uganda", dial: "+256" },
  { code: "SN", name: "Senegal", dial: "+221" },
  { code: "CI", name: "Côte d'Ivoire", dial: "+225" },
  { code: "CM", name: "Cameroon", dial: "+237" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "AE", name: "UAE", dial: "+971" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "RU", name: "Russia", dial: "+7" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "ID", name: "Indonesia", dial: "+62" },
];

function FlagImg({ code, size = 20 }: { code: string; size?: number }) {
  const h = Math.round(size * 0.75);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${code.toUpperCase()}.svg`}
      width={size}
      height={h}
      alt={`${code} flag`}
      style={{
        width: size,
        height: h,
        minWidth: size,
        display: "inline-block",
        borderRadius: 2,
        objectFit: "cover",
      }}
    />
  );
}

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PhoneInput({ value, onChange }: PhoneInputProps) {
  const DEFAULT = COUNTRIES.find((c) => c.code === "NG")!;
  const [selected, setSelected] = useState<Country>(DEFAULT);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  const filtered = useMemo(
    () =>
      COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dial.includes(search),
      ),
    [search],
  );

  const handleSelect = (country: Country) => {
    setSelected(country);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-[#1E1F20]">Phone Number</label>

      <div className="flex items-stretch border border-[#ECEDEE] rounded-lg focus-within:ring-2 focus-within:ring-gray-900/10 focus-within:border-[#0A0A0A]/50 transition bg-white">
        <div ref={dropdownRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Select country code"
            aria-expanded={open}
            aria-haspopup="listbox"
            className="flex items-center gap-2 px-3 py-2 h-full border-r border-[#ECEDEE] bg-gray-50 hover:bg-gray-100 transition-colors rounded-l-lg focus:outline-none"
          >
            <FlagImg code={selected.code} size={18} />
            <span className="text-xs font-medium text-[#1E1F20]">
              {selected.dial}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#707375] transition-transform duration-150 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div
              role="listbox"
              className="absolute top-[calc(100%+6px)] left-0 z-50 w-72 bg-white border border-[#ECEDEE] rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-3 border-b border-[#ECEDEE]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#707375]" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search country or code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-xs border border-[#ECEDEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-[#0A0A0A]/50 text-[#1E1F20] placeholder:text-[#1E1F20]/40 transition"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#707375] hover:text-[#1E1F20] transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              <ul className="max-h-56 overflow-y-auto py-1.5 space-y-0.5 px-1.5">
                {filtered.length === 0 ?
                  <li className="py-6 text-xs text-center text-[#707375]">
                    No countries found
                  </li>
                : filtered.map((country) => {
                    const isSelected =
                      selected.code === country.code &&
                      selected.dial === country.dial;
                    return (
                      <li key={`${country.code}-${country.dial}`}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelect(country)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            isSelected ?
                              "bg-[#EFF6FF] text-[#155DFC]"
                            : "hover:bg-gray-50 text-[#1E1F20]"
                          }`}
                        >
                          <FlagImg code={country.code} size={20} />
                          <span className="flex-1 text-left text-xs font-medium truncate">
                            {country.name}
                          </span>
                          <span className="text-xs text-[#707375] shrink-0 tabular-nums">
                            {country.dial}
                          </span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-[#155DFC] shrink-0" />
                          )}
                        </button>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          )}
        </div>

        <input
          type="tel"
          placeholder="900 000 0000"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 text-sm focus:outline-none text-[#1E1F20] placeholder:text-[#1E1F20]/40 bg-white rounded-r-lg min-w-0"
        />
      </div>
    </div>
  );
}
