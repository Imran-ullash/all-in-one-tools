'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';

export interface DatePickerProps {
  id?: string;
  value: string; // 'YYYY-MM-DD'
  onChange: (val: string) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Timezone-safe date string parsing (YYYY-MM-DD)
function parseYMD(str: string) {
  if (!str) return null;
  const parts = str.split('-').map(Number);
  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    return { year: parts[0], month: parts[1] - 1, day: parts[2] };
  }
  return null;
}

function formatYMD(year: number, month: number, day: number): string {
  const y = String(year).padStart(4, '0');
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDisplay(str: string): string {
  const parsed = parseYMD(str);
  if (!parsed) return '';
  const monthName = MONTH_NAMES[parsed.month]?.slice(0, 3) || '';
  return `${parsed.day} ${monthName} ${parsed.year}`;
}

export default function DatePicker({
  id,
  value,
  onChange,
  placeholder = 'Select date',
  min,
  max,
  disabled = false,
  className = ''
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const parsedValue = useMemo(() => parseYMD(value), [value]);

  const today = useMemo(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
      str: formatYMD(now.getFullYear(), now.getMonth(), now.getDate())
    };
  }, []);

  const [viewYear, setViewYear] = useState<number>(parsedValue?.year ?? today.year);
  const [viewMonth, setViewMonth] = useState<number>(parsedValue?.month ?? today.month);

  // Sync view when external value changes or picker opens
  useEffect(() => {
    if (parsedValue) {
      setViewYear(parsedValue.year);
      setViewMonth(parsedValue.month);
    }
  }, [value, isOpen, parsedValue]);

  // Handle outside clicks
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Generate Year options (from currentYear + 10 down to 1920)
  const yearOptions = useMemo(() => {
    const startYear = today.year + 5;
    const endYear = 1910;
    const list: number[] = [];
    for (let y = startYear; y >= endYear; y--) {
      list.push(y);
    }
    return list;
  }, [today.year]);

  // Month navigation
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Build days grid
  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sunday
    const daysInCurrMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const cells: Array<{
      day: number;
      month: number;
      year: number;
      isCurrentMonth: boolean;
      dateStr: string;
      isToday: boolean;
      isSelected: boolean;
      isDisabled: boolean;
    }> = [];

    // Previous month trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const m = viewMonth === 0 ? 11 : viewMonth - 1;
      const y = viewMonth === 0 ? viewYear - 1 : viewYear;
      const dateStr = formatYMD(y, m, d);
      cells.push({
        day: d,
        month: m,
        year: y,
        isCurrentMonth: false,
        dateStr,
        isToday: dateStr === today.str,
        isSelected: dateStr === value,
        isDisabled: (min && dateStr < min) || (max && dateStr > max) || false
      });
    }

    // Current month days
    for (let d = 1; d <= daysInCurrMonth; d++) {
      const dateStr = formatYMD(viewYear, viewMonth, d);
      cells.push({
        day: d,
        month: viewMonth,
        year: viewYear,
        isCurrentMonth: true,
        dateStr,
        isToday: dateStr === today.str,
        isSelected: dateStr === value,
        isDisabled: (min && dateStr < min) || (max && dateStr > max) || false
      });
    }

    // Next month leading days (fill up to 35 or 42 grid cells)
    const totalCellsSoFar = cells.length;
    const targetCells = totalCellsSoFar <= 35 ? 35 : 42;
    const remaining = targetCells - totalCellsSoFar;
    for (let d = 1; d <= remaining; d++) {
      const m = viewMonth === 11 ? 0 : viewMonth + 1;
      const y = viewMonth === 11 ? viewYear + 1 : viewYear;
      const dateStr = formatYMD(y, m, d);
      cells.push({
        day: d,
        month: m,
        year: y,
        isCurrentMonth: false,
        dateStr,
        isToday: dateStr === today.str,
        isSelected: dateStr === value,
        isDisabled: (min && dateStr < min) || (max && dateStr > max) || false
      });
    }

    return cells;
  }, [viewYear, viewMonth, today.str, value, min, max]);

  const handleSelect = (dateStr: string, isDisabled: boolean) => {
    if (isDisabled) return;
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleSelectToday = () => {
    onChange(today.str);
    setViewYear(today.year);
    setViewMonth(today.month);
    setIsOpen(false);
  };

  return (
    <div className={`custom-datepicker-wrapper ${className}`} ref={wrapperRef}>
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        className={`custom-datepicker-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className="custom-datepicker-left">
          <span className="custom-datepicker-icon-box">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <span className="custom-datepicker-label-text">
            {value ? formatDisplay(value) : placeholder}
          </span>
        </div>

        <div className="custom-datepicker-right">
          {value && <span className="custom-datepicker-badge">{value}</span>}
          <svg
            className={`custom-datepicker-chevron ${isOpen ? 'open' : ''}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Themed Dropdown Calendar Popover */}
      {isOpen && (
        <div className="custom-datepicker-popover" role="dialog" aria-modal="true">
          {/* Header Controls: Month/Year Dropdowns & Nav Arrows */}
          <div className="custom-datepicker-header">
            <button
              type="button"
              className="custom-datepicker-nav-btn"
              onClick={handlePrevMonth}
              title="Previous Month"
              aria-label="Previous Month"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="custom-datepicker-selectors">
              {/* Month Dropdown */}
              <select
                className="custom-datepicker-select"
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
                aria-label="Select month"
              >
                {MONTH_NAMES.map((m, idx) => (
                  <option key={m} value={idx}>
                    {m}
                  </option>
                ))}
              </select>

              {/* Year Dropdown */}
              <select
                className="custom-datepicker-select year-select"
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                aria-label="Select year"
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="custom-datepicker-nav-btn"
              onClick={handleNextMonth}
              title="Next Month"
              aria-label="Next Month"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="custom-datepicker-weekdays">
            {WEEKDAYS.map((w) => (
              <div key={w} className="custom-datepicker-weekday">
                {w}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="custom-datepicker-grid">
            {calendarCells.map((cell, idx) => {
              const classNames = [
                'custom-datepicker-cell',
                !cell.isCurrentMonth ? 'other-month' : '',
                cell.isToday ? 'is-today' : '',
                cell.isSelected ? 'is-selected' : '',
                cell.isDisabled ? 'is-disabled' : ''
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <button
                  key={`${cell.dateStr}-${idx}`}
                  type="button"
                  className={classNames}
                  onClick={() => handleSelect(cell.dateStr, cell.isDisabled)}
                  disabled={cell.isDisabled}
                  title={cell.dateStr}
                  aria-label={cell.dateStr}
                >
                  <span>{cell.day}</span>
                  {cell.isToday && !cell.isSelected && <span className="today-dot" />}
                </button>
              );
            })}
          </div>

          {/* Footer Shortcuts & Actions */}
          <div className="custom-datepicker-footer">
            <button
              type="button"
              className="custom-datepicker-today-btn"
              onClick={handleSelectToday}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Today ({today.day} {MONTH_NAMES[today.month]?.slice(0, 3)})</span>
            </button>

            <button
              type="button"
              className="custom-datepicker-close-btn"
              onClick={() => setIsOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
