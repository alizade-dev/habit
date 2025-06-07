'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Page() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  const getCurrentDateString = () => {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  };

  const handleAddHabit = () => {
    if (newHabit.trim() === '') return;
    // Updated habit structure
    setHabits([...habits, { id: Date.now(), name: newHabit, completions: [] }]);
    setNewHabit('');
  };

  const toggleHabitCompletion = (habitId) => {
    const currentDate = getCurrentDateString();
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          const completions = [...habit.completions]; // Clone completions array
          const dateIndex = completions.indexOf(currentDate);

          if (dateIndex > -1) {
            // Already completed today, so remove (mark as not done)
            completions.splice(dateIndex, 1);
          } else {
            // Not completed today, so add (mark as done)
            completions.push(currentDate);
          }
          return { ...habit, completions };
        }
        return habit;
      })
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.habitTrackerContainer}>
        <h1>Habit Tracker</h1>

        <div className={styles.addHabitGroup}>
          <input
            type="text"
            placeholder="Enter a new habit"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <button onClick={handleAddHabit}>Add Habit</button>
        </div>

        <div>
          <ul>
            {habits.map((habit) => {
              const isCompletedToday = habit.completions.includes(getCurrentDateString());
              return (
                <li key={habit.id} className={styles.habitItem}>
                  <span style={{ textDecoration: isCompletedToday ? 'line-through' : 'none' }}>
                    {habit.name}
                  </span>
                  <button onClick={() => toggleHabitCompletion(habit.id)}>
                    {isCompletedToday ? 'Mark Undone' : 'Mark Done'}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
