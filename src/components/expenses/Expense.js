export const generateExpense = (
  name,
  date,
  expenseType,
  expenseCategory,
  id
) => {
  return {
    id: id || generateId(),
    name: name || '',
    date: date || '',
    expenseType: expenseType || '',
    expenseCategory: expenseCategory || '',
  };
};

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
