export function editExpense(store, index) {
  const newName = prompt('Edit the expense name:');
  if (newName !== null && newName.trim() !== '') {
    store.editExpense(index, newName);
  }
}

export function deleteExpense(store, index) {
  store.deleteExpense(index);
}
