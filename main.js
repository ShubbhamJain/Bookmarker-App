// Listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

// save bookmark
function saveBookmark(e) {
  e.preventDefault();

  // Get form values
  let siteName = document.getElementById('siteName').value;
  let siteURL = document.getElementById('siteURL').value;

  if (!validateForm(siteName,siteURL)) {
    return false;
  }

  let bookmark = {
    name : siteName,
    url : siteURL
  }

  // local storage test
  // localStorage.setItem('test','Hello world');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));

  // checking if bookmarks is empty
  if (localStorage.getItem('bookmarks') === null) {
    // Initialize array bookmarks if it is not created
    let bookmarks = [];
    // adding the new bookmark value we got from user into the array bookmarks
    bookmarks.push(bookmark);
    // setting bookmarks to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
  }
  else {
    // getting the already created bookmarks array from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // adding the new bookmark value we got from user into the array bookmarks
    bookmarks.push(bookmark);
    // resetting bookmarks to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
  }
  document.getElementById('myForm').reset();
}

// fetch bookmarks
function fetchBookmarks() {
  // getting the already created bookmarks array from localStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  let output = '';
  bookmarks.forEach(function(bookmark) {
    output += `
    <div>
      <div class="bg-secondary p-3 rounded">
        <h4>
          <span class="pl-2"></span>
          ${bookmark.name}
          <span class="pl-4"></span>
          <a class="btn btn-primary" target="_blank" href="${bookmark.url}">Visit</a>
          <span class="pl-4"></span>
          <a class="btn btn-danger" onclick="deleteBookmark(\'${bookmark.url}\')">Delete</a>
        </h4>
      </div>
      <br>
    </div>
    `;
  })
  document.getElementById('bookmarksResults').innerHTML = output;
}

// delete bookmarks
function deleteBookmark(url) {
  // getting the already created bookmarks array from localStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // loop through bookmarks to delete the bookmark
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i,1);
    }
  }
  // resetting bookmarks to localStorage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  fetchBookmarks();
}

// validate form
function validateForm(sitename,siteurl) {
  if (!sitename || !siteurl) {
    alert("Enter a valid Site Name or URL");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteurl.match(regex)) {
    alert("Please Enter a valid Site URL");
    return false;
  }

  return true;
}
