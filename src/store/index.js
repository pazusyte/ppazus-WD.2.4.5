import { defineStore } from 'pinia';

const store = defineStore('expenses', {
  state: () => ({
    expenses: [],
  }),
  actions: {
    addExpense(expense) {
      this.expenses.push(expense);
    },
    editExpense(index, newName) {
      this.expenses[index].name = newName;
    },
    deleteExpense(index) {
      this.expenses.splice(index, 1);
    },
  },
});

export default store;
