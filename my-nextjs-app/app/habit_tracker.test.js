// Basic Assertion Function
function assert(condition, message) {
  if (!condition) {
    console.error(`Assertion Failed: ${message}`);
    return false;
  }
  console.log(`Assertion Passed: ${message}`);
  return true;
}

// Test for Adding a Habit
function testAddHabit() {
  console.log('\n--- Running testAddHabit ---');
  let habits = [];
  const setHabits = (newHabits) => {
    habits = newHabits;
  };

  const newHabitName = 'Test Exercise';
  const newHabitObject = { id: 1, name: newHabitName, completions: [] };

  // Simulate the part of handleAddHabit that updates state
  setHabits([...habits, newHabitObject]);

  let allTestsPassed = true;
  allTestsPassed &&= assert(habits.length === 1, 'Habits array should have 1 habit.');
  allTestsPassed &&= assert(habits[0].name === newHabitName, `Habit name should be "${newHabitName}".`);
  allTestsPassed &&= assert(habits[0].completions.length === 0, 'Habit completions should be empty.');

  if (allTestsPassed) {
    console.log('testAddHabit: All assertions passed! ✅');
  } else {
    console.error('testAddHabit: Some assertions failed! ❌');
  }
  return allTestsPassed;
}

// Test for Toggling Habit Completion
function testToggleHabitCompletion() {
  console.log('\n--- Running testToggleHabitCompletion ---');
  const initialHabit = { id: 1, name: 'Test Reading', completions: [] };
  let habits = [initialHabit];
  const setHabits = (updatedHabits) => {
    habits = updatedHabits;
  };

  // Fixed date for testing
  const getCurrentDateString = () => '2024-01-01';

  const habitIdToToggle = 1;

  // Simulate the toggleHabitCompletion logic (first toggle - complete)
  let currentDate = getCurrentDateString();
  let habitsAfterFirstToggle = habits.map((habit) => {
    if (habit.id === habitIdToToggle) {
      const completions = [...habit.completions];
      const dateIndex = completions.indexOf(currentDate);
      if (dateIndex > -1) {
        completions.splice(dateIndex, 1);
      } else {
        completions.push(currentDate);
      }
      return { ...habit, completions };
    }
    return habit;
  });
  setHabits(habitsAfterFirstToggle);

  let allTestsPassed = true;
  allTestsPassed &&= assert(habits[0].completions.includes('2024-01-01'), 'Completions should include "2024-01-01" after first toggle.');
  allTestsPassed &&= assert(habits[0].completions.length === 1, 'Completions length should be 1 after first toggle.');

  // Simulate the toggleHabitCompletion logic (second toggle - uncomplete)
  currentDate = getCurrentDateString(); // Recapture, though it's fixed
  let habitsAfterSecondToggle = habits.map((habit) => {
    if (habit.id === habitIdToToggle) {
      const completions = [...habit.completions];
      const dateIndex = completions.indexOf(currentDate);
      if (dateIndex > -1) {
        completions.splice(dateIndex, 1);
      } else {
        completions.push(currentDate);
      }
      return { ...habit, completions };
    }
    return habit;
  });
  setHabits(habitsAfterSecondToggle);

  allTestsPassed &&= assert(habits[0].completions.length === 0, 'Completions length should be 0 after second toggle.');
  allTestsPassed &&= assert(!habits[0].completions.includes('2024-01-01'), 'Completions should not include "2024-01-01" after second toggle.');


  if (allTestsPassed) {
    console.log('testToggleHabitCompletion: All assertions passed! ✅');
  } else {
    console.error('testToggleHabitCompletion: Some assertions failed! ❌');
  }
  return allTestsPassed;
}

// Run all tests
function runTests() {
  console.log('--- Starting Habit Tracker Tests ---');
  const addHabitResult = testAddHabit();
  const toggleHabitResult = testToggleHabitCompletion();
  console.log('\n--- Test Summary ---');
  console.log(`testAddHabit: ${addHabitResult ? 'PASSED ✅' : 'FAILED ❌'}`);
  console.log(`testToggleHabitCompletion: ${toggleHabitResult ? 'PASSED ✅' : 'FAILED ❌'}`);
  if (addHabitResult && toggleHabitResult) {
    console.log('All tests passed successfully! 🎉');
  } else {
    console.error('Some tests failed. ❌');
  }
}

// Execute the tests
runTests();

// Export functions (optional, as direct execution is used here)
// module.exports = {
//   testAddHabit,
//   testToggleHabitCompletion,
//   runTests
// };
