function passwordValidation(password) {
  if (password.length < 8) {
    return false;
  }
  let capital = false;
  let lower = false;
  let number = false;

  for (let i = 0; i < password.length; i++) {

    if (!isNaN((password.charAt(i)) * 1)) {
      number = true;
    } else {


      if (password.charAt(i) === (password.charAt(i)).toUpperCase()) {
        capital = true;
      }

      if (password.charAt(i) === (password.charAt(i)).toLowerCase()) {
        lower = true;
      }

    }
  }

  if (capital && lower && number) {
    return true;
  }
  return false;

}
export default passwordValidation;