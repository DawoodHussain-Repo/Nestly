'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSearchSchema, type BookingSearchFormData } from '@/lib/schemas';
import { Button3D } from './button-3d';
import { DestinationSearch } from './destination-search';
import { format } from 'date-fns';

export function BookingSearchForm() {
  const [selectedDestination, setSelectedDestination] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingSearchFormData>({
    resolver: zodResolver(bookingSearchSchema),
    defaultValues: {
      guests: 2,
      rooms: 1,
    },
  });

  const guests = watch('guests');
  const rooms = watch('rooms');

  const onSubmit = (data: BookingSearchFormData) => {
    console.log('Search data:', data);
    // Handle search submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="bg-[var(--color-surface-container-lowest)] rounded-3xl shadow-xl border border-[var(--color-surface-variant)] p-3 flex flex-col lg:flex-row items-stretch gap-3">
        {/* Destination */}
        <div className="flex-1 min-w-0">
          <div className="px-4 py-3">
            <label className="text-xs font-medium text-[var(--color-on-surface)] block mb-2">
              Where
            </label>
            <DestinationSearch
              onSelect={(dest) => {
                setSelectedDestination(dest.name);
                setValue('destination', dest.name);
              }}
            />
            {errors.destination && (
              <p className="text-xs text-[var(--color-error)] mt-1">
                {errors.destination.message}
              </p>
            )}
          </div>
        </div>

        {/* Dates */}
        <div className="flex-1 min-w-0 flex gap-3">
          <div className="flex-1 px-4 py-3">
            <label className="text-xs font-medium text-[var(--color-on-surface)] block mb-2">
              Check-in
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[var(--color-secondary)] text-xl">
                calendar_today
              </span>
              <input
                type="date"
                {...register('checkIn', { valueAsDate: true })}
                className="w-full pl-10 pr-3 py-2 bg-[var(--color-surface-container)] rounded-full border border-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 text-[var(--color-on-surface)] transition-all outline-none text-sm"
              />
            </div>
            {errors.checkIn && (
              <p className="text-xs text-[var(--color-error)] mt-1">
                {errors.checkIn.message}
              </p>
            )}
          </div>

          <div className="flex-1 px-4 py-3">
            <label className="text-xs font-medium text-[var(--color-on-surface)] block mb-2">
              Check-out
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[var(--color-secondary)] text-xl">
                calendar_today
              </span>
              <input
                type="date"
                {...register('checkOut', { valueAsDate: true })}
                className="w-full pl-10 pr-3 py-2 bg-[var(--color-surface-container)] rounded-full border border-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 text-[var(--color-on-surface)] transition-all outline-none text-sm"
              />
            </div>
            {errors.checkOut && (
              <p className="text-xs text-[var(--color-error)] mt-1">
                {errors.checkOut.message}
              </p>
            )}
          </div>
        </div>

        {/* Guests & Rooms */}
        <div className="flex-1 min-w-0 flex gap-3">
          <div className="flex-1 px-4 py-3">
            <label className="text-xs font-medium text-[var(--color-on-surface)] block mb-2">
              Guests
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setValue('guests', Math.max(1, guests - 1))}
                className="w-8 h-8 rounded-full bg-[var(--color-surface-container)] hover:bg-[var(--color-surface-container-high)] flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-lg">remove</span>
              </button>
              <input
                type="number"
                {...register('guests', { valueAsNumber: true })}
                className="w-16 text-center py-2 bg-[var(--color-surface-container)] rounded-full border border-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 text-[var(--color-on-surface)] transition-all outline-none text-sm font-semibold"
                readOnly
              />
              <button
                type="button"
                onClick={() => setValue('guests', Math.min(16, guests + 1))}
                className="w-8 h-8 rounded-full bg-[var(--color-surface-container)] hover:bg-[var(--color-surface-container-high)] flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-lg">add</span>
              </button>
            </div>
            {errors.guests && (
              <p className="text-xs text-[var(--color-error)] mt-1">
                {errors.guests.message}
              </p>
            )}
          </div>

          <div className="flex-1 px-4 py-3">
            <label className="text-xs font-medium text-[var(--color-on-surface)] block mb-2">
              Rooms
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setValue('rooms', Math.max(1, rooms - 1))}
                className="w-8 h-8 rounded-full bg-[var(--color-surface-container)] hover:bg-[var(--color-surface-container-high)] flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-lg">remove</span>
              </button>
              <input
                type="number"
                {...register('rooms', { valueAsNumber: true })}
                className="w-16 text-center py-2 bg-[var(--color-surface-container)] rounded-full border border-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 text-[var(--color-on-surface)] transition-all outline-none text-sm font-semibold"
                readOnly
              />
              <button
                type="button"
                onClick={() => setValue('rooms', Math.min(10, rooms + 1))}
                className="w-8 h-8 rounded-full bg-[var(--color-surface-container)] hover:bg-[var(--color-surface-container-high)] flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-lg">add</span>
              </button>
            </div>
            {errors.rooms && (
              <p className="text-xs text-[var(--color-error)] mt-1">
                {errors.rooms.message}
              </p>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-center px-4 py-3">
          <Button3D type="submit" variant="primary" size="lg" className="w-full lg:w-auto">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined">search</span>
              <span>Search</span>
            </span>
          </Button3D>
        </div>
      </div>
    </form>
  );
}
