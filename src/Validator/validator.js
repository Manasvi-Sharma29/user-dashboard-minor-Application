const isValidString = function (value) {
    if (!value) return false;
    if (typeof value === "undefined" || value === null) return false;
    if (value.length === 0) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    else if (typeof value === "string") return true;
  };
  

const isValidName = function(name){
    return /^[a-z A-Z]+$/.test(name)
}

const isValidMail = function (email) {
    return /^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(email);
};

//function for verifying mobile number
const isValidPhone = function(phone){
    return  /^((\+91(-| )+)|0)?[6-9][0-9]{9}$/.test(phone); 
  };

// function for password verification
const isValidPassword = function (pass) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(pass);
  };

module.exports = { isValidString,
    isValidName,
    isValidMail,
    isValidPhone,
    isValidPassword,}