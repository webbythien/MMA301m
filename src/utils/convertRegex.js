function convertIfContainsSearch(input) {
    const output = {};
  
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        const value = input[key];
        
        if (typeof value === 'string' && value.includes('search')) {
          // Nếu giá trị chứa "search", chuyển nó thành regex với cờ 'i'
          const newValue = value.replace(':search', '');
          output[key] = { $regex: new RegExp(newValue, 'i') };
        } else {
          // Giữ nguyên các giá trị khác
          output[key] = value;
        }
      }
    }
  
    return output;
  }

module.exports = convertIfContainsSearch;
