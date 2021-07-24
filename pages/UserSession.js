var UserSession = (function () {
  var userId = "";

  var getName = function () {
    return userId;
  };

  var setName = function (name) {
    userId = name;
  };

  return {
    getName: getName,
    setName: setName
  }

})();

export default UserSession;