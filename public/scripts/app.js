$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    console.log('user: ', users)
    for(let user of Object.keys(users)) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
